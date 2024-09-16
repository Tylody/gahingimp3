const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
const { LavalinkManager } = require("lavalink-client");

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  const lavalinkEventFolders = getAllFiles(
    path.join(__dirname, "..", "lavalinkEvents"),
    true
  );

  function handle_events(manager, folders) {
    for (const eventFolder of folders) {
      const eventFiles = getAllFiles(eventFolder);
      eventFiles.sort((a, b) => a > b);

      const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

      manager.on(eventName, async (arg) => {
        for (const eventFile of eventFiles) {
          const eventFunction = require(eventFile);
          await eventFunction(client, arg);
        }
      });
    }
  }

  handle_events(client, eventFolders);
  handle_events(client.lavalink, lavalinkEventFolders);
  /*
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });
  }*/
};
