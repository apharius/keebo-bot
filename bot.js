var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

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
					file:'tisdag.png'
				});
				logger.info('Tisdag begärd av ' + user);
				break;

			case 'onsdag':
				bot.uploadFile({
					to: channelID,
					file:'onsdag.jpg'
				});
				
				logger.info('Onsdag begärd av ' + user);
				break;
			case 'torsdag':
				bot.uploadFile({
					to: channelID,
					file:'kuken.jpg'
				});
				
				logger.info('Torsdag begärd av ' + user);
				break;
			case 'fredag':
				bot.uploadFile({
					to: channelID,
					file:'fredag.jpg'
				});
				logger.info('Fredag begärd av ' + user);

				break;
			
			case 'badsalt':
				bot.uploadFile({
					to: channelID,
					file:'badsalt.png'
				});
				logger.info('Badsalt begärd av ' + user);

				break;
			
			case 'featurelength':
				bot.uploadFile({
					to: channelID,
					file:'featurelength.jpg'
				});
				logger.info('Feature Length begärd av ' + user);

				break;
			

		}
	}
});
