const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const moment = require('moment');
const {
	checkUsername
} = require('../../Structures/Functions');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};
const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['server', 'guild', 'guildinfo', 'serverinfo', 'server-info'],
			description: 'Displays information about the server',
			guildOnly: true,
			category: 'Information'
		});
	}

	async run(message) {
		const name = checkUsername(message);
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`**Guild Information for __${message.guild.name}__**`)
			.setColor(message.member.displayColor || 'RANDOM')
			.setThumbnail(message.guild.iconURL({
				dynamic: true,
				size: 2048
			}))
			.setTimestamp()
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.addField('General', [
				`**• Name: ** ${message.guild.name}`,
				`**• ID: ** ${message.guild.id}`,
				`**• Owner: ** ${message.guild.owner.user.tag}`,
				`**• Region: ** ${regions[message.guild.region]}`,
				`**• Boost Tier: ** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**• Explicit Filter: ** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**• Verification Level: ** ${verificationLevels[message.guild.verificationLevel]}`,
				`**• Time Created: ** ${moment(message.guild.createdAt).format('LLLL')}, ${moment(message.guild.createdAt).fromNow()}`,
				'\u200b'
			])
			.addField('Statistics', [
				`**• Role Count: ** ${roles.length}`,
				`**• Emoji Count: ** ${emojis.size}`,
				`**• Regular Emoji Count: ** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**• Animated Emoji Count: ** ${emojis.filter(emoji => emoji.animated).size}`,
				`**• Text Channels: **${channels.filter(channel => channel.type === 'text').size}`,
				`**• Voice Channels: **${channels.filter(channel => channel.type === 'voice').size}`,
				'\u200b'
			])
			.setTimestamp();
		return message.channel.send(embed);
	}

};
