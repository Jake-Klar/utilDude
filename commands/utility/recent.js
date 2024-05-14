const { osuId } = require('../../config.json');
const { osuSecret } = require('../../config.json');
const grant_type = "client_credentials";
const scope = "public";
const {SlashCommandBuilder} = require('discord.js');
let body = `client_id=${osuId}&client_secret=${osuSecret}&grant_type=${grant_type}&scope=${scope}`
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recent')
        .setDescription('returns the most recent play for a player')
        .addStringOption(option => 
            option.setName('player')
                .setRequired(true)
                .setDescription('the player')
        ),
    execute(interaction) {
        fetch("https://osu.ppy.sh/oauth/token", {
            method: "POST",
            headers,
            body: body,
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
        interaction.reply('yer')
    }
    
}
