let fs = require("fs");
let tmi = require("tmi.js");

let secret = fs.readFileSync('SECRET', 'utf-8').trim();

let client = new tmi.Client({
	//options: { debug: true },
	connection: {
		reconnect: false,
		secure: true
	},
	identity: {
		username: 'strager',
		password: `oauth:${secret}`,
	},
	//channels: [ 'strager' ]
});

client.connect();
client.on('message', (channel, tags, message, self) => {
    if(self) return;
    try {
        client.say(channel, `@${tags.username}, heya!`);
    } catch (error) {
        console.error(error.stack);
    }
});
