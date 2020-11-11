const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const {
	checkUsername
} = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Create a poll with multiple choices!',
			category: 'Fun',
			args: true,
			usage: '<question>, <choices separated by comma>'
		});
	}

	async run(msg, poll) {
		const name = checkUsername(msg);
		const pollDescription = poll.join(' ').split(/[?,!.,:]+/).shift();
		const choices = poll.join(' ').split(/[?,!.]+/);
		choices.shift();

		if (choices.length > 10) {
			return msg.reply('You can only have 10 options');
		}
		let str = ' ';
		let emojis = [
			`${this.client.emojis.cache.get('773020211728875551')}`,
			`${this.client.emojis.cache.get('773020211778551817')}`,
			`${this.client.emojis.cache.get('773020210964725770')}`,
			`${this.client.emojis.cache.get('773020212315553823')}`,
			`${this.client.emojis.cache.get('773020210877300736')}`,
			`${this.client.emojis.cache.get('773020211384942602')}`,
			`${this.client.emojis.cache.get('773020211849854976')}`,
			`${this.client.emojis.cache.get('773020210407800843')}`,
			`${this.client.emojis.cache.get('773020212030734376')}`,
			`${this.client.emojis.cache.get('773020212693696512')}`
		];
		let i = 0;
		for (const choice of choices) {
			str = `${str}${emojis[i]} ${choice} \n`;
			i++;
		}
		const embed = new MessageEmbed()
			.setTitle(`**New Poll!**`)
			.setDescription(`${pollDescription}? \n\n ${str}`)
			.setColor('RANDOM')
			.setFooter(`POLL BY ${name.toUpperCase()}`, msg.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setTimestamp();

		const embedmsg = await	msg.channel.send(embed);

		// eslint-disable-next-line no-shadow
		for (let i = 0; i < choices.length; i++) {
			emojis = [
				'773020211728875551',
				'773020211778551817',
				'773020210964725770',
				'773020212315553823',
				'773020210877300736',
				'773020211384942602',
				'773020211849854976',
				'773020210407800843',
				'773020212030734376',
				'773020212693696512'
			];
			embedmsg.react(emojis[i]);
		}
		return 0;
	}

};
