const Command = require('../../Structures/Command');
const {
	// eslint-disable-next-line no-unused-vars
	MessageEmbed
} = require('discord.js');
const DisabledCommands = require('../../Schemas/disable-schema');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Disable commands using this command!',
			category: `Moderation`,
			userPerms: ['ADMINISTRATOR']
		});
	}

	async run(message, args) {
		const command = this.client.commands.get(args[0].toLowerCase());

		console.log(command.disable);

		if (command.disable === 'Not Allowed') {
			return message.reply('You can\'t disable this command.');
		}

		const disabledCommands = await DisabledCommands.findOne({
			guildId: message.guild.id
		});

		if (!disabledCommands) {
			const dbc = await DisabledCommands.create({
				guildId: message.guild.id
			});

			dbc.save();
		}

		const commandDB = await disabledCommands.get('commands');
		const check = await commandDB.find(cmd => cmd === command.name);

		if (check) {
			return message.reply('The command is already disabled');
		} else {
			commandDB.push(command.name);
			disabledCommands.save();
			message.reply(`The command ${command.name} has been disabled.`);
		}

		return console.log(disabledCommands);
	}

};
