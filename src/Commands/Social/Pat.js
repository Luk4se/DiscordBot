const Command = require('../../Structures/Command');
const {
	getMember
} = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Boops an user',
			category: 'Social',
			args: true,
			usage: '<user>',
			ratelimit: {
				bucket: 1,
				reset: 10 * 1000,
				stack: true
			}
		});
	}
	async run(msg, user) {
		const author = msg.member;
		const target = getMember(msg, user);
		const patting = [
			'https://i.imgur.com/glZH1gj.gif',
			'https://imgur.com/x5PKnhL.gif',
			'https://imgur.com/JjP3FLz.gif',
			'https://imgur.com/iDwzrH0.gif',
			'https://imgur.com/4MWTxOk.gif',
			'https://imgur.com/66u102k.gif',
			'https://i.imgur.com/g3prIbJ.gif'
		];

		if (target === author) {
			return msg.channel.send('Hey! You can\'t pat yourself!');
		}

		return msg.channel.send(`**${author.nickname || author.user.username}** sends **${target.nickname || target.user.username}** their love!`, {
			files: [patting[Math.floor(Math.random() * patting.length)]]
		});
	}

};
