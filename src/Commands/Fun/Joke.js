const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch');
const {
	checkUsername
} = require('../../Structures/Functions');
const oneLinerJoke = require('one-liner-joke');
const yoMamma = require('yo-mamma').default;

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Give a random joke!',
			category: 'Fun'
		});
	}

	async run(msg) {
		const name = checkUsername(msg);
		const jokes = new Array(5);
		const index = Math.floor(Math.random() * jokes.length);
		const embed = new MessageEmbed()
			.setColor(msg.member.displayColor || 'RANDOM')
			.setTimestamp()
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, msg.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}));

		await fetch(`http://api.icndb.com/jokes/random/?escape=javascript`).then(res => res.json()).then(joke => {
			jokes[0] = joke.value.joke;
		});

		await fetch(`https://official-joke-api.appspot.com/random_joke`).then(res => res.json()).then(joke => {
			jokes[1] = `${joke.setup}\n${joke.punchline}.`;
		});

		jokes[2] = oneLinerJoke.getRandomJoke({
			// eslint-disable-next-line quote-props
			'exclude_tags': ['racist', 'dirty', 'sex']
		});
		jokes[2] = jokes[2].body;
		jokes[3] = yoMamma();
		await fetch(` http://getpuns.herokuapp.com/api/random`).then(res => res.json()).then(joke => {
			jokes[4] = joke.Pun;
		});


		switch (index) {
			case 0:
				embed.setTitle(`Chuck Norris!`);
				embed.setDescription(jokes[index]);
				break;
			case 1:
				embed.setTitle(`Random Joke!`);
				embed.setDescription(jokes[index]);
				break;
			case 2:
				embed.setTitle(`One Liner!`);
				embed.setDescription(jokes[index]);
				break;
			case 3:
				embed.setTitle(`Yo Mamma!`);
				embed.setDescription(jokes[index]);
				break;
			case 4:
				embed.setTitle(`Puns!`);
				embed.setDescription(jokes[index]);
				break;
		}
		msg.channel.send(embed);
	}

};
