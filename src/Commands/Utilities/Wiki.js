const wiki = require('wikijs').default;
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['w', 'wikia', 'wikipedia'],
			description: 'Search Wikipedia',
			category: 'Utilities',
			usage: '<search>'
		});
	}

	async run(message, article) {
		const search = article.join(' ').toLowerCase();
		return wiki().page(search).then(page => page.url()).then(result => {
			message.channel.send(result);
		}).catch(err => {
			message.channel.send('Article not found');
			console.log(err);
		});
	}

};
