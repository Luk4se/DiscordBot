const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const {
	checkUsername
} = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Displays avatar of user',
			category: 'Fun',
			usage: '[user]'
		});
	}
	async run(message, target) {
		const name = checkUsername(message);
		const member = message.mentions.members.first() || message.guild.members.cache.get(target.shift()) || message.member;
		return message.channel.send(new MessageEmbed()
			.setColor(message.member.displayColor || 'RANDOM')
			.setTitle(`${member.user.username.toUpperCase()} AVATAR`)
			.setURL(member.user.displayAvatarURL({
				format: 'png',
				dynamic: true,
				size: 2048
			}))
			.setTimestamp()
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setImage(`${member.user.displayAvatarURL({
				format: 'png',
				dynamic: true,
				size: 2048
			})}`));
	}

};
