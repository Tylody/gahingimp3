require("dotenv").config();
const {
  Client,
  IntentsBitField,
  GatewayIntentBits,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const { LavalinkManager } = require("lavalink-client");

const nodes = [
  { id: "1", host: "localhost", port: 2333, password: "thoang39" },
];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.lavalink = new LavalinkManager({
  nodes: [
    {
      authorization: "youshallnotpass",
      host: "localhost",
      port: 2333,
      id: "testnode",
    },
  ],
  sendToShard: (guildId, payload) =>
    client.guilds.cache.get(guildId)?.shard?.send(payload),
  client: {
    id: process.env.CLIENT_ID,
    username: "GahingiMP3",
  },
  autoSkip: true,
  playerOptions: {
    clientBasedPositionUpdateInterval: 150,
    defaultSearchPlatform: "ytmsearch",
    volumeDecrementer: 0.75,
    // requesterTransformer: requesterTransformer,
    onDisconnect: {
      autoReconnect: true,
      destroyPlayer: false,
    },
    onEmptyQueue: {
      destroyAfterMs: 30_000,
      //autoPlayFunction: autoPlayFunction,
    },
  },
  queueOptions: {
    maxPreviousTracks: 25,
  },
});

eventHandler(client);

client.login(process.env.TOKEN);
