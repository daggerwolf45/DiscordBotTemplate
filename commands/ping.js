module.exports = {
    name: 'Ping',
    description: 'Test Command',
    aliases: ["pong"],
    execute(message, args, file){
        message.channel.send("Pong!");
    }
}