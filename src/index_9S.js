const NinesClient = require('./Structures/NinesClient');
const config = require('../config.json');

const client = new NinesClient(config);
client.start();