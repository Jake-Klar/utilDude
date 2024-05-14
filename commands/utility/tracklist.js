const {SlashCommandBuilder} = require('discord.js');
const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tracklist')
        .setDescription('Show all currently tracked channels'),
    async execute(interaction) {
        // eslint-disable-next-line no-undef
        const filePath = path.join(process.cwd(), 'trackList.txt');
        if(!fs.existsSync(filePath)) {
            interaction.reply('No currently tracked channels')
        } else {
            const file = await fsp.readFile(filePath, 'utf-8', (err) => {
                if (err) throw err;
            });
            const lines = file.split("\n");
            let reply = 'Currently tracked channels:';
            lines.forEach((line) => {
                reply += '\n' + line;
            });
            interaction.reply(reply);
        }
 
    }
};