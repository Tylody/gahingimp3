const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "skip",
  description: "Skips the current song.",

  options: [
    {
      name: "tracks-to-skip",
      description: "How many tracks you want to skip",
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

    const current = player.queue.current;
    const nextTrack = player.queue.tracks[0];

    if (!nextTrack) {
      await player.destroy(`Player stopped by ${interaction.user.username}`);

      return interaction.editReply(
        "No more tracks in queue. Player has been stopped."
      );
    }

    const skipCount = interaction.options.get("tracks-to-skip")?.value;

    let toSkip;

    skipCount ? (toSkip = skipCount) : (toSkip = 0);

    await player.skip(toSkip);

    return interaction.editReply("Skipped this song!");
  },
};
