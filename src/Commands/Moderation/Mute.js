/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const Command = require('../../Structures/Command');
const muteSchema = require('../../Schemas/mute-schema');
const {
	errorReplies, errorReply
} = require('../../Structures/Functions');
const {
	timeUnit,
	convertTime
} = require('../../Structures/TimeFunctions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Mutes an user',
			category: 'Moderation',
			usage: '<user> <time>',
			userPerms: ['MANAGE_ROLES'],
			botPerms: ['MANAGE_ROLES'],
			args: true,
			guildOnly: true
		});
	}

	async run(msg, mutee) {
		const staff = msg.author;
		const target = msg.mentions.members.last() || msg.guild.members.cache.get(mutee);
		if (!target) {
			return msg.channel.send(`${errorReplies()} Please specify someone to mute.`).then(msg => msg.delete({ timeout: 5000 }));
		}
		if (target.hasPermission('KICK_MEMBERS')) {
			return msg.channel.send(`${errorReply()} You can't mute a mod!`).then(msg => msg.delete({ timeout: 5000 }));
		}

		mutee.shift();
		let time = mutee.join('');
		let unit = time.replace(/[0-9]/g, '').toLowerCase();
		time = time.replace(/\D/g, '');

		if (!time) {
			return msg.channel.send(`${errorReply()} Please specify how long this user will be muted.`).then(msg => msg.delete({ timeout: 5000 }));
		} else if (!unit) {
			return msg.channel.send(`${errorReply()} Please specify a valid unit: \`sec\`, \`min\`, \`hour\`, \`days\`.`).then(msg => msg.delete({ timeout: 5000 }));
		}

		unit = timeUnit(msg, unit);
		time = convertTime(time, unit, 'min');

		const previousMutes = await muteSchema.find({
			userId: target.id
		});

		const currentlyMuted = previousMutes.filter(mute => mute.current === true);

		if (currentlyMuted.length) {
			return msg.channel.send(`${target.nickname || target.user.username} is already muted.`).then(msg => msg.delete({ timeout: 5000 }));
		}

		if (time >= '60') {
			time = convertTime(time, 'min', 'h');
			unit = 'hour(s)';
		}

		const expires = new Date();
		expires.setMinutes(expires.getMinutes() + (time * 1));

		// eslint-disable-next-line no-shadow
		let mutedRole = msg.guild.roles.cache.find(role => role.name === 'Muted');
		if (!mutedRole) {
			try {
				mutedRole = await msg.guild.roles.create({
					data: {
						name: 'Muted',
						color: '#514f48',
						permissions: []
					}
				});

				// eslint-disable-next-line no-unused-vars
				msg.guild.channels.cache.forEach(async (channel, id) => {
					await channel.updateOverwrite(mutedRole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
						SEND_TTS_MESSAGES: false,
						ATTACH_FILES: false,
						SPEAK: false
					});
				});
			} catch (err) {
				console.log(err.stack);
			}
		}
		const targetMember = (await msg.guild.members.fetch()).get(target.id);
		try {
			await targetMember.roles.add(mutedRole);
		} catch (err) {
			return msg.channel.send(`I couldn't mute the user, please check the role priorities, I should be higher than a normal user role.`).then(msg => msg.delete({ timeout: 5000 }));
		}
		// eslint-disable-next-line new-cap
		await new muteSchema({
			userId: target.id,
			guildId: msg.guild.id,
			staffId: staff.id,
			staffTag: staff.tag,
			expires,
			current: true
		}).save();

		return msg.channel.send(`You muted <@${target.id}>. They will be unmuted in ${time} ${unit}.`);
	}

};
