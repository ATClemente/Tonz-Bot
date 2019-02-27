const Discord = require('discord.js');
const client = new Discord.Client();

var auth = require('./auth.json');
var commandsList = require('./constants.json').commands;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

/*if(message.tts){
	message.delete();
	message.reply('Why the /tts though?');
}*/


if (message.content.substring(0, 1) == '!') {
	
	
	var args = message.content.substring(1).split(' ');
	var cmd = args[0];

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
			message.channel.send(commandList());
			//console.log(client.users.random().username);
		break;
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
	
	console.log(client.users);
	
}

function commandList(){
	var output = '';
	for(var c in commandsList){
		output += commandsList[c].name + ': ' + commandsList[c].description + '\n';
		
	}
	
	return output;	
}


//console.log(commandsList[0].name);
//console.log(commandList());

client.login(auth.token);
setBotVolume();