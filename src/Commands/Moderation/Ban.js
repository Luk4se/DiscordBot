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
			description: 'Ban User',
			category: 'Moderation',
			args: true,
			userPerms: ['BAN_MEMBERS'],
			botPerms: ['BAN_MEMBERS'],
			usage: '<user> [reason]'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(msg, ban) {
		const target = msg.mentions.members.first() || await getMember(msg, ban.shift());
		ban.shift();
		if (target.hasPermission('BAN_MEMBERS')) {
			return msg.channel.send(`${errorReply()} You can't ban a mod!`).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		if (!target) {
			return msg.channel.send(`${errorReplies()} Please specify someone to ban.`).then(msg => msg.delete({
				timeout: 5000
			}));
		}
		const embed = new MessageEmbed()
			.setColor('RED')
			.setAuthor(`Do you want to ban ${target.user.username}?`)
			.setDescription('This verification will delete itself after 30 seconds');

		msg.channel.send(embed).then(async embedmsg => {
			const emoji = await promptMessage(embedmsg, msg.author, 30, ['773017276977905674', '773017277024829480']);
			if (emoji === '773017276977905674') {
				embedmsg.delete();
				target.ban({ reason: ban.join(' ') }).then(() => {
					msg.reply(`${target} was banned from the server. Goodbye.`);
				}).catch(err => {
					console.log(err);
				});
			} else if (emoji === '773017277024829480') {
				embedmsg.delete();
				msg.reply('Ban canceled...')
					.then(msgreply => msgreply.delete({ timeout: 5000 }));
			}
		});
	}

};
