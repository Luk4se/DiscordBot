/* eslint-disable consistent-return */
const urban = require('urban');
const {
	MessageEmbed
} = require('discord.js');
const {
	stripIndents
} = require('common-tags');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['urb', 'urbandictionary', 'ud'],
			description: 'Search on Urban Dictionary',
			category: 'Utilities',
			usage: '[search]'
		});
	}

	async run(message, query) {
		const search = query[0] ? urban(query.join(' ')) : urban.random();
		try {
			search.first(res => {
				if (!res) return message.channel.send('No results found for this topic, sorry!');
				const {
					word,
					definition,
					example,
					thumbsUp,
					thumbsDown,
					permalink,
					author
				} = res;
				const embed = new MessageEmbed()
					.setColor('RANDOM')
					.setAuthor(`Urban Dictionary || ${word}`)
					.setDescription(stripIndents `**Definition:** ${definition || 'No definition found'}
                    **Example:** ${example || 'no example'}
                    **Upvote:** ${thumbsUp || 0}
                    **Downvote:** ${thumbsDown || 0}
                    **Link:** [ ${word}](${permalink || 'https://www.urbandictionary.com/'})`)
					.setTimestamp()
					.setFooter(`Written  by ${author || 'Unknown'}`);

				return message.channel.send(embed);
			});
		} catch (err) {
			console.log(err);
			return message.channel.send('Looks like I\'ve broken! Try again');
		}
	}

};
