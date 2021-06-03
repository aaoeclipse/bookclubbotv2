const Discord = require('discord.js')
const fs = require('fs');
const { prefix, token } = require('./config.json');
const db = require('./db/db');
const greetings = require('./personality/greetings');
const personality = require('./personality/greetings')
const personalityGoodbye = require('./personality/goodbyes')

const client = new Discord.Client();
client.command = new Discord.Collection();

// Reading commands in commands folder
const commandFiles = fs.readdirSync('./states').filter(file => file.endsWith('.js'));

// Loads command in each file
for (const file of commandFiles) {
  const state = require(`./states/${file}`);
  client.command.set(state.name, state)
}


client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  db.initDb();
});


client.on('message', async (msg) => {
  // Return if the message was sent by bot
  if (msg.author.bot) return;

  // ==== Check if user exists ====
  const username = msg.author.username;

  let user = await db.getUser(username)
  if (!user) {
    console.info('new user!');
    user = await db.insertUser(username)
  }
  // console.info(user);

  // ==== Check State of user ====
  var state = user['dataValues']['state'];
  var step = user['dataValues']['step'];
  var canceling = false;

  console.info(`State of user ${username}: ${state}`)

  // if ready set command as state
  if (state === 'ready') {
    // if it doesn't have the ! it returns
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const inputState = args.shift().toLowerCase();

    if (inputState === 'help') {
      helpMessage(username, msg, client.command);
      return
    }

    // Get state from user input
    state = inputState;

  } else {

    // ===== CANCEL ======
    if (msg.content.startsWith(prefix)) {
      const args = msg.content.slice(prefix.length).trim().split(' ');
      const inputState = args.shift().toLowerCase();

      if (inputState === 'cancel') {
        canceling = true;
      }
    }
  }

  // ==== Run State command ====
  if (!client.command.has(state)) {
    msg.channel.send(`Command ${state} doesn't exists`)
    return;
  }

  try {
    // If the user is canceling
    if (canceling) {
      // cancel and the
      client.command.get(state).reset(username);
      return;
    }

    // running command
    client.command.get(state).step[step](msg.content, username, msg);

  } catch (error) {
    console.error(error);
    msg.channel.send('Error Executing command');
  }

}
);

const helpMessage = (username, client, commands) => {
  var helpMssg = `${personality()} ${username} here are all my commands!`;
  helpMssg += `\n\t====================`;
  for (command of commands) {
    helpMssg += `\n${command[1].howto} \t - ${command[1].description}`;
  }
  helpMssg += `\n\t====================`;
  helpMssg += `\n${personalityGoodbye()}`;
  client.channel.send(helpMssg);
};

client.login(token);
