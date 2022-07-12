const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Gives the ping of the bot',
			category: 'Utilities'
		});
	}

	async run(message) {
		const embed = new MessageEmbed()
			.setDescription('Pinging...');

		return message.channel.send(embed).then(msg => {
			const latency = msg.createdTimestamp - message.createdTimestamp;
			const choices = ['Is this really my ping?', 'Is this okay?', 'I can\'t look!', 'I hope it isn\'t bad!'];
			const responses = choices[Math.floor(Math.random() * choices.length)];

			embed.setDescription(`${responses} \n\n Bot Latency: \`${latency} ms\` \n API Latency: \`${Math.round(this.client.ws.ping)} ms\``);
			msg.edit(embed);
		});
	}

};
