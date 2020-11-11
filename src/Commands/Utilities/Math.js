const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const math = require('mathjs');
const {
	split,
	checkUsername,
	errorReplies
} = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Need help with math? Use this.',
			category: 'Utilities',
			args: true,
			usage: '<calculation>'
		});
	}
	async run(msg, ...calculation) {
		const name = checkUsername(msg);
		calculation = split(msg.content, / +/g, 2);
		calculation = calculation.toString().replace(/ /g, '').split(',');
		const embed = new MessageEmbed()
			.setColor(msg.member.displayHexColor || 'RANDOM')
			.setTimestamp()
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, msg.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}));
		try {
			if (calculation.length === 1) {
				embed.setDescription(`**Calculations for ${name}:**
         ${calculation} = **${math.evaluate(calculation)}**`);
			} else {
				for (const element of calculation) {
					embed.setDescription(`**Calculations for ${name}:**`)
						.addField(`${element} = `, math.evaluate(element));
				}
			}
		} catch (err) {
			if (err.name === 'Error') {
				return msg.channel.send(`${errorReplies()} Please check your equation following this example \`30/2*3+6-2\``);
			}
		}
		return msg.channel.send(embed);
	}

};
