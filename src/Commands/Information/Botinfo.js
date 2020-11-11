const Command = require('../../Structures/Command');
const {
	MessageEmbed,
	version: djsversion
} = require('discord.js');
const {
	version
} = require('../../../package.json');
const {
	utc
} = require('moment');
const {
	checkUsername
} = require('../../Structures/Functions');
const os = require('os');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['bot', 'info'],
			description: 'Displays information about the bot',
			category: 'Information'
		});
	}

	run(message) {
		const core = os.cpus()[0];
		const owner = message.guild.members.cache.get('502462411106811914');
		const name = checkUsername(message);
		const embed = new MessageEmbed()
			.setAuthor(`${this.client.user.username} Info`, this.client.user.displayAvatarURL())
			.setThumbnail(this.client.user.displayAvatarURL())
			// eslint-disable-next-line max-len
			.setDescription(`Hello, my name is 9S, but my friends call me Nines. I mean, if you want to call me Nines, it's totally okay, I am the primary bot for the ${message.guild.name} server on Discord.`)
			.setColor(message.member.displayHexColor || 'RANDOM')
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setTimestamp()
			.addField('General', [
				`**• Client: ** ${this.client.user.tag}`,
				`**• Commands: ** ${this.client.commands.size}`,
				`**• Creator: ** ${owner.user.tag}`,
				`**• Creator ID: ** ${owner.id}`,
				`**• Servers: ** ${this.client.guilds.cache.size.toLocaleString()}`,
				`**• Users: ** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**• Channels: ** ${this.client.channels.cache.size.toLocaleString()}`,
				`**• Creation Date: ** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**•  Node.js:** ${process.version}`,
				`**• Version: ** v${version}`,
				`**•  Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**•  Platform:** ${process.platform}`,
				`**•  Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**•  CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**•  Memory:**`,
				`\u3000 Total: ${this.client.utils.formatBytes(process.memoryUsage().rss)}`,
				`\u3000 Used: ${this.client.utils.formatBytes(process.memoryUsage().heapUsed)}`
			]);

		return message.channel.send(embed);
	}

};
