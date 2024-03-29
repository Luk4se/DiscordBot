const Command = require('../../Structures/Command');
const YouTube = require('youtube-node');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Search on YouTube',
			aliases: ['yt'],
			category: 'Utilities',
			args: true,
			usage: '<search>'
		});
	}
	async run(msg, ...question) {
		const youTube = new YouTube();

		youTube.setKey('AIzaSyCyVXRMD7D9mJx7J5qSI29kW5HxZ4qL5f8');
		youTube.addParam('regionCode', 'US');
		youTube.addParam('relevanceLanguage', 'en');
		youTube.addParam('order', 'viewCount');


		youTube.search(question.join(' '), 2, (error, result) => {
			if (error) {
				msg.channel.send('I couldn\'t find the video');
			} else {
				msg.channel.send(`https://www.youtube.com/watch?v=${result.items[0].id.videoId}`);
			}
		});
		return 0;
	}

};
