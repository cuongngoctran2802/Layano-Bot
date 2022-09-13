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
	name: "status", //the command name for the Slash Command
	description: "Hiển thị trạng thái hàng chờ", //the command description for Slash Command Overview
	cooldown: 10,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
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
						.setTitle(`${client.allEmojis.x} Tham gia phòng thoại __my__!`)
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
				var djs = client.settings.get(newQueue.id, `djroles`);
				if(!djs || !Array.isArray(djs)) djs = [];
				else djs = djs.map(r => `<@&${r}>`);
				if(djs.length == 0 ) djs = "`không thiết lập`";
				else djs.slice(0, 15).join(", ");
				let newTrack = newQueue.songs[0];
				let embed = new MessageEmbed().setColor(ee.color)
					.setDescription(`See the [Queue on the **DASHBOARD** Live!](http://dashboard.musicium.eu/queue/${newQueue.id})`)
					.addField(`💡 Được yêu cầu bởi:`, `>>> ${newTrack.user}`, true)
					.addField(`⏱ Thời lượng:`, `>>> \`${newQueue.formattedCurrentTime} / ${newTrack.formattedDuration}\``, true)
					.addField(`🌀 Hàng chờ:`, `>>> \`${newQueue.songs.length} bài nữa(s)\`\n\`${newQueue.formattedDuration}\``, true)
					.addField(`🔊 Âm lượng:`, `>>> \`${newQueue.volume} %\``, true)
					.addField(`♾ Lặp:`, `>>> ${newQueue.repeatMode ? newQueue.repeatMode === 2 ? `${client.allEmojis.check_mark} \`Chờ\`` : `${client.allEmojis.check_mark} \`Bài hát\`` : `${client.allEmojis.x}`}`, true)
					.addField(`↪️ Tự động phát:`, `>>> ${newQueue.autoplay ? `${client.allEmojis.check_mark}` : `${client.allEmojis.x}`}`, true)
					.addField(`❔ Tải bài hát:`, `>>> [\`Nhấn vào đây\`](${newTrack.streamURL})`, true)
					.addField(`❔ Filter${newQueue.filters.length > 0 ? "s": ""}:`, `>>> ${newQueue.filters && newQueue.filters.length > 0 ? `${newQueue.filters.map(f=>`\`${f}\``).join(`, `)}` : `${client.allEmojis.x}`}`, newQueue.filters.length > 1 ? false : true)
					.addField(`🎧 DJ-Role${djs.length > 1 ? "s": ""}:`, `>>> ${djs}`, djs.length > 1 ? false : true)
					.setAuthor(`${newTrack.name}`, `https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif`, newTrack.url)
					.setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
					.setFooter(`💯 ${newTrack.user.tag}`, newTrack.user.displayAvatarURL({
						dynamic: true
					}));
				interaction.reply({
					embeds: [embed]
				})
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
