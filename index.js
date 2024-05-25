// Requiring discord.js classes and the bots token from the config file
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('node:path');

//Creating a client
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

//Retrieving Commands
client.commands = new Collection();
const foldersPath = path.join(process.cwd(), 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//Receiving Command Interactions
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) {
        console.error(`Invalid command: ${interaction.commandName}`);
    } else if(interaction.commandName == "reminder") {
        reminder(interaction);
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
    }
})

//Handles the delayed reminder function of the reminder slash command
function reminder(interaction) {
    let msg = 'Reminder';
    let user = interaction.user.username;
    if(interaction.options.getString('message') != null) {
        msg = interaction.options.getString('message');
    }
    setTimeout(function() {
        interaction.channel.send(msg + ` @${user}`);
        console.log('Reminder sent');
    }, interaction.options.getInteger('time') * 60000);   
}

//Checking client is operational
client.once(Events.ClientReady, rClient => {
    console.log(`Client: ${rClient.user.tag}`);
});

//Logging in
client.login(token);
