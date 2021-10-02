const fs = require('fs')
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { channel } = require('diagnostics_channel');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Servers:")
  client.guilds.fetch().then(guilds=>{
    guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })
  })
});


/*client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});*/
client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	//console.log(interaction)
	if(interaction.isButton()){
		console.log(interaction)
		return;
	}
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	if(command.channels != undefined && !command.channels.includes(interaction.channel.name)){//if not in corresponding channel
		await interaction.reply({content:"Mauvais channel, uniquement utilisable dans les channels : ["+command.channels.join(", ")+"]",ephemeral:true})
		return;
	}
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token)