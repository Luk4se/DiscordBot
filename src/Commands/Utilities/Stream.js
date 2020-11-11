const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Announce your Stream',
			category: 'Utilities'
		});
	}

	async run(msg, stream) {
		stream = stream.join(' ');
		const { member } = msg;
		return msg.channel.send(`@here **${member.nickname || member.user.username}** is streaming **${stream}**! Come join!`);
	}

};
