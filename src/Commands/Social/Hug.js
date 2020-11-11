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
		const hug = [
			'https://i.imgur.com/x3rjvex.gif',
			'https://i.imgur.com/2OnlMrF.gif',
			'https://i.imgur.com/pofvSWq.gif',
			'https://i.imgur.com/owNTsvU.gif',
			'https://i.imgur.com/kRLAwKP.gif',
			'https://i.imgur.com/5fFNwoN.gif',
			'https://i.imgur.com/MKCXkgB.gif',
			'https://i.imgur.com/1crmISF.gif',
			'https://i.imgur.com/ka8cOUx.gif'
		];
		if (target === author) {
			return msg.channel.send('Hey! You can\'t hug yourself!');
		}
		return msg.channel.send(`**${author.nickname || author.user.username}** hugs **${target.nickname || target.user.username}**!`, {
			files: [hug[Math.floor(Math.random() * hug.length)]]
		});
	}


};
