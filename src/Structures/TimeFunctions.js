// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const convertUnit = require('convert-units');

module.exports = {
	timeUnit: function timeUnit(msg, unit) {
		const options = {
			// eslint-disable-next-line id-length
			s: 'seconds',
			sec: 'seconds',
			seconds: 'seconds',
			// eslint-disable-next-line id-length
			m: 'minutes',
			minutes: 'minutes',
			minute: 'minutes',
			min: 'minutes',
			mins: 'minutes',
			// eslint-disable-next-line id-length
			h: 'hours',
			hour: 'hours',
			hours: 'hours',
			hrs: 'hours',
			// eslint-disable-next-line id-length
			d: 'days',
			day: 'days',
			days: 'days',
			// eslint-disable-next-line id-length
			w: 'weeks',
			week: 'weeks',
			weeks: 'weeks',
			// eslint-disable-next-line id-length
			mo: 'months',
			mon: 'months',
			month: 'months',
			months: 'months',
			// eslint-disable-next-line id-length
			y: 'years',
			yr: 'years',
			yrs: 'years',
			year: 'years',
			years: 'years'
		};
		const time = options[unit];
		if (!time) {
			return msg.channel.send(`${unit} isn't a valid unit of time`);
		}
		return time;
	},

	convertTime: function convertTime(time, unit, convert) {
		if (unit === 'seconds') {
			unit = 's';
		} else if (unit === 'minutes') {
			unit = 'min';
		} else if (unit === 'hours') {
			unit = 'h';
		} else if (unit === 'days') {
			unit = 'd';
		}
		return convertUnit(time).from(unit).to(convert);
	}

};
