module.exports = async (client, player) => {
  let track;

  if (!track && player.queue.current) track = player.queue.current;

  const textChannelId = await player.options.textChannelId;

  const channel = await client.channels.cache.get(textChannelId);

  channel.send(
    `:notes: Now playing:  [${track.info.title}](${track.info.uri})`
  );

  console.log("Playing: ", track.info.title, " ", track.info.uri);
};
