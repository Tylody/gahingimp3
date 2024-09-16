const { createPlayer } = require("lavalink-client");
const { guild, voice, text } = require("discord.js");

module.exports = async (client) => {
  const player = await client.lavalink.createPlayer({
    guildId: 1201449167583711232,
    voiceChannelId: 1201449169882202135,
    textChannelId: 1201449169882202134,
    //optional config:
    selfDeaf: true,
    selfMute: false,
    volume: 100,
  });

  // connect to voice channel
  await player.connect();
  await console.log("Player connected");

  // search query
  const res = await player.search(
    {
      query: `Miki Matsubara`,
    },
    interaction.user
  );

  // add top result
  await player.queue.add(res.tracks[0]);

  if (!player.playing) await player.play();
};
