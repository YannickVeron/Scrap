const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dping')
		.setDescription('Replies with Gong! (*Pong)'),
	async execute(interaction) {
		await interaction.reply('Gong!');
        await wait(2000)
        await interaction.editReply('*Pong!')
	},
    channels:[]
};
