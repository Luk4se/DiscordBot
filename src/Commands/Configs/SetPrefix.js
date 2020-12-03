const Command = require('../../Structures/Command');
const mongo = require('../../Structures/Mongodb');
const commandPrefixSchema = require('../../Schemas/command-prefix-schema');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Set prefix for your server',
			category: 'Config',
			args: true,
			usage: '<new prefix>',
			guildOnly: true,
			userPerms: ['MANAGE_GUILD']
		});
	}
	async run(msg, [prefix]) {
		await mongo().then(async mongoose => {
			try {
				const guildId = msg.guild.id;
				await commandPrefixSchema.findOneAndUpdate({
					guildId: guildId
				}, {
					guildId: guildId,
					prefix: prefix
				}, {
					upsert: true
				});

				msg.reply(`The prefix for this bot is now \`${prefix}\``);
			} finally {
				mongoose.connection.close();
			}
		});
	}

};
