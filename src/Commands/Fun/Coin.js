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
			aliases: ['toss'],
			description: 'Toss a coin!',
			category: 'Fun'
		});
	}

	async run(message) {
		const name = checkUsername(message);
		const result = ['HEADS', 'TAILS'];
		const cEmbed = new MessageEmbed()
			.setColor(message.member.displayColor || 'RANDOM')
			.setAuthor('COIN TOSSED!', message.guild.iconURL())
			.setDescription(`The result was: ${result[Math.floor(Math.random() * result.length)]}`)
			.setTimestamp()
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}));
		return message.channel.send(cEmbed);
	}

};
