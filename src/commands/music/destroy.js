const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "destroy",
  description: "Destroy the player.",

  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {
    const guildId = await interaction.guildId;
    if (!guildId) return interaction.editReply("Bot not connected to guild.");

    const player = await client.lavalink.getPlayer(guildId);

    if (!player) return interaction.editReply("Bot not connected to vc.");

    await player.destroy(`Player stopped by ${interaction.user.username}`);

    return interaction.editReply("Player has been stopped.");
  },
};
