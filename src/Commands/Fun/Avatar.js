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
		const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
		return message.channel.send(new MessageEmbed()
			.setColor(message.member.displayHexColor || 'RANDOM')
			.setTimestamp()
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setImage(`${member.user.displayAvatarURL({
				dynamic: true,
				size: 2048
			})}`));
	}

};
