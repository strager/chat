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
  let tmi = require("tmi.js");

  let SECRET = getSecret();
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

function getSecret() {
  let fs = require("fs");
  let path = require("path");

  let secretFilePath = path.join(path.dirname(__filename), "SECRET");
  return fs.readFileSync(secretFilePath, "utf-8").trim();
}
