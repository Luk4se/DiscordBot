const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Secret help',
			category: 'Secret'
		});
	}
	async run(msg) {
		msg.channel.send(`Oh! Yes, do you need something? I can help with... well, with a lot of things. Just type ${this.client.prefix}help here and I'll tell you what I can do!`);
	}


};
