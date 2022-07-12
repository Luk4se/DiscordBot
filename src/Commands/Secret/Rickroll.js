const Command = require('../../Structures/Command.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Oh wow, falling for this again? Either way, enjoy the song.',
			category: 'Secret'
		});
	}
	async run(message) {
		let video = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
		const index = Math.floor(Math.random() * 100);

		if (index === 100) {
			video = 'https://www.youtube.com/watch?v=GHMjD0Lp5DY';
		} else if (index === 1) {
			video = 'https://www.youtube.com/watch?v=y1WlYO2U3k8';
		}

		message.channel.send(video);
	}

};
