/* eslint-disable no-shadow */
const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const {
	getMember,
	errorReply,
	errorReplies,
	promptMessage
} = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Kick User',
			category: 'Moderation',
			args: true,
			userPerms: ['KICK_MEMBERS'],
			botPerms: ['KICK_MEMBERS'],
			guildOnly: true,
			usage: '<user>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(msg, kick) {
		const target = msg.mentions.members.first() || await getMember(msg, kick.shift());
		kick.shift();
		if (target.hasPermission('KICK_MEMBERS')) {
			return msg.channel.send(`${errorReply()} You can't kick a mod!`).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		if (!target) {
			return msg.channel.send(`${errorReplies()} Please specify someone to kick.`).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		const embed = new MessageEmbed()
			.setColor('RED')
			.setAuthor(`Do you want to kick ${target.user.username}?`)
			.setDescription('This verification will delete itself after 30 seconds');

		msg.channel.send(embed).then(async embedmsg => {
			const emoji = await promptMessage(embedmsg, msg.author, 30, ['773017276977905674', '773017277024829480']);


			if (emoji === '773017276977905674') {
				embedmsg.delete();
				target.kick().then(() => {
					msg.reply(`${target} was kicked from the server. Goodbye.`);
				}).catch(err => {
					console.log(err);
				});
			} else if (emoji === '773017277024829480') {
				embedmsg.delete();
				msg.reply('Kick canceled...')
					.then(msgreply => msgreply.delete({ timeout: 5000 }));
			}
		});
		return 0;
	}

};
