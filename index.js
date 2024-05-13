// Requiring discord.js classes and the bots token from the config file
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

//Creating a client
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

//Checking client is operational
client.once(Events.ClientReady, rClient => {
    console.log(`Client: ${rClient.user.tag}`);
});

//Logging in
client.login(token);
