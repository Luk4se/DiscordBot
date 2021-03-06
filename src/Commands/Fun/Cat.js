const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch');
const {
	checkUsername
} = require('../../Structures/Functions');

const subreddits = [
	'cat',
	'cats',
	'catpics',
	'kittens'
];

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['cate', 'cats', 'kitty', 'kitten'],
			description: 'CATS!',
			category: 'Fun'
		});
	}

	async run(message) {
		const name = checkUsername(message);
		const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
			.then(response => response.json())
			.then(body => body.data);
		const selected = data[Math.floor(Math.random() * data.length)];
		return message.channel.send(new MessageEmbed()
			.setColor(message.member.displayColor || 'RANDOM')
			.setAuthor('CATS!', message.guild.iconURL)
			.setTimestamp()
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`));
	}

};
