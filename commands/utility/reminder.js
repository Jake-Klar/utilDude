const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reminder')
        .setDescription('the bot will ping you after a desired amount of time')
        .addIntegerOption(option =>
            option.setName('time')
            .setRequired(true)
            .setDescription('amount of time in minutes')
            )
        .addStringOption(option =>
            option.setName('message')
            .setRequired(false)
            .setDescription('optional message on the reminder')
            ),
        execute(interaction) {
            let time = interaction.options.getInteger('time');
            interaction.reply(`Created timer for ${time} minute(s)!`);
        }
}