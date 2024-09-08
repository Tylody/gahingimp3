module.exports = {
  name: "ping",
  description: "Pong!",
  //    devOnly: Boolean,
  //    testOnly: Boolean,
  //    options: Object[],
  //    deleted: Boolean,

  callback: (client, interaction) => {
    interaction.editReply(`Pong! ${client.ws.ping} ms`);
  },
};
