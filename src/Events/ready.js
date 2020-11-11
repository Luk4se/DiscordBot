const Event = require('../Structures/Event');
const mongo = require('../Structures/Mongodb');
const {
	type,
	status,
	checkMutes
} = require('../Structures/Functions');

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
		}
		);
		checkMutes(this.client);
		setInterval(() => {
			const types = type();
			this.client.user.setActivity(`${status(types)} | ${this.client.prefix}help `, {
				type: types
			});
		}, 3600000);
	}

};
