const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const moment = require('moment');
const {
	checkUsername
} = require('../../Structures/Functions');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['user', 'ui'],
			description: 'Displays information about an user or message author',
			category: 'Information',
			guildOnly: true,
			usage: '[user]'
		});
	}

	async run(message, [target]) {
		const name = checkUsername(message);
		const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
		let boost;

		if (member.premiumSinceTimestamp) {
			boost = `${moment(member.premiumSinceTimestamp).format('LLLL')}, ${moment(member.premiumSinceTimestamp).fromNow()}`;
		}

		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const userFlags = member.user.flags.toArray();
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setColor(member.displayHexColor || 'RANDOM')
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setTimestamp()
			.addField('User', [
				`**•  Username:** ${member.user.username}`,
				`**•  Discriminator:** ${member.user.discriminator}`,
				`**•  ID:** ${member.id}`,
				`**•  Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				` **•  Avatar:** [Link to Avatar](${member.user.displayAvatarURL({ dynamic: true, size: 2048 })}) `,
				`**•  Time Created:** ${moment(member.user.createdTimestamp).format('LLLL')}, ${moment(member.user.createdTimestamp).fromNow()}`,
				`**•  Status:** ${member.user.presence.status === 'online' ? 'Online' :
					member.user.presence.status === 'dnd' ? 'Online - Do Not Disturb' :
						member.user.presence.status === 'idle' ? 'Online - Idle' :
							member.user.presence.status === 'offline' ? 'Offline' : ' '}`,
				'\u200b'
			])
			.addField('Member', [
				`**•  Nickname:** ${member.nickname || 'None'}`,
				`**•  Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**•  Server Joined Date:** ${moment(member.joinedAt).format('LLLL')}, ${moment(member.joinedAt).fromNow()}`,
				`**•  Roles [${roles.length}]: ** ${roles.length <= 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
				`**•  Boost:** ${boost || 'Member hasn\'t boosted the server.'}`,
				'\u200b'
			]);
		return message.channel.send(embed);
	}

};
