const Command = require('../../Structures/Command');
const {
	getMember, embedImg
} = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Pats users',
			category: 'Social',
			args: true,
			usage: '<users>',
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
		const pat = [
			'https://i.imgur.com/glZH1gj.gif',
			'https://imgur.com/x5PKnhL.gif',
			'https://imgur.com/JjP3FLz.gif',
			'https://imgur.com/iDwzrH0.gif',
			'https://imgur.com/4MWTxOk.gif',
			'https://imgur.com/66u102k.gif',
			'https://i.imgur.com/g3prIbJ.gif',
			'https://i.imgur.com/cZNd1O4.gif',
			'https://i.imgur.com/5rg5UkQ.gif',
			'https://i.imgur.com/nBTdtcN.gif',
			'https://i.imgur.com/u7wOtfA.gif',
			'https://i.imgur.com/SoK5H2d.gif',
			'https://i.imgur.com/hX4qe0G.gif',
			'https://i.imgur.com/0YjhtUa.gif',
			'https://i.imgur.com/oin9FUK.gif',
			'https://i.imgur.com/nBBWIjf.gif'
		];

		user.shift();
		let message;

		if (user.length > 0) {
			message = user.join(' ');
		}

		if (target === author) {
			return msg.channel.send('Hey! You can\'t pat yourself!');
		}

		return embedImg(msg, author.nickname || author.user.username, 'pats',
			pat[Math.floor(Math.random() * pat.length)], msg.member.displayColor || 'RANDOM', message, target.nickname || target.user.username);
	}

};
