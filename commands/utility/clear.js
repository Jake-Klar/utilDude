const {SlashCommandBuilder} = require('discord.js');

//Not operational
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear 50 messages of the channel the command is used in'),
     execute(interaction) {
        interaction.reply('Deleting 50 messages from this channel!');
        interaction.channel.messages.fetch()
            .then(messages => {
                for (let m in messages) {
                    interaction.channel.delete(m);
                }
            })
    }
}