const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

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

async function get_genius() {
  const keyword = "site:genius.com fly away 장윤주 lyrics";
  const output_urls = await scrapeSite(keyword);

  let first_result = output_urls[4];
  first_result = first_result.slice(7, first_result.length);
  const re = /[^&]*/;
  output = re.exec(first_result);
  return output[0];
}

async function get_lyrics(genius_site_url) {
  const { data } = await axios.get(genius_site_url);
  const $ = cheerio.load(data);
  const searchResults = [];
  $("div").each((_idx, el) => {
    if ($(el).attr("class") == "Lyrics__Container-sc-1ynbvzw-1 kUgSbL") {
      searchResults.push($(el).prop("outerHTML"));
    }
  });
  fs.writeFile("./html/result2.txt", searchResults[0], function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Saved!");
  });
  let product = "";
  const regex = /<[^>]*>/g;
  for (let i = 0; i < searchResults.length; i++) {
    searchResults[i] = searchResults[i].replaceAll("<br>", "\n");
    output = searchResults[i].replaceAll(regex, "");
    product = product.concat(output).concat("\n");
  }
  fs.writeFile("./html/result.txt", product, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Saved!");
  });
}

async function main() {
  const url = await get_genius();
  get_lyrics(url);
}

main();
