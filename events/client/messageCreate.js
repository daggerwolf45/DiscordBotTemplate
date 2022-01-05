module.exports = (Discord, client, message) => {
    if(message.author.bot){
        // If message is from the bot, don't do anything
        return;
    }
    
    let args = message.content.split(/ +/);
    const command = args.shift().toLowerCase();                                     //Make command lowercase

    try {
        client.commands.get(command).execute(message, args, client);                        //Run the selected command
        console.log(`[Message]: ${message.author.username} triggered ${command} ${args}`);
    } catch {
        console.error("Unknown command: " + command);                                 //If command doesn't exist, post in console
    }
}