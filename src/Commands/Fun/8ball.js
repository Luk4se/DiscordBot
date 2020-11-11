const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Ask The Magic 8 Ball!',
			category: 'Fun',
			args: true,
			usage: '<question>'
		});
	}
	async run(msg, ...question) {
		return msg.reply(question.join(' ').endsWith('?') ?
			`🎱 ${require('8ball')()}` :
			'🎱 That doesn\'t seem to be a question, please try again!');
	}

};
