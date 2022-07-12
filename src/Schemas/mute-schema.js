const mongoose = require('mongoose');
const reqString = {
	type: String,
	required: true
};

// eslint-disable-next-line new-cap
const muteSchema = mongoose.Schema({
	userId: reqString,
	guildId: reqString,
	staffId: reqString,
	staffTag: reqString,
	expires: {
		type: Date,
		required: true
	},
	current: {
		type: Boolean,
		required: true
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('mutes', muteSchema);
