const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'If you want to support me, this will give you the link to my Patreon',
			category: 'Information'
		});
	}

	async run(msg) {
		const embed = new MessageEmbed()
			.setTitle('Patreon')
			.setDescription(`Hello! I'm happy that you are considering supporting me like that, the link to my Patreon is below:         
                            https://discord.gg/FEgAYEfq8s`);
		msg.channel.send(embed);
	}

};
