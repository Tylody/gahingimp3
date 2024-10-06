const {
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  name: "lyrics",
  description: "Search up lyrics for a song on genius.com.",

  options: [
    {
      name: "song-name",
      description: "Name of the song to search for lyrics",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],

  permissionRequired: [],
  botPermissions: [PermissionFlagsBits.SendMessages],

  callback: async (client, interaction) => {
    async function scrapeSite(keyword) {
      const url = `https://www.google.com/search?q=${keyword}&tbm=isch`;
      const { data } = await axios.get(url); // creates new object containing data
      const $ = cheerio.load(data);
      const searchResults = [];
      $("a").each((_idx, el) => {
        const a_href = $(el).attr("href");
        searchResults.push(a_href);
      });
      return searchResults;
    }

    async function get_genius(query) {
      const keyword = `site:genius.com ${query} lyrics`;
      const output_urls = await scrapeSite(keyword);

      let i = 4;
      while (i < output_urls.length) {
        let curr_result = output_urls[i];
        curr_result = curr_result.slice(7, curr_result.length);
        const re = /[^&]*/;
        output = re.exec(curr_result);
        if (
          output[0].slice(output[0].length - 6, output[0].length) == "lyrics"
        ) {
          return output[0];
        }
        i++;
      }
    }

    async function get_lyrics(genius_site_url) {
      const { data } = await axios.get(genius_site_url);
      const $ = cheerio.load(data);
      const searchResults = [];
      let title = "";
      let artist = [];
      let img = "";
      $("div").each((_idx, el) => {
        if ($(el).attr("class") == "Lyrics__Container-sc-1ynbvzw-1 kUgSbL") {
          searchResults.push($(el).prop("outerHTML"));
        } /*
        if (
          $(el).attr("class") ==
          "SongHeaderdesktop__SongDetails-sc-1effuo1-5 dhqXbj"
        ) {
          console.log($(el).prop("outerHTML"));
        }*/
      });
      $("span").each((_idx, el) => {
        if (
          $(el).attr("class") ==
          "SongHeaderdesktop__HiddenMask-sc-1effuo1-11 iMpFIj"
        ) {
          title = $(el).prop("outerHTML");
        } /*
        if ($(el).attr("class") == "PortalTooltip__Trigger-yc1x8c-1 ekJBqv") {
          artist.push($(el).children("a"));
        }
        console.log(artist);*/
      });
      $("a").each((_idx, el) => {
        if ($(el).attr("class") == "StyledLink-sc-3ea0mt-0 ietQTa") {
          artist.push($(el).prop("outerHTML"));
        }
      });
      let lyrics = "";
      const regex = /<[^>]*>/g;
      for (let i = 0; i < searchResults.length; i++) {
        searchResults[i] = searchResults[i].replaceAll("<br>", "\n");
        output = searchResults[i].replaceAll(regex, "");
        lyrics = lyrics.concat(output).concat("\n");
      }

      title = title.replaceAll(regex, "");
      console.log(artist);
      artist = artist[0].replaceAll(regex, "");

      const product = [title, artist, lyrics, img];

      return product;
    }

    const searchQuery = interaction.options.get("song-name").value;
    const url = await get_genius(searchQuery);
    console.log(url);
    songInformation = await get_lyrics(url);

    const responseEmbed = new EmbedBuilder()
      .setColor(0x0279c9)
      .setTitle(songInformation[0])
      .setAuthor({
        name: songInformation[1],
      })
      .setDescription(songInformation[2]);

    interaction.editReply("Result: ");

    return interaction.editReply({ embeds: [responseEmbed] });
  },
};
