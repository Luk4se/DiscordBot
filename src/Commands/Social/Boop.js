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
		const boop = [
			'https://i.imgur.com/ExqK67C.gif',
			'https://i.imgur.com/vbpWfhP.gif',
			'https://i.imgur.com/m1KDSyI.gif',
			'https://i.imgur.com/GJla7Kx.gif'
		];

		if (target === author) {
			return	msg.channel.send('Hey! You can\'t boop yourself!');
		}

		return msg.channel.send(`**${author.nickname || author.user.username}** boops **${target.nickname || target.user.username}**!`, {
			files: [boop[Math.floor(Math.random() * boop.length)]]
		});
	}

};
