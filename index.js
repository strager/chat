#!/usr/bin/env node

main();

function main() {
  let args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error("error: expected exactly one argument");
    console.error(`usage: ${process.argv[1]} MESSAGE_TO_SEND`);
    process.exit(1);
  }

  let messageToSend = args[0];
  sendMessage(messageToSend);
}

function sendMessage(messageToSend) {
  let fs = require("fs");
  let tmi = require("tmi.js");

  let SECRET = fs.readFileSync("SECRET", "utf-8").trim();
  let client = new tmi.Client({
    connection: {
      reconnect: false,
      secure: true
    },
    identity: {
      username: "strager",
      password: `oauth:${SECRET}`
    }
  });

  client.connect();
  client.on("connected", () => {
    client.say("#strager", messageToSend);
    client.disconnect();
  });
}
