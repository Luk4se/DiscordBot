const Command = require('../../Structures/Command');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Gives the current uptime of the bot',
			category: 'Owner',
			ownerOnly: true
		});
	}

	async run(message) {
		return message.channel.send(`My uptime is \`${ms(this.client.uptime, { long: true })}\``);
	}

};
