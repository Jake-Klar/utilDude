const { SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('track')
        .setDescription('Adds a channel to be added to the tracked list')
        .addStringOption(option =>
            option.setName('channel')
                .setRequired(true)
                .setDescription('The channel to be tracked')
            ),
    execute(interaction) {
        const player = interaction.options.getString('channel');
        // eslint-disable-next-line no-undef
        const filePath = path.join(process.cwd(), 'trackList.txt');
        //If no track file exists, creates a new one
        if(!fs.existsSync(filePath)) {
            fs.writeFile(filePath, player, (err) => {
                if (err) throw err;
            })
            interaction.reply(`Added user: ${player}`);
        //Else append the channel name to the bottom of the file
        } else {
            const append = '\n' + player;
            fs.appendFile(filePath, append, (err) => {
            if (err) throw err;
            })
            interaction.reply(`Added user: ${player}`);
        }
             
    }

};