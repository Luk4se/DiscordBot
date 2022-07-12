const translate = require('@vitalets/google-translate-api');
const Command = require('../../Structures/Command');
const language = require('../../../node_modules/@vitalets/google-translate-api/languages');
const { MessageEmbed } = require('discord.js');
const { checkUsername } = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Translate your text to other languages',
			category: 'Utilities',
			usage: '<what to translate> [language to be translated to]',
			args: true
		});
	}
	async run(msg, translation) {
		const name = checkUsername(msg);
		let lang;

		for (let index = 0; index < translation.length; ++index) {
			let aux = translation[index];

			aux = language.getCode(aux.toString());

			if (aux) {
				lang = language.getLanguage(language.getCode(aux));
			} else {
				lang = language.getLanguage('en');
			}
		}
		let originLang, text;
		const word = translation.join(' ').toLowerCase().split(` ${lang.toLowerCase()}`).shift();


		await translate(`${word}`, {
			to: lang
		}).then(res => {
			originLang = language.getLanguage(res.from.language.iso);
			// eslint-disable-next-line prefer-destructuring
			text = res.text;
		}).catch(err => {
			console.error(err);
		});

		const emoji = this.client.emojis.cache.get('780496572730572870');
		const url = `https://translate.google.com/#view=home&op=translate&sl=auto&tl=${language.getCode(lang)}&text=${encodeURIComponent(word)}`;
		const color = msg.member.displayColor || 'RANDOM';

		const embed = new MessageEmbed()
			.setColor(color)
			.setAuthor(`Translation Request `, msg.guild.iconURL())
			.setTitle(`${emoji} **${originLang} ➜ ${lang}**`)
			.setURL(url)
			.setDescription(`**${this.client.utils.capitaliseFirstLetter(word)}** 
— translates to: 
**${this.client.utils.capitaliseFirstLetter(text)}** 
— in ${lang}`)
			.setTimestamp()
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, msg.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}));
		return msg.channel.send(embed);
	}

};
