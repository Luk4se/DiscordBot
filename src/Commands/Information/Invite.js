const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Get invite link for bot',
			category: 'Information'
		});
	}

	async run(msg) {
		console.log(msg.channel)
		const embed = new MessageEmbed()
			.setTitle('Invite Link')
			.setDescription(`Here's my invite link for you to add me on your server :3         
                           https://discord.com/api/oauth2/authorize?client_id=652867497787392000&permissions=1476914294&scope=bot`);
		msg.channel.send(embed);
	}

};
