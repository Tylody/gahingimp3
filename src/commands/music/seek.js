const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const convertToTimestamp = require("../../utils/convertToTimestamp");
const parseTime = require("../../utils/parseTime");

module.exports = {
  name: "seek",
  description: "Seek to a specific time in the song.",

  options: [
    {
      name: "timestamp",
      description: "Timestamp to skip to, or go to start of song by default.",
      required: false,
      type: ApplicationCommandOptionType.String,
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
    const formatted_current_track_duration = convertToTimestamp(
      current_track_duration_in_seconds
    );

    const seek_input = interaction.options.get("timestamp")?.value;

    let seek_time_in_seconds;

    seek_input
      ? (seek_time_in_seconds = seek_input)
      : (seek_time_in_seconds = 0);

    if (seek_time_in_seconds != 0) {
      try {
        seek_time_in_seconds = parseTime(seek_input);
      } catch (e) {
        return interaction.editReply("Invalid timestamp entered!");
      }
    }

    const seek_time = seek_time_in_seconds * 1000;

    if (
      seek_time_in_seconds > current_track_duration_in_seconds ||
      seek_time_in_seconds < 0
    )
      return interaction.editReply(
        `Invalid seek time! Must be greater than 0 and less than the track length (${formatted_current_track_duration}).`
      );

    await player.seek(seek_time);

    return interaction.editReply(
      `Skipping to ${seek_input}/${formatted_current_track_duration}!`
    );
  },
};
