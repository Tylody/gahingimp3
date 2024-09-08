module.exports = async (client, d) => {
  console.log("raw data sending");
  client.lavalink.sendRawData(d);
};
// https://lc4.gitbook.io/lavalink-client/basics/getting-started
