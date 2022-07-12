/* eslint-disable no-shadow */
const Command = require('../../Structures/Command');
const {
	getMember,
	errorReplies,
	errorReply
} = require('../../Structures/Functions');
const muteSchema = require('../../Schemas/mute-schema');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Unmutes an user',
			category: 'Moderation',
			usage: '<@user> or <ID>',
			userPerms: ['MANAGE_ROLES'],
			args: true,
			guildOnly: true
		});
	}

	// eslint-disable-next-line consistent-return
	async run(msg, target) {
		if (target.length !== 1) {
			return msg.channel.send(`${errorReply()}. Please check the command following the example, ${this.client.prefix}unmute \`@<user>\` or  \`${this.client.prefix}unmute <ID>\`.`)
				.then(msg => msg.delete({ timeout: 5000 }));
		}
		const member = msg.mentions.members.first() || await getMember(msg, target.shift());
		if (!member) {
			return msg.channel.send(`${errorReplies()}. Please specify someone to check if they're muted.`).then(msg => msg.delete({ timeout: 5000 }));
		}

		const result = await muteSchema.updateOne({
			guildId: msg.guild.id,
			userId: member.id,
			current: true
		}, {
			current: false
		});

		if (result.nModified === 1) {
			const mutedRole = msg.guild.roles.cache.find(role => role.name === 'Muted');
			if (mutedRole) {
				const guildMember = msg.guild.members.cache.get(member.id);
				try {
					await guildMember.roles.remove(mutedRole);
				} catch (err) {
					return msg.channel.send(`I couldn't unmute the user, please check the role priorities, I should be higher than a normal user role.`).then(msg => msg.delete({ timeout: 5000 }));
				}
			}
			msg.channel.send(`**${member.nickname || member.user.username}** has been unmuted`);
		} else {
			msg.channel.send('Sorry, but that user isn\'t muted.').then(msg => msg.delete({ timeout: 5000 }));
		}
		return 0;
	}


};
