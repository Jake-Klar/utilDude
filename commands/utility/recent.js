const { osuId } = require('../../config.json');
const { osuSecret } = require('../../config.json');
const grant_type = "client_credentials";
const scope = "public";
const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recent')
        .setDescription('returns the most recent play for a player')
        .addStringOption(option => 
            option.setName('player')
                .setRequired(true)
                .setDescription('the player')
        ),
    async execute(interaction) {
            //Generating an access token
            const tokenResponse = await fetch("https://osu.ppy.sh/oauth/token", {
            method: "POST",            
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            },         
            body: `client_id=${osuId}&client_secret=${osuSecret}&grant_type=${grant_type}&scope=${scope}`,
        })
        const tokenJson = await tokenResponse.json();
        const accessToken = tokenJson.access_token;
        
        //Retrieving users osu ID
        const player = interaction.options.getString('player');
        const userResponse = await fetch(`https://osu.ppy.sh/api/v2/users/${player}/osu?key=username`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        })
        const userJson = await userResponse.json();
        const userId = userJson.id;

        //Retrieving the users most recent score
        const recentResponse = await fetch(`https://osu.ppy.sh/api/v2/users/${userId}/scores/recent?limit=1`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        })
        const recentJson = await recentResponse.json();
        console.log(recentJson);
        interaction.reply(
        `Time Set: ${recentJson[0].created_at}
        \nPerformance Points: ${recentJson[0].pp}
        \nMap: ${recentJson[0].beatmap.url}`);
    }
    
}
