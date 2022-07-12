const Command = require('../../Structures/Command');
// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			category: 'Owner',
			ownerOnly: true
		});
	}

	async run(message, [command]) {
		if (!command) {
			const noCMD = new MessageEmbed()
				.setColor('RED')
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription(`Please enter the command name for reload!`)
				.setTimestamp();
			return message.channel.send(noCMD);
		}

		const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

		if (cmd) {
			delete require.cache[require.resolve(`../${cmd.category}/${ucFirst(cmd.name)}.js`)];

			const File = require(`../${cmd.category}/${ucFirst(cmd.name)}.js`);
			// eslint-disable-next-line no-shadow
			const Command = new File(this.client, cmd.name.toLowerCase());

			this.client.commands.delete(cmd.name);
			await this.client.commands.set(cmd.name, Command);

			const restartedCMD = new MessageEmbed()
				.setColor('DARK-BLUE')
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription(`Command **${cmd.name}** has been restarted!`)
				.setTimestamp();
			return message.channel.send(restartedCMD);
		} else {
			const notFound = new MessageEmbed()
				.setColor('RED')
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription(`Could not find command named **${command}**!`)
				.setTimestamp();
			return message.channel.send(notFound);
		}

		function ucFirst(str) {
			if (!str) return str;
			return str[0].toUpperCase() + str.slice(1);
		}
	}

};
