const Event = require('../../Structures/Event');
const { getDefaultChannel, checkJoinMute } = require('../../Structures/Functions');

module.exports = class extends Event {

	async run(member) {
		// eslint-disable-next-line no-shadow
		const channel = getDefaultChannel(member.guild);
		checkJoinMute(member);

		channel.send(`Welcome to ${member.guild.name}! Please be informed of our community's rules and guidelines.`);
	}

};
