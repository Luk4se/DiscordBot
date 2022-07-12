const Event = require('../../Structures/Event');
const { getDefaultChannel, checkJoinMute } = require('../../Structures/Functions');

module.exports = class extends Event {

	async run(member) {
		const channel = getDefaultChannel(member.guild);
		checkJoinMute(member);

		channel.send(`Welcome to ${member.guild.name}, **${member.user.username}**! Please be informed of our community's rules and guidelines.`);
	}

};
