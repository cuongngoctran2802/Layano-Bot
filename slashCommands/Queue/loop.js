const {
	MessageEmbed,
	Message
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const {
	check_if_dj
} = require("../../handlers/functions")
module.exports = {
	name: "loop", //the command name for the Slash Command
	description: "Bật/tắt chế độ vòng lặp", //the command description for Slash Command Overview
	cooldown: 5,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!
		//INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
		//{"Integer": { name: "volume", description: "What should be the Volume? It must be between 0 & 150", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
		//{"String": { name: "song", description: "Which Song do you want to play", required: true }}, //to use in the code: interacton.getString("title")
		//{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
		//{"Channel": { name: "in_where", description: "In What Channel should I send it?", required: false }}, //to use in the code: interacton.getChannel("what_channel")
		//{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
		{
			"StringChoices": {
				name: "what_loop",
				description: "Bạn muốn đặt Vòng lặp nào?",
				required: true,
				choices: [
					["Tắt", "0"],
					["Lặp bài hát", "1"],
					["Lặp vòng đợi", "2"]
				]
			}
		}, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
		//{"StringChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", "botping"], ["Discord Api", "api"]] }}, //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
	],
	run: async (client, interaction) => {
		try {
			//things u can directly access in an interaction!
			const {
				member,
				channelId,
				guildId,
				applicationId,
				commandName,
				deferred,
				replied,
				ephemeral,
				options,
				id,
				createdTimestamp
			} = interaction;
			const {
				guild
			} = member;
			const {
				channel
			} = member.voice;
			if (!channel) return interaction.reply({
				embeds: [
					new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **Hãy tham gia phòng thoại ${guild.me.voice.channel ? "my" : "a"} trước!**`)
				],
				ephemeral: true
			})
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return interaction.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} Tham gia phòng thoại __my__ !`)
						.setDescription(`<#${guild.me.voice.channel.id}>`)
					],
					ephemeral: true
				});
			}
			try {
				let newQueue = client.distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return interaction.reply({
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **Tôi không thể phát ngay bây giờ!**`)
					],
					ephemeral: true
				})
				if (check_if_dj(client, member, newQueue.songs[0])) {
					return interaction.reply({
						embeds: [new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x} **Bạn không có DJ role và không phải là Người yêu cầu bài hát!**`)
							.setDescription(`**DJ-ROLES:**\n> ${check_if_dj(client, member, newQueue.songs[0])}`)
						],
						ephemeral: true
					});
				}
				let loop = Number(options.getString("what_loop"))
				await newQueue.setRepeatMode(loop);
				if (newQueue.repeatMode == 0) {
					interaction.reply({
						embeds: [new MessageEmbed()
						  .setColor(ee.color)
						  .setTimestamp()
						  .setTitle(`${client.allEmojis.x} **Đã tắt chế độ vòng lặp!**`)
						  .setFooter(`💢 Thực hiện bởi: ${member.user.tag}`, member.user.displayAvatarURL({dynamic: true}))]
					})
				} else if (newQueue.repeatMode == 1) {
					interaction.reply({
						embeds: [new MessageEmbed()
						  .setColor(ee.color)
						  .setTimestamp()
						  .setTitle(`🔁 **Đã bật vàng lặp __bài hát__** ||(Đã tắt vòng lặp **bài hát**)||`)
						  .setFooter(`💢 Thực hiện bởi: ${member.user.tag}`, member.user.displayAvatarURL({dynamic: true}))]
						})
				} else {
					interaction.reply({
						embeds: [new MessageEmbed()
						  .setColor(ee.color)
						  .setTimestamp()
						  .setTitle(`🔂 **Đã bật vàng lặp __hàng đợi__!** ||(Đã tắt vòng lặp **hàng đợi**)||`)
						  .setFooter(`💢 Thực hiện bởi: ${member.user.tag}`, member.user.displayAvatarURL({dynamic: true}))]
						})
				}
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				interaction.editReply({
					content: `${client.allEmojis.x} | Lỗi: `,
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor)
						.setDescription(`\`\`\`${e}\`\`\``)
					],
					ephemeral: true
				})
			}
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}

