const Command = require('../../Structures/Command');
const {
	split,
	checkUsername,
	errorReplies
} = require('../../Structures/Functions');
const {
	MessageEmbed
} = require('discord.js');
const {
	DiceRoll
} = require('rpg-dice-roller');

const {
	diceDescription
} = require('../../descriptions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['dice', 'r'],
			description: diceDescription(),
			category: 'Fun',
			usage: '<number of dice>d<number of sides> <modifier>',
			args: true
		});
	}


	async run(msg, dice) {
		const name = checkUsername(msg);
		let total = 0;
		const embed = new MessageEmbed()
			.setColor(msg.member.displayHexColor || 'RANDOM')
			.setTimestamp()
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, msg.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}));
		dice = split(msg.content, / +/g, 2);
		dice = dice.join('').toLowerCase().replace(/ /g, '').replace('f', 'F').replace('cF', 'cf').split(',');

		try {
			if (dice.length === 1) {
				const roll = new DiceRoll(dice[0]);

				let result = roll.output.split(': ');
				result.shift();
				result = result.toString();

				if (result.length > 500) {
					embed.setDescription(`${name} rolled a **(${dice})**: 
					
					(Character Limit Reached, showing only total):
				**${roll.total}**`);
				} else {
					embed.setDescription(`${name} rolled a **(${dice})**: 
				
				\`${result}\``);
				}
				return msg.channel.send(embed);
			}
			for (const element of dice) {
				const roll = new DiceRoll(element);

				let result = roll.output.split(': ');
				result.shift();
				result = result.toString();

				embed.setDescription(`**${name} rolled:** `);
				if (result.length > 500) {
					embed.addField(`${element} (Character Limit Reached, showing only total):`, roll.total);
				} else {
					embed.addField(`${element}: `, result);
				}

				result = result.split(' = ');
				result.shift();
				result = result.join();
				total += parseInt(result);
			}

			if (total > 0) {
				embed.addField('Total:', total);
			}
		} catch (err) {
			if (err.name === 'RangeError') {
				return msg.channel.send(`${errorReplies()} Number range is from 1 to 10000`);
			}
			if (err.name === 'SyntaxError') {
				return msg.channel.send(`${errorReplies()} Please check your roll following this example \`1d20 + 3\``);
			}
		}
		return msg.channel.send(embed);
	}

};
