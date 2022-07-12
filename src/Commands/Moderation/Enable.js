const Command = require('../../Structures/Command');
const {
	// eslint-disable-next-line no-unused-vars
	MessageEmbed
} = require('discord.js');
const EnabledCommands = require('../../Schemas/disable-schema');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Enable commands using this command!',
			category: `Moderation`,
			userPerms: ['ADMINISTRATOR']
		});
	}

	async run(message, args) {
		const command = this.client.commands.get(args[0].toLowerCase());

		const enabledCommands = await EnabledCommands.findOne({
			guildId: message.guild.id
		});

		const commandDB = await enabledCommands.get('commands');
		const check = await commandDB.find(cmd => cmd === command.name);

		if (!check) {
			return message.reply('The command is not disabled');
		} else {
			commandDB.pull(command.name);
			enabledCommands.save();
			message.reply(`The command ${command.name} has been enabled.`);
		}

		return console.log(enabledCommands);
	}

};
