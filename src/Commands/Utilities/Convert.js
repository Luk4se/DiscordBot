const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const {
	checkUsername,
	checkNaN
} = require('../../Structures/Functions');
const convert = require('convert-units');


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Convert from various units and gives you the result in your chosen unit.',
			category: 'Utilities',
			args: true,
			usage: '<value> <from(unit)> <to(unit)>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(msg, query) {
		if (query.length < 3) {
			return msg.channel.send(`I don't have enough information, please follow the example: 
        \`${this.usage}\``);
		}

		const name = checkUsername(msg);
		const value = parseInt(query.shift());
		const unitOG = query[0];
		const unitConverted = query[1];
		let converted;
		const embed = new MessageEmbed()
			.setColor('Random')
			.setAuthor(`Converting. . . || ${convert().describe(unitOG).singular} to ${convert().describe(unitConverted).singular}`)
			.setTimestamp()
			.setColor('RANDOM')
			.setFooter(`REQUEST BY ${name.toUpperCase()}`, msg.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}));


		if (!checkNaN(value)) {
			try {
				converted = await convert(value).from(unitOG).to(unitConverted);
			} catch (err) {
				console.log(err.name);
				embed.setDescription(err.message)
					.setAuthor(`ERROR!`)
					.setColor('RED');
				if (err.name === 'TypeError') {
					embed.setDescription(`You tried to convert an unsupported unit, please check ${this.client.prefix}howto convert, to know what units are supported.`);
				}
				return msg.channel.send(embed);
			}
			embed.setDescription(`**${value} ${convert().describe(unitOG).plural} is ${Math.round((converted + Number.EPSILON) * 100) / 100} ${convert().describe(unitConverted).plural}**`);
		} else {
			embed.setDescription(`**${value}** is not a number, so it can't be converted`);
		}
		msg.channel.send(embed);
	}

};
