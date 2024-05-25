const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear x messages of the channel the command is used in')
        .addIntegerOption(option => 
            option.setName('num')
            .setRequired(true)
            .setDescription('number of messages to be removed')),
     async execute(interaction) {
        let msgCount = interaction.options.getInteger('num');
        const fetchedMessages = await interaction.channel.messages.fetch({limit: msgCount});
        await fetchedMessages.each((message => {
            interaction.channel.messages.delete(message.id);
        }))
        interaction.reply(`Deleting ${msgCount} messages from this channel!`);
    }
}