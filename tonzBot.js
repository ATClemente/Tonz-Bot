/*var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
			case 'Hello!':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hi there kind humans!'
                });
			break;
			case 'Doom':
                bot.sendMessage({
                    to: channelID,
                    message: '<:doom:508093498537410560>'
                });
			break;
			case 'Users':
			    bot.sendMessage({
                    to: channelID,
                    message: bot.guilds.first.members.size()
                });
			break;
            // Just add any case commands if you want to..
         }
     }
});*/


const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  /*if (message.content === 'ping') {
    message.reply('Pong!');
  }*/
  
if (message.content.substring(0, 1) == '!') {
	var args = message.content.substring(1).split(' ');
	var cmd = args[0];

	args = args.splice(1);
	switch(cmd) {
		// !ping
		case 'ping':
			message.reply('Pong!');
		break;
		case 'Hello!':
			message.reply('Hi there kind humans!');
		break;
		case 'Doom':
			message.channel.send('<:doom:508093498537410560>');
		break;
		case 'Delete':
			message.delete()
				.then(message => console.log(`Deleted message from ${message.author.username}`))
				.catch(console.error);
		break;
		case 'Random':
			message.channel.send(client.users.random().username);
			//console.log(client.users.random().username);
		break;
		// Just add any case commands if you want to..
		}
	}
});

client.login(auth.token);