const Event = require('../../Structures/Event');
const { getDefaultChannel } = require('../../Structures/Functions');

module.exports = class extends Event {

	async run(member) {
		const channel = getDefaultChannel(member.guild);

		channel.send(`I guess this is where we part ways, **${member.user.username}#${member.user.discriminator}**.`);
	}

};
