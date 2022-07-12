const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'If you need any support on the bot, this will show the official discord support server',
			category: 'Information'
		});
	}

	async run(msg) {
		const embed = new MessageEmbed()
			.setTitle('Support Server')
			.setDescription(`Hello! Thanks for using my bot, if you need any help with it, please do join my server through the following link:         
                            https://discord.gg/FEgAYEfq8s`);
		msg.channel.send(embed);
	}

};
