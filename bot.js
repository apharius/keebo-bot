var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

var text = fs.readFileSync('pictures/dong/dong_list.txt', 'utf-8');
var donglist = text.split('\n');
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
				var dongIndex = Math.floor((Math.random() * donglist.length) +1);	
				var chosenDong = donglist[dongIndex]
				logger.info(chosenDong);
				bot.uploadFile({
					to: channelID,
					file: 'pictures/dong/'+ chosenDong
				});
				logger.info('Dong begärd av ' + user);

				break;
			

		}
	}
});
