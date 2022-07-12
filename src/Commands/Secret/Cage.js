const Command = require('../../Structures/Command.js');
const fetch = require('node-fetch');
const {
	memeEmbed
} = require('../../Structures/Functions.js');


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['god'],
			description: 'The One True God. Mr. Nicholas Cage.',
			category: 'Secret'
		});
	}
	async run(message) {
		const data = await fetch(`https://imgur.com/r/onetruegod/hot.json`)
			.then(response => response.json())
			.then(body => body.data);
		let selected;
		do {
			selected = data[Math.floor(Math.random() * data.length)];
		} while (selected.nsfw !== false);

		return memeEmbed(message, selected.title, `https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`, message.member.displayColor || 'RANDOM',
			`https://www.reddit.com/${selected.reddit}`);
	}

};
