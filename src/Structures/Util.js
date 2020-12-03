const path = require('path');
const {
	promisify
} = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command.js');
const Event = require('./Event.js');
const mongo = require('./Mongodb.js');
const commandPrefixSchema = require('../Schemas/command-prefix-schema');
// eslint-disable-next-line no-inline-comments

module.exports = class Util {

	constructor(client) {
		this.client = client;
	}

	isClass(input) {
		return typeof input === 'function' &&
			typeof input.prototype === 'object' &&
			input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	trimArray(arr, maxLen = 9) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	}

	capitalise(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
	}

	capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	checkPremium(target) {
		const supportGuild = this.client.guilds.cache.get('773876058961084427');
		const member = supportGuild.members.cache.get(target.id);
		const hasPremium = member.roles.cache.some(role => role.id === '776151168937361419');
		return hasPremium;
	}
	checkSupporter(target) {
		const supportGuild = this.client.guilds.cache.get('773876058961084427');
		const member = supportGuild.members.cache.get(target.id);
		const hasSupporter = member.roles.cache.some(role => role.id === '776151168937361419') || member.roles.cache.some(role => role.id === '776151136762724402');
		return hasSupporter;
	}
	checkBacker(target) {
		const supportGuild = this.client.guilds.cache.get('773876058961084427');
		const member = supportGuild.members.cache.get(target.id);
		const hasBacker = member.roles.cache.some(role => role.id === '776151168937361419') || member.roles.cache.some(role => role.id === '776151136762724402') ||
		member.roles.cache.some(role => role.id === '776150912719912972');
		return hasBacker;
	}

	checkOwner(target) {
		return this.client.owners.includes(target);
	}

	comparePerms(member, target) {
		return member.roles.highest.position < target.roles.highest.position;
	}

	formatPerms(perm) {
		return perm
			.toLowerCase()
			.replace(/(^|"|_)(\S)/g, (str) => str.toUpperCase())
			.replace(/_/g, ' ')
			.replace(/Guild/g, 'Server')
			.replace(/Use Vad/g, 'Use Voice Activity');
	}

	formatArray(array, type = 'conjunction') {
		return new Intl.ListFormat('en-GB', {
			style: 'short',
			type: type
		}).format(array);
	}

	async loadCommands() {
		return glob(`${this.directory}commands/**/*.js`).then(commands => {
			for (const commandFile of commands) {
				delete require.cache[commandFile];
				const {
					name
				} = path.parse(commandFile);
				const File = require(commandFile);
				if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
				const command = new File(this.client, name.toLowerCase());
				if (!(command instanceof Command)) throw new TypeError(`Command ${name} doesn't belong in Commands.`);
				this.client.commands.set(command.name, command);
				if (command.aliases.length) {
					for (const alias of command.aliases) {
						this.client.aliases.set(alias, command.name);
					}
				}
			}
		});
	}

	async loadEvents() {
		return glob(`${this.directory}events/**/*.js`).then(events => {
			for (const eventFile of events) {
				delete require.cache[eventFile];
				const {
					name
				} = path.parse(eventFile);
				const File = require(eventFile);
				if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
				const event = new File(this.client, name);
				if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in Events`);
				this.client.events.set(event.name, event);
				event.emitter[event.type](name, (...args) => event.run(...args));
			}
		});
	}

	arrayRemove(arr, value) {
		return arr.filter((ele) => ele !== `<@!${value.id}>`);
	}

	async loadPrefixes(msg) {
		let guildPrefix;

		await mongo().then(async () => {
			const result = await commandPrefixSchema.findOne({
				guildId: msg.guild.id
			});
			if (result) {
				guildPrefix = result.prefix;
			} else {
				guildPrefix = this.client.prefix;
			}
		});
		return guildPrefix;
	}

};
