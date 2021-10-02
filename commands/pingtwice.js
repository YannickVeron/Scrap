const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pingtwice')
		.setDescription('Replies twice with Pong!'),
	async execute(interaction) {
		await interaction.reply({content:'Pong!',ephemeral:true});
        await interaction.followUp({content:'Pong again!',ephemeral:true});
	},
    channels:[]
};
