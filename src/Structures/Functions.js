// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
// eslint-disable-next-line no-unused-vars
const ms = require('ms');
// eslint-disable-next-line no-unused-vars
const Long = require('long');
const muteSchema = require('../Schemas/mute-schema');
const {
	prefix
} = require('../../config.json');

module.exports = {

	getMember: async function getMember(msg, toFind) {
		let fetchmember;
		await msg.guild.members.fetch({
			user: toFind,
			force: true
		}).then(async member => {
			fetchmember = member;
		});
		if (!fetchmember) {
			return msg.reply('No user has been found, please check if you mentioned someone correctly, or used their correct ID.');
		}
		return fetchmember;
	},

	promptNormalMessage: async function promptNormalMessage(message, author, time, validReactions) {
		time *= 1000;

		for (const reaction of validReactions) await message.react(reaction);

		const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

		return message
			.awaitReactions(filter, {
				max: 1,
				time: time
			})
			.then(collected => collected.first() && collected.first().emoji.name);
	},

	promptMessage: async function promptMessage(message, author, time, validReactions) {
		time *= 1000;


		for (const reaction of validReactions) await message.react(reaction);

		const filter = (reaction, user) => validReactions.includes(reaction.emoji.id) && user.id === author.id;

		return message
			.awaitReactions(filter, {
				max: 1,
				time: time
			})
			.then(collected => collected.first() && collected.first().emoji.id);
	},

	split: function split(str, separator, limit) {
		const arr = str.split(separator);
		const result = arr.splice(0, limit);
		const remainder = arr.join(' ');
		result[result.length - 1] += ` ${remainder}`;
		result.shift();
		return result;
	},

	checkUsername: function checkUsername(msg) {
		if (msg.guild && msg.member.nickname) {
			return msg.member.nickname;
		}
		return msg.author.username;
	},

	errorReplies: function errorReplies() {
		const replies = ['Error executing order.',
			'ERROR 404!',
			'I do not comprehend.',
			'I... tried, but I don\'t understand.',
			'What do you mean by that? Because I do not know.',
			'Read it very carefully please: I have no idea what you are talking about.',
			'Why are you doing this to me? I have no idea!'
		];
		const reply = replies[Math.floor(Math.random() * replies.length)];
		return reply;
	},
	errorReply: function errorReply() {
		const replies = ['I will need to consult with command on this one.',
			'This command means nothing to me.',
			'I tried. I tried and tried and tried again. I REALLY TRIED, but this doesn\'t make any sense to me!',
			`Maybe you need ${prefix}help?`,
			'Failed to understand. Try again later.',
			'Why are you doing this to me? I have no idea!',
			'What do you mean by that?'
		];
		const reply = replies[Math.floor(Math.random() * replies.length)];
		return reply;
	},

	checkUser: function checkUser(msg) {
		if (msg.member.hasPermission('KICK_MEMBERS')) {
			return 'mod';
		} else if (msg.member.hasPermission('ADMINISTRATOR')) {
			return 'admin';
		} else {
			return 'common';
		}
	},

	checkNaN: function checkNaN(str) {
		return Number.isNaN(str);
	},

	getDefaultChannel: function getDefaultChannel(guild) {
		let generalChannel;
		const textChannel = guild.channels.cache.find(channel => channel.name === 'general' && channel.type === 'text');
		if (guild.channels.cache.has(guild.id)) {
			generalChannel = guild.channels.cache.get(guild.id);
		}
		if (textChannel) {
			return textChannel;
		} else {
			generalChannel = guild.channels.cache
				.filter(channel => channel.type === 'text' &&
					channel.permissionsFor(guild.client.user).has('SEND_MESSAGES'))
				.find(channel => channel.rawPosition === 0);
		}
		console.log(generalChannel);
		return generalChannel;
	},

	type: function type() {
		const types = ['WATCHING',
			'LISTENING',
			'STREAMING',
			'PLAYING'
		];
		const typeStatus = types[Math.floor(Math.random() * types.length)];
		return typeStatus;
	},

	status: function status(type) {
		let activities;
		if (type === 'WATCHING') {
			activities = ['out for enemy activity',
				'clouds',
				'you closely'
			];
		} else if (type === 'LISTENING') {
			activities = ['your commands',
				'birds',
				'beeps and boops',
				'8-bit music'
			];
		} else if (type === 'STREAMING') {
			activities = ['your consciousness'];
		} else if (type === 'PLAYING') {
			activities = ['with robots',
				'hacking minigame'
			];
		}
		const statuses = activities[Math.floor(Math.random() * activities.length)];
		return statuses;
	},

	checkJoinMute: async function checkJoinMute(member) {
		const currentMute = await muteSchema.findOne({
			userId: member.id,
			guildId: member.guild.id,
			current: true
		});
		if (currentMute) {
			// eslint-disable-next-line no-shadow
			const role = member.guild.roles.cache.find(role => role.name === 'Muted');
			if (role) {
				member.roles.add(role);
			}
		}
	},

	checkMutes: async function checkMutes(client) {
		const now = new Date();

		const conditional = {
			expires: {
				$lt: now
			},
			current: true
		};

		const results = await muteSchema.find(conditional);

		if (results && results.length) {
			for (const result of results) {
				const {
					guildId,
					userId
				} = result;

				const guild = client.guilds.cache.get(guildId);
				const member = (await guild.members.fetch()).get(userId);

				const mutedRole = guild.roles.cache.find(role => role.name === 'Muted');

				member.roles.remove(mutedRole);
			}
			await muteSchema.updateMany(conditional, {
				current: false
			});
		}
		setTimeout(checkMutes, 100 * 60 * 10);
	},

	// eslint-disable-next-line consistent-return
	clearHundredMessages: async function clearHundredMessages(msg, quantity) {
		let messagesDeleted = 0;
		const aux = quantity;
		do {
			console.log('deleting 100  messages');
			await msg.channel.bulkDelete(100, true).then(messages => {
				messagesDeleted += messages.size;
			});

			quantity -= 100;
			Math.abs(quantity);

			if (quantity > 0 && quantity <= 100) {
				await msg.channel.bulkDelete(quantity, true).then(messages => {
					messagesDeleted += messages.size;
				});

				quantity -= quantity;
			} else if (quantity >= 200) {
				await msg.channel.bulkDelete(quantity, true).then(messages => {
					messagesDeleted += messages.size;
				});
				quantity -= 100;
			}
		} while (quantity > 0);

		// eslint-disable-next-line no-extra-parens
		msg.author.send(`I deleted ${(messagesDeleted - 1)} message(s) from all users in channel <#${msg.channel.id}> in server **${msg.guild.name}** `);
		if (messagesDeleted !== aux) {
			return msg.author.send(`Sorry, but there were ${aux - (messagesDeleted - 2)} out of ${aux - 1} messages are over 14 days old, and I couldn't delete them.`);
		}
	},

	embedImg: async function embedImg(msg, author, title, img, color, message, user) {
		// eslint-disable-next-line new-cap
		const embed = new Discord.MessageEmbed()
			.setTitle(`${author} ${title} ${user}`)
			.setDescription(`${message || ''}`)
			.setURL(img)
			.setColor(color)
			.setFooter('If image fails to load, you can click on the title.')
			.setImage(img);
		return msg.channel.send(embed);
	},
	memeEmbed: async function memeEmbed(msg, title, img, color, subreddit) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`${title}`)
			.setURL(subreddit)
			.setColor(color)
			.setFooter('If image fails to load, you can click on the title.')
			.setImage(img);
		return msg.channel.send(embed);
	}
};
