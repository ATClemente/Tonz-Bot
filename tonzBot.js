/* A discord bot for me and friends
 * Author: Anthony Clemente
 * 2019
 * */

const Discord = require('discord.js');
const client = new Discord.Client();

var auth = require('./auth.json');
var commandsList = require('./constants.json').commands;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	
	if(message.author.bot){
		return;
	}

	if (message.content.substring(0, 1) == '!') {
		
		
		var args = message.content.substring(1).split(' ');
		var cmd = args[0].toLowerCase();

		args = args.splice(1);
		switch(cmd) {
			// !ping
			case commandsList[0].name:
				message.reply('Pong!');
			break;
			case commandsList[1].name:
				message.reply('Hi there kind humans!');
			break;
			case commandsList[2].name:
				message.channel.send('<:doom:508093498537410560>');
			break;
			case commandsList[3].name:
				message.delete()
					.then(message => console.log(`Deleted message from ${message.author.username}`))
					.catch(console.error);
			break;
			case commandsList[4].name:
				message.channel.send(client.users.random().username);
				//console.log(client.users.random().username);
			break;
			case commandsList[5].name:
				//Show what people are playing
				showPlayingInfo(message.channel)
			break;
			case commandsList[6].name:
				//Show what people are streaming
				showStreamingInfo(message.channel)
			break;
			case "commands":
				message.channel.send(commandList());
			// Just add any case commands if you want to..
			}
		}
});


client.on('voiceStateUpdate', (oldMember, newMember) => {
	//console.log("Voice state changed");
	//console.log(newMember.user);
	if(newMember.user.bot){
		
		console.log("Bot voice state updated");
		
	}
});


client.on('guildMemberSpeaking', (member, speaking) => {
	console.log("Speaking");
	//console.log(newMember.user);
	if(member.user.bot){
		
		console.log("Bot is speaking");
		
	}
});

function setBotVolume(){
	
}

function commandList(){
	var output = '';
	for(var c in commandsList){
		output += commandsList[c].name + ': ' + commandsList[c].description + '\n';
		
	}
	
	return output;	
}

function showPlayingInfo(channel){
	let totalPlayers = 0;
	var messageToSend = "";
	client.users.forEach(function(user){
		if(user.presence.game){
			console.log(user.presence.game);
			totalPlayers++;
			messageToSend += "\n"
			messageToSend += user.username;
			messageToSend += " is playing: ";
			messageToSend += user.presence.game.name;
			messageToSend += "\n"
		}
	});
	if (totalPlayers > 0 && messageToSend !== ""){
		channel.send(messageToSend);
	}
	else{
		channel.send("Nobody is playing anything!");
	}
}

function showStreamingInfo(channel){

	let totalPlayers = 0;
	var messageToSend = "";
	client.users.forEach(function(user){
		if(user.presence.game && user.presence.game.streaming){
			totalPlayers++;
			messageToSend += "\n";
			messageToSend += user.username;
			messageToSend += " is streaming: ";
			messageToSend += user.presence.game.name;
			messageToSend += "\n";
			messageToSend += "Watch it here: ";
			messageToSend += user.presence.game.url;
			messageToSend += "\n";
		}
	});
	if (totalPlayers > 0 && messageToSend !== ""){
		channel.send(messageToSend);
	}
	else{
		channel.send("Nobody is streaming anything!");
	}
}

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'member-log');
	if(!channel) return;
	channel.send(`Welcome to the server, ${member}`);
});


//console.log(commandsList[0].name);
//console.log(commandList());

client.login(auth.token);
setBotVolume();
