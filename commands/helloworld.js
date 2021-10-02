const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('helloworld')
		.setDescription('Say hello world'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('hello')
					.setLabel('Hello')
					.setStyle('PRIMARY'),
			);

		await interaction.reply({ content: 'Hello World !', components: [row] });
	},
    channels:[]
};
