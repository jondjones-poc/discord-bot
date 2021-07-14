const Discord  = require('discord.js');
const client = new Discord.Client();

const GENERAL_CHANNEL_ID = '864746129300389942';
const SERVER_ID = 'ODY0NzQ2NTI1MDg3MjM2MDk2.YO579Q.QWG814zp_4cbyr4RHE4B3PK84yQ';

const helpCommand = (arguments, message) => {
    if (arguments.length === 0) {
        message.channel.send(`I am not sure what you need help with.  Try !help {topic}`);
        return
    } 

    message.channel.send(`It looks like you need help with {${arguments}}`);
}

const  addCommand = (arguments, message) => {
        if (arguments.length < 2) {
            message.channel.send(`Two number inputs are required"!`);
        }

        let add = 0;
        arguments.forEach(value => {
            add += parseInt(value);
        });

        message.channel.send(`The answer is ${add}`);
}

const processMessage = (fullCommand, message) => {
    const command = fullCommand.substr(1);
    const commandSplit = command.split(' ');
    const primaryCommand = commandSplit[0];
    const arguments = commandSplit.slice(1);

    if (primaryCommand === "help") {
        helpCommand(arguments, message);
    } else if (primaryCommand === "add"){
        addCommand(arguments, message)
    } else {
        message.channel.send(`Unknown command!`);
    }
}

client.on('ready', () => {
    console.log(`Connect as ${client.user.tag}`);

    client.user.setActivity(`playing`, `with 0 and 1'S!`);

    client.guilds.cache.forEach(guild => {
        guild.channels.cache.forEach(channel => {
            console.log(` ${channel.name} ${channel.type} ${channel.id}`);
        })
    })

    let generalChannel = client.channels.cache.get(GENERAL_CHANNEL_ID);
    generalChannel.send('Hi', {files: ['./1.jpg']});

    client.on('message', message => {
        if (message.author === client.user) {
            return;
        }

        const filteredContent = message?.content?.substr(message.id.length + 5)
        if (filteredContent?.startsWith("!")) {
            processMessage(filteredContent, message);
        } else {
            message.channel.send(`Hello! ${message.author} : ${message.content}`)
            message.react('👍');
         
            message.guild.emojis.cache.forEach(emoji => {
                console.log(`${emoji.name} ${emoji.id}}`)
                message.react(emoji);
            })
        }
    })
});

client.login(SERVER_ID)