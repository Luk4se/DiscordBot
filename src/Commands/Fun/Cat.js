const Command = require('../../Structures/Command');
const fetch = require('node-fetch');
const {
	memeEmbed
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
			description: 'Cats? Cats! The internet loves cats and so do I!',
			category: 'Fun'
		});
	}

	async run(message) {
		const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
			.then(response => response.json())
			.then(body => body.data);
		let selected;
		do {
			selected = data[Math.floor(Math.random() * data.length)];
		} while (selected.nsfw !== false);
		return memeEmbed(message, selected.title, `https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`, message.member.displayColor || 'RANDOM', selected.subreddit);
	}

};
