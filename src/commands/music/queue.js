const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "queue",
  description: "List all the songs currently in queue.",

  permissionsRequired: [],
  botPermissions: [PermissionFlagsBits.SendMessages],

  callback: async (client, interaction) => {
    const guildId = await interaction.guildId;
    const player = await client.lavalink.getPlayer(guildId);

    if (!player)
      return interaction.editReply("Not currently playing anything.");

    const current = player.queue.current;

    let trackCount;

    player.queue.tracks.length > 10
      ? (trackCount = 10)
      : (trackCount = player.queue.tracks.length);

    let listTracks = `:notes: **Currently playing:**    ${current.info.title}\n\n__Next ${trackCount} Tracks in Queue:__`;

    listNextTenTracks();

    function listNextTenTracks() {
      player.queue.tracks.slice(0, 10).map((track, i) => {
        i += 1;
        listTracks = listTracks.concat(`\n**${i}\.** ${track.info.title}`);
      });
      console.log("FLAG 1");
      return interaction.editReply(listTracks);
    }
  },
};
