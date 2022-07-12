const {
	MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Command');
const {
	getMember,
	promptNormalMessage,
	checkUsername
} = require('../../Structures/Functions');
const {
	checkWinner,
	playAgain
} = require('../../Structures/RPS');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Play Rock, Paper and Scissors with me or an user',
			category: 'Games',
			usage: '[user]'
		});
	}
	async run(msg, target) {
		const name = checkUsername(msg);
		const user = await getMember(msg, target.shift() || '725519211929272402');
		const rps = ['🗿', '📜', '✂️'];
		let opponent;
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`Rock, Paper, Scissors!`)
			.setDescription('Please, react with the emoji desired.');

		if (user.id === '725519211929272402') {
			opponent = rps[Math.floor(Math.random() * rps.length)];
			msg.channel.send(embed).then(async embedmsg => {
				const yourChoice = await promptNormalMessage(embedmsg, msg.author, 30, ['🗿', '📜', '✂️']);
				await checkWinner(msg, name, yourChoice, opponent, embed, embedmsg);
				await playAgain(msg);
			});
		}
	}

};
