//Requiring the slash command builder and file system
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
        const channel = interaction.options.getString('channel');
        const addition = '\n' + channel;
        // eslint-disable-next-line no-undef
        const filePath = path.join(process.cwd(), 'trackList.txt');
        interaction.reply(`Added user: ${channel}`);
        //Currently deletes the first line, need to go to end of document
        fs.writeFile(filePath, addition, (err) => {
            if (err) throw err;
        })
            
    }

};