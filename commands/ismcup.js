const { SlashCommandBuilder } = require('@discordjs/builders');
const status = require('minecraft-server-status-improved');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ismcup')
		.setDescription('Check is server is up'),
	async execute(interaction) {
        await interaction.deferReply();
        status(process.env.MCIP, 25565, (err, response) => {
            if (err){
                interaction.editReply('Une erreur est survenue');
                console.log(err)
            }
            else{
                if(response.status=="success"){
                    interaction.editReply(":white_check_mark: "+response.motd+" en ligne. Joueurs : "+response.players.now+"/"+response.players.max)
                }else{
                    interaction.editReply(":x: Serveur hors ligne")
                }
            }
        })

	},
    channels:["minecraft"]
};
