const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "seek",
  description: "Seek to a specific time in the song.",

  options: [
    {
      name: "timestamp-seconds",
      description:
        "Timestamp to skip to, in seconds, or go to start of song by default.",
      required: false,
      type: ApplicationCommandOptionType.Integer,
    },
  ],

  permissionsRequired: [PermissionFlagsBits.ManageMessages],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {
    const guildId = await interaction.guildId;

    if (!guildId) return interaction.editReply("Bot not connected to guild.");

    const player = await client.lavalink.getPlayer(guildId);

    if (!player) return interaction.editReply("Bot not connected to vc.");

    const current_track_duration = await player.queue.current.info.duration;
    const current_track_duration_in_seconds = current_track_duration / 1000;

    const seek_input = interaction.options.get("timestamp-seconds")?.value;

    let seek_time_in_seconds;

    seek_input
      ? (seek_time_in_seconds = seek_input)
      : (seek_time_in_seconds = 0);

    const seek_time = seek_time_in_seconds * 1000;

    if (
      seek_time_in_seconds > current_track_duration_in_seconds ||
      seek_time_in_seconds < 0
    )
      return interaction.editReply(
        `Invalid seek time! Must be greater than 0 and less than the track length (${current_track_duration_in_seconds}).`
      );

    await player.seek(seek_time);

    return interaction.editReply("Seek sock");
  },
};
