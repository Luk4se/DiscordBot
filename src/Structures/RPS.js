const {
	MessageEmbed
} = require('discord.js');
const {
	promptMessage,
	checkUsername,
	promptNormalMessage
} = require('./Functions');

module.exports = {

	playAgain: async function playAgain(msg, opponent) {
		const name = checkUsername(msg);
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`Rock, Paper, Scissors!`)
			.setDescription('Wanna play again?');

		if (!opponent) {
			const rps = ['🗿', '📜', '✂️'];
			const myChoice = rps[Math.floor(Math.random() * rps.length)];
			msg.channel.send(embed).then(async embedmsg => {
				const emoji = await promptMessage(embedmsg, msg.author, 30, ['773017276977905674', '773017277024829480']);
				if (emoji === '773017276977905674') {
					embedmsg.delete();
					embed.setDescription('Please, react with the emoji desired.');
					msg.channel.send(embed).then(async playagainembed => {
						const yourChoice = await promptNormalMessage(playagainembed, msg.author, 30, ['🗿', '📜', '✂️']);
						await module.exports.checkWinner(msg, name, yourChoice, myChoice, embed, playagainembed);
						await playAgain(msg);
					});
				} else if (emoji === '773017277024829480') {
					embedmsg.reactions.removeAll();
					embed.setDescription('Okay! I had fun! Let\'s play again some other time!');
					embedmsg.edit(embed);
				}
			});
		}
	},

	// eslint-disable-next-line consistent-return
	checkWinner: async function checkWinner(msg, name, yourChoice, opponentChoice, embed, embedmsg, opponent) {
		if (!opponent) {
			if (yourChoice === opponentChoice) {
				embed.setDescription(`${name} chose: ${yourChoice} and I chose: ${opponentChoice} \nIt was a tie!`);
				embedmsg.delete();
				return msg.channel.send(embed);
			}
			switch (yourChoice) {
				case '🗿': {
					if (opponentChoice === '📜') {
						embed.setDescription(`${name} chose: ${yourChoice} and I chose: ${opponentChoice} \nOh! Paper covers rock, looks like I've won!`);
						embedmsg.delete();
						return msg.channel.send(embed);
					} else if (opponentChoice === '✂️') {
						embed.setDescription(`${name} chose: ${yourChoice} and I chose: ${opponentChoice} \nDamn it! Rock breaks scissors, you won.`);
						embedmsg.delete();
						return msg.channel.send(embed);
					}
					break;
				}
				case '📜': {
					if (opponentChoice === '🗿') {
						embed.setDescription(`${name} chose: ${yourChoice} and I chose: ${opponentChoice} \nAh... Paper beats rock... In what world paper beats rock?! You won.`);
						embedmsg.delete();
						return msg.channel.send(embed);
					} else if (opponentChoice === '✂️') {
						embed.setDescription(`${name} chose: ${yourChoice} and I chose: ${opponentChoice} \nHA! Scissors cuts paper, I won!`);
						embedmsg.delete();
						return msg.channel.send(embed);
					}
					break;
				}
				case '✂️': {
					if (opponentChoice === '📜') {
						embed.setDescription(`${name} chose: ${yourChoice} and I chose: ${opponentChoice} \n...Scissors cuts paper, you won...`);
						embedmsg.delete();
						return msg.channel.send(embed);
					} else if (opponentChoice === '🗿') {
						embed.setDescription(`${name} chose: ${yourChoice} and I chose: ${opponentChoice} \nRock breaks scissors, looks like I won this round!`);
						embedmsg.delete();
						return msg.channel.send(embed);
					}
				}
			}
		}
	}

};
