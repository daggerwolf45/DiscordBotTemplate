const fs = require('fs');

module.exports = (client, Discord) => {
    const loadDir = (dir) => {
        const eventFiles = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));

        for (const file of eventFiles){
            const event = require(`../events/${dir}/${file}`);
            const eName = file.split('.')[0];
            client.on(eName, event.bind(null, Discord, client));
        }
    }

    for (const event of fs.readdirSync('./events/')){
        if (fs.statSync(`./events/${event}`).isDirectory()) loadDir(event);
    }
}