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
		const poke = [
			'https://i.imgur.com/D5C5fmW.gif',
			'https://i.imgur.com/JbJwxCq.gif',
			'https://i.imgur.com/VVwPOgu.gif',
			'https://i.imgur.com/ikeIpJ2.gif',
			'https://i.imgur.com/nk2BtDe.gif',
			'https://i.imgur.com/suXtd0Q.gif',
			'https://i.imgur.com/DbJbhvZ.gif'
		];

		// let result = Math.floor((Math.random() * patting.length));
		if (target === author) {
			return msg.channel.send('Hey! You can\'t poke yourself!');
		}
		return msg.channel.send(`**${author.nickname || author.user.username}** pokes **${target.nickname || target.user.username}**`, {
			files: [poke[Math.floor(Math.random() * poke.length)]]
		});
	}

};
