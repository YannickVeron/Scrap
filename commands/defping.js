const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('defping')
		.setDescription('Replies slowly with Pong!'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		await wait(4000);
		await interaction.editReply('Pong!');
	},
    channels:[]
};
