/* eslint-disable consistent-return */
const Command = require('../../Structures/Command');
const {
	getMember,
	embedImg
} = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Boops user(s)',
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
			return;
		}
		const boop = [
			'https://i.imgur.com/ExqK67C.gif',
			'https://i.imgur.com/vbpWfhP.gif',
			'https://i.imgur.com/m1KDSyI.gif',
			'https://i.imgur.com/GJla7Kx.gif',
			'https://i.imgur.com/izuAyzx.gif',
			'https://i.imgur.com/fB4HkvP.gif',
			'https://i.imgur.com/DWASR5H.gif',
			'https://i.imgur.com/IQ3xcLP.gif',
			'https://i.imgur.com/RU7ypOm.gif',
			'https://i.imgur.com/qKE4EhK.gif',
			'https://i.imgur.com/da7LMet.gif',
			'https://i.imgur.com/dVnlpwe.gif',
			'https://i.imgur.com/aoI1EB2.gif',
			'https://i.imgur.com/hMocaP9.gif',
			'https://i.imgur.com/TMnV2zL.gif'
		];
		user.shift();
		let message;

		if (user.length > 0) {
			message = user.join(' ');
		}
		if (target === author) {
			return msg.channel.send('Hey! You can\'t boop yourself!');
		}

		return embedImg(msg, author.nickname || author.user.username, 'boops',
			boop[Math.floor(Math.random() * boop.length)], msg.member.displayColor || 'RANDOM', message, target.nickname || target.user.username);
	}

};
