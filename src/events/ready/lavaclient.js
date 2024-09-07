module.exports = async (client) => {
  await client.lavalink.init({ ...client.user });
  console.log("lavalink initialized");
};
