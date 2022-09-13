const {
    MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
let cpuStat = require("cpu-stat");
let os = require("os");
module.exports = {

    name: "botinfo", //the command name for execution & for helpcmd [OPTIONAL]
    cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
    description: "Hiện thông tin bot", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, interaction) => {
        try {

            cpuStat.usagePercent(function (e, percent, seconds) {
                try {
                    if (e) return console.log(String(e.stack).red);

                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

                    const botinfo = new MessageEmbed()
                        .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setTitle("__**Thống kê:**__")
                        .setColor(ee.color)
                        .addField("⏳ Dung lượng đã dùng", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                        .addField("⌚️ Uptime ", `${duration(client.uptime).map(i=>`\`${i}\``).join(", ")}`, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Người dùng", `\`Tổng: ${client.users.cache.size} người dùng\``, true)
                        .addField("📁 Máy chủ", `\`Tổng: ${client.guilds.cache.size} Máy chủ\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\``, true)
                        .addField("🔊 Đang kết nối", `\`${connectedchannelsamount} đã Kết nối\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("👾 Discord.js", `\`v${Discord.version}\``, true)
                        .addField("🤖 Node", `\`${process.version}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                        .addField("🤖 CPU đã dùng", `\`${percent.toFixed(2)}%\``, true)
                        .addField("🤖 Arch", `\`${os.arch()}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("💻 Nền tảng", `\`\`${os.platform()}\`\``, true)
                        .addField("Độ trễ API", `\`${client.ws.ping}ms\``, true)
                        .setFooter("Được code bởi: Layano#1533", "https://cdn.discordapp.com/avatars/732164170954309723/fb3e4fef42345fb652805490a4e47f84.png?size=1024");
                    interaction.reply({
                        embeds: [botinfo]
                    });

                } catch (e) {
                    console.log(e)
                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                    const botinfo = new MessageEmbed()
                        .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setTitle("__**Stats:**__")
                        .setColor(ee.color)
                        .addField("⏳ Dung lượng đã dùng", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                        .addField("⌚️ Uptime ", `${duration(client.uptime).map(i=>`\`${i}\``).join(", ")}`, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Người dùng", `\`Tổng: ${client.users.cache.size} Người dùng\``, true)
                        .addField("📁 Máy chủ", `\`Tổng: ${client.guilds.cache.size} Máy chủ\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\``, true)
                        .addField("🔊 Đang kết nối", `\`${connectedchannelsamount} đã kết nối\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("👾 Discord.js", `\`v${Discord.version}\``, true)
                        .addField("🤖 Node", `\`${process.version}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                        .addField("🤖 CPU đã dùng", `\`${percent.toFixed(2)}%\``, true)
                        .addField("🤖 Arch", `\`${os.arch()}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("💻 Nền tảng", `\`\`${os.platform()}\`\``, true)
                        .addField("Độ trễ API", `\`${client.ws.ping}ms\``, true)
                        .setFooter("Coded by: Layano#1533", "https://cdn.discordapp.com/avatars/732164170954309723/fb3e4fef42345fb652805490a4e47f84.png?size=1024");
                        interaction.reply({
                        embeds: [botinfo]
                    });
                }
            })

            function duration(duration, useMilli = false) {
                let remain = duration;
                let days = Math.floor(remain / (1000 * 60 * 60 * 24));
                remain = remain % (1000 * 60 * 60 * 24);
                let hours = Math.floor(remain / (1000 * 60 * 60));
                remain = remain % (1000 * 60 * 60);
                let minutes = Math.floor(remain / (1000 * 60));
                remain = remain % (1000 * 60);
                let seconds = Math.floor(remain / (1000));
                remain = remain % (1000);
                let milliseconds = remain;
                let time = {
                    days,
                    hours,
                    minutes,
                    seconds,
                    milliseconds
                };
                let parts = []
                if (time.days) {
                    let ret = time.days + ' Day'
                    if (time.days !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (time.hours) {
                    let ret = time.hours + ' Hr'
                    if (time.hours !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (time.minutes) {
                    let ret = time.minutes + ' Min'
                    if (time.minutes !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)

                }
                if (time.seconds) {
                    let ret = time.seconds + ' Sec'
                    if (time.seconds !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (useMilli && time.milliseconds) {
                    let ret = time.milliseconds + ' ms'
                    parts.push(ret)
                }
                if (parts.length === 0) {
                    return ['instantly']
                } else {
                    return parts
                }
            }
            return;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}
