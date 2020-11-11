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

		const shiv = [
			'https://i.imgur.com/DVJAlPu.gif',
			'https://imgur.com/TrPWlmR.gif'
		];
		if (target === author) {
			return msg.channel.send('Hey! You can\'t shiv yourself!');
		}
		return msg.channel.send(`**${author.nickname || author.user.username}** shivs **${target.nickname || target.user.username}**!`, {
			files: [shiv[Math.floor(Math.random() * shiv.length)]]
		});
	}

};
