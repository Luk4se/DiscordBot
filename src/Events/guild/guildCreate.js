const Event = require('../../Structures/Event');
const { getDefaultChannel } = require('../../Structures/Functions');

module.exports = class extends Event {

	async run(guild) {
		// eslint-disable-next-line no-shadow
		const channel = getDefaultChannel(guild);

		channel.send('My name\'s 9S. I\'m here to provide support. It looks kinda fun here... um, sorry. ' +
		'If you use !help command, I will send you all the information you need to configure my work parameters. And umm... if want to call me Nines, it\'s totally okay!');
	}

};
