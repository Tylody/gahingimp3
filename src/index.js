require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');
const { Manager } = require("lavacord");

const nodes = [
    { id: "1", host: "localhost", port: 2333, password: "thoang39" }
];

const manager = new Manager(nodes, {
    user: client.user.id,
    send: (packet) => {

    }
});

await manager.connect();

manager.on("error", (error, node) => {
    error,
    node
});

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB.");

        eventHandler(client);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();


client.login(process.env.TOKEN);

