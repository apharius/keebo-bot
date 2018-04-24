var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var commandlist = require('./commands.json');

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


var command_string = '';

for(x in commandlist.commands){
	command_string += commandlist.commands[x].name + ': ' + commandlist.commands[x].description + '\n';
}

var bot = new Discord.Client({token: auth.token,
	autorun: true});

bot.on('ready', function(){
	
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function(user, userId, channelID, message, evt){
	if(message.substring(0, 1) == '!'){
		var args = message.substring(1).split(' ');
		var cmd = args[0];

		args = args.splice(1);

		switch(cmd){
			case 'måndag':
				bot.sendMessage({
					to: channelID,
					message:'https://www.youtube.com/watch?v=s22bwvHQcnc'
				});
				logger.info('Måndag begärd av ' + user);
				break;
			case 'tisdag':
				bot.uploadFile({
					to: channelID,
					file:'pictures/days/tisdag.png'
				});
				logger.info('Tisdag begärd av ' + user);
				break;

			case 'onsdag':
				bot.uploadFile({
					to: channelID,
					file:'pictures/days/onsdag.jpg'
				});
				
				logger.info('Onsdag begärd av ' + user);
				break;
			case 'torsdag':
				bot.uploadFile({
					to: channelID,
					file:'pictures/days/torsdag.jpg'
				});
				
				logger.info('Torsdag begärd av ' + user);
				break;
			case 'fredag':
				bot.uploadFile({
					to: channelID,
					file:'pictures/days/fredag.jpg'
				});
				logger.info('Fredag begärd av ' + user);

				break;
			
			case 'badsalt':
				bot.uploadFile({
					to: channelID,
					file:'pictures/others/badsalt.png'
				});
				logger.info('Badsalt begärd av ' + user);

				break;
			
			case 'dong':
				var dongIndex = Math.floor((Math.random() * donglist.length));	
				var chosenDong = donglist[dongIndex]
				logger.info(chosenDong);
				bot.uploadFile({
					to: channelID,
					file: chosenDong
				});
				logger.info('Dong begärd av ' + user);

				break;
			case 'pokegif':
				var pokeGifIndex = Math.floor((Math.random()*pokelist.length));
				var chosenPokeGif = pokelist[pokeGifIndex];
				logger.info(chosenPokeGif);

				bot.uploadFile({
					to: channelID,
					file: chosenPokeGif
				});
				logger.info('Pokémongif begärd av ' + user);
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

			case 'waifu':
				var waifuIndex = Math.floor((Math.random() * waifulist.length));	
				var chosenWaifu = waifulist[waifuIndex]
				logger.info(chosenWaifu);
				bot.uploadFile({
					to: channelID,
					file: chosenWaifu
				});
				logger.info('Waifu begärd av ' + user);

				break;
			case 'triplegay':
				bot.uploadFile({
					to: channelID,
					file: 'pictures/others/triplegay.jpg'
				});
				logger.info('Personen efter ' + user + ' trippelbög');
				break;
			default:
				bot.sendMessage({
					to:channelID,
					message:'That\'s robophobic!'});
				break;
		}
	}
});
