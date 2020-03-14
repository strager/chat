let fs = require("fs");
let tmi = require("tmi.js");

let SECRET = fs.readFileSync('SECRET', 'utf-8').trim();

let client = new tmi.Client({
	connection: {
		reconnect: false,
		secure: true
	},
	identity: {
		username: 'strager',
		password: `oauth:${SECRET}`,
	},
});

client.connect();
client.on('connected', () => {
    client.say('#strager', 'hello world');
    client.disconnect();
})
