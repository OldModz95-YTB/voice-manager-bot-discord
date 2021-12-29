//IMPORT FILE DATA
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const {
  databasing,
  escapeRegex
} = require("../../modules/functions");
//import the Discord Library
const Discord = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");
// HERE THE EVENT STARTS
module.exports = (client, message) => {

  //if message from a bot, or not in a guild return error
  if (!message.guild || message.guild.available === false || !message.channel || message.webhookId) return;
  try {
    //ensure the databases
    databasing(message.guild.id, client);
    // defining guild_settings 
    const guild_settings = client.settings.get(message.guild.id);
    //get the prefix from the DATABASE
    let { prefix } = guild_settings;
    // if mesage is from a bot
    if (message.author.bot) return;
    // if prefix in database is null
    if (prefix === null) prefix = config.prefix;
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift()?.toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id))
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Hugh? I got pinged? Imma give you some help`)
            .setDescription(`To see all Commands type: \`${prefix}help\`\n\nTo setup an Application System type: \`${prefix}setup\`\n\nYou can edit the setup by running: \`${prefix}editsetup\`\n\n*There are 2 other setups just add Number 2/3 to the end of setup like that: \`${prefix}setup2\`/\`${prefix}setup3\`*`)]
        })
      return
    };

    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.VIEW_CHANNEL)) return;
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
      return message.reply(`❌ **I am missing the Permission to EMBED LINKS (Sending Embeds)**`)
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
      return message.reply(`❌ **I am missing the Permission to USE EXTERNAL EMOJIS**`)
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
      return message.reply(`❌ **I am missing the Permission to ADD REACTIONS**`)
    if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
      return message.reply(`❌ **I am missing the Permission to MANAGE CHANNELS**`)

    //ALL CMDS, yes not looking great but its enough ;)
    if (["h", "help", "cmd"].includes(cmd))
      require("../../modules/handlers/help_cmd")(client, message, args, cmd, prefix)

    //fire a general command
    else if (client.category.general.includes(cmd))
      require("../../modules/handlers/general_cmds")(client, message, args, cmd, prefix)

    //fire a voice command
    else if (client.category.voice.includes(cmd))
      require("../../modules/handlers/voice_cmds")(client, message, args, cmd, prefix)

    //fire a setup command
    else if (client.category.setup.includes(cmd))
      require("../../modules/handlers/setup_cmds")(client, message, args, cmd, prefix)

    else {
      return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle("UNKNOWN CMD")
            .setDescription(`Sorry, i don't know this cmd! Try: \`${prefix}help\``)
            .setFooter(ee.footertext, ee.footericon)
        ]
      })
    }
  } catch (e) {
    console.log(e)
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("ERROR | ERROR")
          .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
      ]
    }).then((msg) => {
      setTimeout(() => { msg.delete() }, 7500)
    })
  }
};