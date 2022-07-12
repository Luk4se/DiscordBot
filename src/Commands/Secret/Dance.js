const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'I\'ve got the moves like Jagger?',
			category: 'Secret'
		});
	}
	async run(msg) {
		const video = ['https://www.youtube.com/watch?v=VgEUiF0iKgs',
			'https://www.youtube.com/watch?v=NtXjdYfvwGI'
		];
		msg.channel.send(`${video[Math.floor(Math.random() * video.length)]}`);
	}


};
