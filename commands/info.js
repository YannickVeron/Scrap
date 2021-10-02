const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
        execute(interaction) {
            if (interaction.options.getSubcommand() === "user") {
                interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
            } else if (interaction.options.getSubcommand() === "server") {
                interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
            } else {
                message.reply("invalid argument")
            }
        },
        channels:[]
    };