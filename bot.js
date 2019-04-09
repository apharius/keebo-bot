var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var commandlist = require('./commands.json');
var errors = require('./errors.json');
var releaseinfo = require('./releaseinfo.json')
var charadatabase = require('./charadatabase.json')

var botchannel = '510571201962442756';

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

var dongtext = fs.readFileSync('donglist.txt', 'utf-8');
var donglist = dongtext.split('\n');

var poketext = fs.readFileSync('pokegiflist.txt','utf-8');
var pokelist = poketext.split('\n');

var waifutext = fs.readFileSync('waifulist.txt','utf-8');
var waifulist = waifutext.split('\n');

var nopetext = fs.readFileSync('nopelist.txt','utf-8');
var nopelist = nopetext.split('\n');

var command_string = 'Lista över kommandon:\n';

for(x in commandlist.commands){
	command_string += commandlist.commands[x].name + ': ' + commandlist.commands[x].description + '\n';
}

var chosentoken = '';

if(auth.devmode == true){
	chosentoken = auth.devtoken;
}

else{
	chosentoken = auth.token;
}

var days = ['söndag','måndag','tisdag','onsdag','torsdag','fredag','lördag']
var bot = new Discord.Client({token: chosentoken,
	autorun: true});

bot.on('ready', function(){
	
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
	bot.sendMessage({
		to:botchannel,
		message: 'Keebo ' + releaseinfo.version + ' online. In this version:\n' + releaseinfo.info
	});

});

bot.on('message', function(user, userId, channelID, message, evt){
	if(message.substring(0, 1) == '!'){
		var args = message.substring(1).split(' ');
		var cmd = args[0];	
		var dayIndex = days.indexOf(cmd);

		if(dayIndex > -1){
			dayPost(days[dayIndex],channelID);
			logger.info(days[dayIndex] + ' begärd av ' + user);
			return;
		}

		var randomimg = ['dong','pokegif','waifu','nope'];
		var randomlists = [donglist, pokelist, waifulist, nopelist];
		var randomIndex = randomimg.indexOf(cmd);

		if(randomIndex > -1){
			randomImage(randomlists[randomIndex],channelID);
			logger.info(randomimg[randomIndex] + ' begärd av ' + user);
			return;
		}

		switch(cmd){	
			case 'badsalt':
				postImage(channelID,'pictures/others/badsalt.png');
				logger.info('Badsalt begärd av ' + user);
				break;
			
			case 'help':
				bot.sendMessage({
					to: channelID,
					message: command_string
				});
				logger.info('Hjälp begärd av ' + user);
				break;
			case 'story':
				bot.sendMessage({
					to: channelID,
					message: auth.story
				});
				logger.info('Varför?');
				break;

			case 'triplegay':
				postImage(channelID,'pictures/others/triplegay.jpg');
				logger.info('Personen efter ' + user + ' trippelbög');
				break;
			case 'chara':
				var charaName = args[1].toLowerCase();
				var message = 'No such Chara in database!';
				var imagepath = '';
				for(chara in charadatabase.charas){
					if(charaName == charadatabase.charas[chara].shortname){
						message = 'Name: ' + charadatabase.charas[chara].fullname + 
							'\nBackstory: ' + charadatabase.charas[chara].biography +
							'\nCreator: ' + charadatabase.charas[chara].creator;
						imagepath = charadatabase.charas[chara].imagepath; 
					}
				}

				bot.uploadFile({to: channelID,
					file: imagepath,
					message: message});
				break;

			default:
				var errorIndex = Math.floor((Math.random() * errors.errors.length))
				var chosenError = errors.errors[errorIndex]
				bot.sendMessage({
					to:channelID,
					message:chosenError});
				break;
		}
	}
});

function goodMorningGoodNight(){
	var date = new Date();
	var hour = date.getHours()
	var minute = date.getMinutes()
	var day = date.getDay()
	logger.info('Klockan är ' + hour + ':' + minute);
	if(hour == 0 && minute == 0){
		postImage(botchannel,'pictures/others/sleep.jpg')
		logger.info('Midnatt.');
	}

	else if (hour == 8 && minute == 0){
		bot.sendMessage({
			to:botchannel,
			message: 'Rise and shine, ursine!\nhttps://youtu.be/i6SCkwNOAug'
		});
		logger.info('Morgon.');

		dayPost(days[day],botchannel)
	}
}

setInterval(goodMorningGoodNight,60000);

function dayPost(day, channel){
	switch(day){
		case 'måndag':
			bot.sendMessage({
				to:channel,
				message:'https://www.youtube.com/watch?v=s22bwvHQcnc'
			});
			break;
		case 'tisdag':
			postImage(channel,'pictures/days/tisdag.png');
			break;
		case 'onsdag':
		case 'torsdag':
		case 'fredag':
			postImage(channel,'pictures/days/'+day+'.jpg');
			break;
		default:
			bot.sendMessage({
				to:channel,
				message:'Ingen meme idag :('
			});
	}
}

function postImage(channel,loc){
		bot.uploadFile({
			to:channel,	
			file: loc
		});
}

function randomImage(list, channel){
	
	var index = Math.floor((Math.random() * list.length));	
	var chosenImage = list[index]
	logger.info(chosenImage);
	postImage(channel,chosenImage);
}
