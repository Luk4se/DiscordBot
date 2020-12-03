const Event = require('../Structures/Event');
const mongo = require('../Structures/Mongodb');
const {
	type,
	status,
	checkMutes
} = require('../Structures/Functions');
const DisableCommands = require('../Schemas/disable-schema');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	async run() {
		console.log([
			`Logged in as  ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded  ${this.client.events.size} events!`
		].join('\n'));
		// eslint-disable-next-line no-unused-vars
		await mongo().then(mongoose => {
			console.log(`Connected to Mongo Database`);
		});
		checkMutes(this.client);
		// eslint-disable-next-line consistent-return
		this.client.guilds.cache.forEach(async (guild) => {
			const disableCommands = await DisableCommands.findOne({
				guildId: guild.id
			});

			if (!disableCommands) {
				// eslint-disable-next-line no-unused-vars
				const dbc = await DisableCommands.create({
					guildId: guild.id
				});
			} else {
				return undefined;
			}
		});
		setInterval(() => {
			const types = type();
			this.client.user.setActivity(`${status(types)} | mention me!`, {
				type: types
			});
		}, 3600000);
	}

};
