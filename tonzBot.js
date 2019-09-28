/* A discord bot for me and friends
 * Author: Anthony Clemente
 * 2019
 * */

const Discord = require('discord.js');
const client = new Discord.Client();

var auth = require('./auth.json');
var commandsList = require('./constants.json').commands;

const axios = require('axios');

let serverDeckId = null;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
	
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
			case commandsList[7].name:
				message.channel.send(CABAL_TEXT);
				message.channel.send('<:zavvy:508103287690756096>');
			break;
			case commandsList[8].name: //card
				let imageLink = await drawCard(serverDeckId);
				message.channel.send({files: [imageLink]});
				break;
			case "commands":
				message.channel.send(commandList());
			// Just add any case commands if you want to..
			}
		}
});

const CABAL_TEXT = "Whether we wanted it or not, we've stepped into a war with the Cabal on Mars. So let's " +
	           "get to taking out their command, one by one. Valus Ta'aurc. From what I can gather, he commands " +
		   "the Siege Dancers from an Imperial Land Tank just outside of Rubicon. He's well protected, but " +
		   "with the right team, we can punch through those defenses, take this beast out, and break their " +
		   "grip on Freehold."

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

async function drawCard(deckId) {
	if(deckId === null){
        deckId = "new";
	}
	try{
    const { data } = await axios({
            method: 'get',
            url: 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=1',
		});
		
		if(data.success){
			serverDeckId = data.deck_id
			if(data.remaining === 0){
				serverDeckId = null;
			}
			return data.cards[0].image;
		}
    }
    catch(e){
		console.log(e.response.status);
		console.log(e.response.data);

		return null;
    }
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



client.login(auth.token);
