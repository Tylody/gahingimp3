module.exports = async (client) => {
  await client.lavalink.init({
    ...client.user,
  });
  await console.log("lavalink initialized");
};
