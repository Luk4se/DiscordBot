const Command = require('../../Structures/Command');
const {
	getMember, embedImg
} = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Hugs user(s)',
			category: 'Social',
			args: true,
			usage: '<user>',
			ratelimit: {
				bucket: 1,
				reset: 30 * 1000,
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

		const hug = [
			'https://i.imgur.com/x3rjvex.gif',
			'https://i.imgur.com/2OnlMrF.gif',
			'https://i.imgur.com/pofvSWq.gif',
			'https://i.imgur.com/owNTsvU.gif',
			'https://i.imgur.com/kRLAwKP.gif',
			'https://i.imgur.com/5fFNwoN.gif',
			'https://i.imgur.com/MKCXkgB.gif',
			'https://i.imgur.com/1crmISF.gif',
			'https://i.imgur.com/ka8cOUx.gif',
			'https://i.imgur.com/ObqBNrq.gif',
			'https://i.imgur.com/OKrl5w2.gif',
			'https://i.imgur.com/qRyW4Bk.gif',
			'https://i.imgur.com/CBUgSdA.gif',
			'https://i.imgur.com/R5J5SrO.gif',
			'https://i.imgur.com/Mcj4Kzd.gif',
			'https://i.imgur.com/NWELhNH.gif',
			'https://i.imgur.com/wrJ0XsU.gif',
			'https://i.imgur.com/OAK9BdZ.gif',
			'https://i.imgur.com/iVCLhkH.gif',
			'https://i.imgur.com/Ppo71u3.gif',
			'https://i.imgur.com/kp4eHEa.gif',
			'https://i.imgur.com/02eNyka.gif',
			'https://i.imgur.com/5H8n4uZ.gif',
			'https://i.imgur.com/IRNktlj.gif',
			'https://i.imgur.com/B2O4gBc.gif',
			'https://i.imgur.com/GhzWkGm.gif',
			'https://i.imgur.com/eaEf0y2.gif',
			'https://i.imgur.com/phzz0rM.gif',
			'https://i.imgur.com/BBsFCLK.gif',
			'https://i.imgur.com/xwELPUL.gif',
			'https://i.imgur.com/Ib4SbD2.gif',
			'https://i.imgur.com/svUr4ZR.gif',
			'https://i.imgur.com/32jvyqk.gif',
			'https://i.imgur.com/dHa1Fu2.gif',
			'https://i.imgur.com/taTFFcR.gif',
			'https://i.imgur.com/k4lWkya.gif',
			'https://i.imgur.com/jpNEL3i.gif',
			'https://i.imgur.com/z9eLVNK.gif',
			'https://i.imgur.com/x0TLMNF.gif',
			'https://i.imgur.com/rGO7by8.gif',
			'https://i.imgur.com/ZNO1m73.gif'
		];

		user.shift();
		let message;

		if (user.length > 0) {
			message = user.join(' ');
		}
		if (target === author) {
			return msg.channel.send('Hey! You can\'t hug yourself!');
		}

		return embedImg(msg, author.nickname || author.user.username, 'hugs',
			target.nickname || target.user.username, hug[Math.floor(Math.random() * hug.length)], msg.member.displayColor || 'RANDOM', message);
	}


};
