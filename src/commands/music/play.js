const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "play",
  description: "Play a song on the bot.",

  options: [
    {
      name: "song-query",
      description: "Name of song to search",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],

  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {
    const guildId = await interaction.guildId;
    const voiceChannelId = await interaction.member?.voice?.channelId;

    if (!voiceChannelId)
      return interaction.editReply("Please join a voice channel first.");

    const textChannelId = await interaction.channelId;

    const oldPlayer = await client.lavalink.getPlayer(guildId);

    let player;

    if (!oldPlayer) {
      newPlayer = await client.lavalink.createPlayer({
        guildId: guildId,
        voiceChannelId: voiceChannelId,
        textChannelId: textChannelId,

        selfDeaf: true,
        selfMute: false,
        volume: 100,
      });

      player = newPlayer;

      await player.connect();
    } else {
      player = oldPlayer;
    }

    const searchQuery = interaction.options.get("song-query").value;

    const res = await player.search(
      {
        query: searchQuery,
      },
      interaction.user
    );

    await player.queue.add(res.tracks[0]);

    if (!player.playing) await player.play();

    interaction.editReply(
      `:cd: Queued song: [${res.tracks[0].info.title}](${res.tracks[0].info.uri})`
    );
  },
};
