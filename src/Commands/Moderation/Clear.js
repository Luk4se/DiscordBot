/* eslint-disable no-shadow */
const Command = require('../../Structures/Command');

const {
	getMember,
	errorReplies,
	clearHundredMessages
} = require('../../Structures/Functions');


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['prune', 'nuke'],
			description: 'Delete messages from a determined range',
			category: 'Moderation',
			args: true,
			guildOnly: true,
			userPerms: ['MANAGE_MESSAGES'],
			botPerms: ['MANAGE_MESSAGES'],
			usage: '<amount(1-300)> [user]'
		});
	}

	async run(msg, clear) {
		const member = getMember(msg, clear);
		if (member) {
			clear = this.client.utils.arrayRemove(clear, member);
		}

		if (isNaN(parseInt(clear))) {
			return msg.channel.send(`${errorReplies()} ${clear} is not a numerical value.`);
		} else if (parseInt(clear) < 1 || parseInt(clear) > 300) {
			return msg.reply(`${errorReplies()} You need to input a number between 1 and 300. Any number above 99 will take longer`);
		}

		clear = parseInt(clear) + 1;
		if (clear > 100) {
			return clearHundredMessages(msg, clear);
		}
		msg.channel.bulkDelete(clear, true)
			// eslint-disable-next-line consistent-return
			.then(messages => {
				if (messages.size !== clear) {
					// eslint-disable-next-line no-extra-parens
					if (messages.size > 1) { msg.author.send(`I deleted ${(messages.size - 1)} message(s) from all users in channel <#${msg.channel.id}> in server **${msg.guild.name}**`); }
					// eslint-disable-next-line no-extra-parens
					return msg.author.send(`Sorry, but there were ${(clear - 1) - (messages.size - 1)} out of ${(clear - 1)} messages that are over 14 days old, and I couldn't delete them.`);
				}
				if (messages.size > 2) {
					// eslint-disable-next-line no-extra-parens
					msg.author.send(`I deleted ${(messages.size - 1)} message(s) from all users in channel <#${msg.channel.id}> in server **${msg.guild.name}**`);
				}
			});
		return 0;
	}

};
