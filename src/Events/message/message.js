/* eslint-disable max-depth */
/* eslint-disable complexity */
/* eslint-disable consistent-return */


const Event = require('../../Structures/Event');
const ms = require('ms');
const DisabledCommands = require('../../Schemas/disable-schema');
module.exports = class extends Event {

	constructor(...args) {
		super(...args);

		this.buckets = new Map();
	}

	async run(message) {
		const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
		const prefix = await this.client.utils.loadPrefixes(message);
		// eslint-disable-next-line func-names
		exports.getPrefix = function getPrefix() {
			return prefix;
		};
		this.client.prefix = prefix;
		if (message.author.bot) return;

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${prefix}\`.`);

		if (!message.content.startsWith(prefix)) return;

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		const disableCommands = await DisabledCommands.findOne({
			guildId: message.guild.id
		});

		if (disableCommands) {
			const commandDB = await disableCommands.get('commands');
			const check = await commandDB.find(coms => coms === command.name);

			if (check) {
				return message.reply('This command has been disabled');
			}
		}

		if (!this.client.owners.includes(message.author.id)) {
			let remaining = await this._runLimits(message, command);
			if (remaining) {
				remaining = ms(remaining - Date.now(), {
					long: true
				});
				message.channel.send(`Sorry **${message.author}**, you have to wait **${remaining}** before running this command.`);
				return;
			}
		}


		if (command) {
			if (command.patreon !== 'Everyone' && !this.client.utils.checkOwner(message.author.id)) {
				if (command.patreon === 'Premium' && !this.client.utils.checkPremium(message.author)) {
					return message.reply(`Sorry, this command is only available for the Premium tier of my Patreon use ${this.client.prefix}patreon to see how to support me.`);
				} else if (command.patreon === 'Supporter' && !this.client.utils.checkSupporter(message.author)) {
					return message.reply(`Sorry, this command is only available for the Supporter or higher tier of my Patreon use ${this.client.prefix}patreon to see how to support me.`);
				} else if (command.patreon === 'Donator' && !this.client.utils.checkBacker(message.author)) {
					return message.reply(`Sorry, this command is only available for the Backer or higher tier of my Patreon use ${this.client.prefix}patreon to see how to support me.`);
				}
				if (command.disable === 'true') {
					return message.reply('The command has been disabled.');
				}
			}
			if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
				return message.reply('Sorry, this command can only be used by the bot owners.');
			}

			if (command.guildOnly && !message.guild) {
				return message.reply('Sorry, this command can only be used in a discord server.');
			}

			if (command.nsfw && !message.channel.nsfw) {
				return message.reply('Sorry, this command can only be ran in a NSFW marked channel.');
			}

			if (command.args && !args.length) {
				return message.reply(`Sorry, this command requires arguments to function. Usage: ${command.usage ?
					`\`${command.usage}\`` : 'This command doesn\'t have a usage format'}`);
			}

			if (message.guild) {
				const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
				if (userPermCheck) {
					const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
					if (missing.length) {
						return message.reply(`You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, you need them to use this command!`);
					}
				}

				const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms;
				if (botPermCheck) {
					const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck);
					if (missing.length) {
						return message.reply(`I am missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, I need them to run this command!`);
					}
				}
			}
			command.run(message, args);
		}
	}
	_timeout(userId, commandName) {
		return () => {
			const bucket = this.buckets.get(`${userId}-${commandName}`);
			if (bucket && bucket.timeout) {
				this.client.clearTimeout(bucket.timeout);
			}

			this.buckets.delete(`${userId}-${commandName}`);
		};
	}

	_runLimits(message, command) {
		const tout = this._timeout(message.author.id, command.name);

		let bucket = this.buckets.get(`${message.author.id}-${command.name}`);
		if (!bucket) {
			bucket = {
				reset: command.ratelimit.reset,
				remaining: command.ratelimit.bucket,
				timeout: this.client.setTimeout(tout, command.ratelimit.reset)
			};

			this.buckets.set(`${message.author.id}-${command.name}`, bucket);
		}

		if (bucket.remaining === 0) {
			if (command.ratelimit.stack) {
				if (bucket.limited) {
					if (bucket.timeout) {
						this.client.clearTimeout(bucket.timeout);
					}

					bucket.reset = (bucket.resetsIn - Date.now()) + command.ratelimit.reset;
					bucket.timeout = this.client.setTimeout(tout, bucket.reset);
					bucket.resetsIn = Date.now() + bucket.reset;
				}

				bucket.limited = true;
			}

			if (!bucket.resetsIn) {
				bucket.resetsIn = Date.now() + bucket.reset;
			}

			return bucket.resetsIn;
		}

		--bucket.remaining;
		return null;
	}

};
