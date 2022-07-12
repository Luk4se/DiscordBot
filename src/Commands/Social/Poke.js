const Command = require('../../Structures/Command');
const {
	getMember,
	embedImg
} = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Pokes user(s)',
			category: 'Social',
			args: true,
			usage: '<user>',
			ratelimit: {
				bucket: 1,
				reset: 10 * 1000,
				stack: true
			},
			disable: 'false'
		});
	}
	async run(msg, user) {
		const author = msg.member;
		const target = msg.mentions.members.first() || await getMember(msg, user.shift());
		if (!target) {
			return 0;
		}
		const poke = [
			'https://i.imgur.com/D5C5fmW.gif',
			'https://i.imgur.com/JbJwxCq.gif',
			'https://i.imgur.com/VVwPOgu.gif',
			'https://i.imgur.com/ikeIpJ2.gif',
			'https://i.imgur.com/nk2BtDe.gif',
			'https://i.imgur.com/suXtd0Q.gif',
			'https://i.imgur.com/DbJbhvZ.gif',
			'https://i.imgur.com/bDFOTXM.gif',
			'https://i.imgur.com/jwXVjeU.gif',
			'https://i.imgur.com/h1tnsS3.gif',
			'https://i.imgur.com/51r6tfS.gif',
			'https://i.imgur.com/xpQWM9d.gif',
			'https://i.imgur.com/VV1rDua.gif',
			'https://i.imgur.com/nR88Lgj.gif'
		];
		user.shift();
		let message;

		if (user.length > 0) {
			message = user.join(' ');
		}
		if (target === author) {
			return msg.channel.send('Hey! You can\'t poke yourself!');
		}
		return embedImg(msg, author.nickname || author.user.username, 'pokes',
			poke[Math.floor(Math.random() * poke.length)], msg.member.displayColor || 'RANDOM', message, target.nickname || target.user.username);
	}

};
