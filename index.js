const fs = require('fs');

try {
    require("./keys.json");
} catch {
    const readline = require('readline-sync');

    if (readline.keyInYN("Could not load keys.json. Would you like to setup keys now?")){
        const token = readline.question("Please enter your discord bot token: ");
        fs.writeFileSync("./keys.json", JSON.stringify({discordToken: token}, null, 2));
    } else {
        console.log("Please create a keys.json file with the following structure:");
        console.log(JSON.stringify({discordToken: "tokenString"}, null, 2));
        return 0;
    }
}
const api = require("./keys.json");

const Discord = require('discord.js');

const intents = {
    intents: [
        "DIRECT_MESSAGES",
        "GUILDS",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGES",
        "GUILD_EMOJIS_AND_STICKERS"],
    partials: ["CHANNEL"]
};
const client = new Discord.Client(intents);

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

for (const handler of fs.readdirSync('./handlers/').filter(file => file.endsWith('.js'))){
    require(`./handlers/${handler}`)(client, Discord);
}

//Connect to Dicord
client.login(api.discordToken);