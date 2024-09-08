const { PermissionFlagsBits } = require("discord.js");
const { createPlayer } = require("lavalink-client");

module.exports = {
  name: "join",
  description: "Have the bot join the voice channel",

  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {
    const guildId = await interaction.guildId;
    const voiceChannelId = await interaction.member?.voice?.channelId;

    if (!voiceChannelId)
      return interaction.editReply("Please join a voice channel first.");

    const textChannelId = await interaction.textChannelId;

    const player = await client.lavalink.createPlayer({
      guildId: guildId,
      voiceChannelId: voiceChannelId,
      textChannelId: textChannelId,

      selfDeaf: true,
      selfMute: false,
      volume: 100,
    });

    await player.connect();

    const res = await player.search(
      {
        query: `Elton John`,
      },
      interaction.user
    );

    await player.queue.add(res.tracks[0]);

    if (!player.playing) await player.play();

    interaction.editReply("Player joined.");
  },
};
