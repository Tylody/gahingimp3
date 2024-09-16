const { PermissionFlagsBits } = require("discord.js");

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
        query: `Miki Matsubara`,
      },
      interaction.user
    );

    await player.queue.add(res.tracks[0]);

    if (!player.playing) await player.play();

    interaction.editReply("Player joined.");
  },
};
// https://github.com/Tomato6966/lavalink-client/blob/main/testBot/commands/play.ts
