const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js');
const {
	checkUsername
} = require('../../Structures/Functions');
const { diceAdvanced } = require('../../descriptions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['halp'],
			description: 'Displays all the commands in the bot',
			category: 'Utilities',
			usage: '[command]',
			guildOnly: true,
			ratelimit: {
				bucket: 1,
				reset: 7 * 1000
			}
		});
	}

	run(message, [command]) {
		const name = checkUsername(message);
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(`${message.guild.members.cache.get('725519211929272402').nickname || this.client.user.username} — Help Menu`, message.guild.iconURL({
				dynamic: true,
				size: 2048,
				format: 'png'
			}))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`REQUESTED BY ${name.toUpperCase()}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setTimestamp();

		if (command === 'dice-advanced') {
			const Sembed = new MessageEmbed()
				.setAuthor('Help Command!')
				.setColor('Random')
				.setDescription(`${message.author.username} check your DMs!`);
			message.channel.send(Sembed);
			return diceAdvanced(message);
		}

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			if (!cmd) return message.channel.send(embed.setTitle('Invalid Command.').setDescription(`Do \`${this.client.prefix}help\` for the list of the commands.`));

			embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} — Command Help`, this.client.user.displayAvatarURL());
			embed.setDescription([
				`**• Aliases: ** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
				`**• Description: ** ${cmd.description}`,
				`**• Category: ** ${cmd.category}`,
				`**• Usage: ** ${cmd.usage}`
			]);
			return message.channel.send(embed);
		} else {
			embed.setDescription([
				`These are the available commands for: ${message.guild.name}`,
				`The bot's prefix is: ${this.client.prefix}`,
				`Command Parameters: \`<>\` is strict and \`[]\` is optional`
			]);
			let categories;

			if (!message.member.hasPermission('KICK_MEMBERS')) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner' &&
				cmd.category !== 'Secret' && cmd.category !== 'Moderation').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner' && cmd.category !== 'Secret').map(cmd => cmd.category));
			}
			if (!this.client.utils.checkOwner(message.author.id)) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner' && cmd.category !== 'Secret').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			}

			for (const category of categories) {
				embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\` `).join(' '));
			}
			return message.channel.send(embed);
		}
	}

};
