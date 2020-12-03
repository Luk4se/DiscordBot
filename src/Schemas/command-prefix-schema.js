const mongoose = require('mongoose');
const reqString = {
	type: String,
	required: true
};

// eslint-disable-next-line new-cap
const commandPrefixSchema = mongoose.Schema({
	guildId: reqString,
	prefix: reqString
});

module.exports = mongoose.model('guild-prefixes', commandPrefixSchema);
