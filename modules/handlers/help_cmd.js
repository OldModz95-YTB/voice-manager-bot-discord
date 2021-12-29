//IMPORT FILE DATA
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { databasing, escapeRegex } = require("../../modules/functions")
//import the Discord Library
const Discord = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");
// HERE THE EVENT STARTS
module.exports = (client, message, args, cmd, prefix) => {

  if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)) return message.reply("Please give me the Permission, to Send Embeded Messages!");

  if (!args[0])
    return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.color)
        .setTitle("These are all Command Groups!")
        .setDescription(`PREFIX: \`${prefix}\`\n\n*Enter the right Category, to see help for them* Example: \`${prefix}help voice\`\n[\`INVITE ME\`](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [\`Support Server\`](https://discord.gg/MS6TMgRfqB) | [\`Website\`](https://shop.protondev.eu) | Developer: \`OldModz95#3105\``)
        .addField(`\`${prefix}help general\``, "Shows all general/Information Commands!", true)
        .addField(`\`${prefix}help setup\``, "> *Shows you all Setup related Commands (how to create a setup, etc.)*", true)
        .addField(`\`${prefix}help voice\``, "> *Shows you all Voice Channel (hosted) related Commands*", true)
      ]
    });
  switch (args[0].toLowerCase()) {
    case "general": {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setTitle("These are all cmds!")
          .setDescription(`PREFIX: \`${prefix}\``)
          .addField(`\`${prefix}help\``, "_Shows all available Commands!_", true)
          .addField(`\`${prefix}add\``, `> *[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) the Bot!*`, true)
          .addField(`\`${prefix}support\``, "> *Sends you a Link for the [SUPPORT SERVER](https://discord.gg/MS6TMgRfqB) of the Bot!*", true)
          .addField(`\`${prefix}ping\``, "> *Shows the ping of the Bot!*", true)
          .addField(`\`${prefix}uptime\``, "> *Shows the uptime of the Bot!*", true)
          .addField(`\`${prefix}info\``, "> *Shows Information & Stats of the Bot*", true)
          .addField(`\`${prefix}tutorial\``, "> *[Tutorial](https://github.com/OldModz95-YTB/voice-manager-bot-discord)*", true)
          .addField(`\`${prefix}source\``, "> *Gives you a Link to the [Source Code on Github](https://github.com/OldModz95-YTB/voice-manager-bot-discord)*", true)
          .addField(`\`${prefix}prefix\``, "> *Changes the prefix of the bot!*", true)
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    };
      break;
    case "setup":
      {
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setTitle("These are all cmds!")
            .setDescription(`PREFIX: \`${prefix}\``)
            .addField(`\`${prefix}setup\` --> Follow steps`, "> *Creates a temp. Voice Channel Setup*")
            .addField(`\`${prefix}setupname <ChannelName>\``, "> *Changes the Created temp. Voice Channel's Name!* \n**Note:** *Having \`{user}\` in your Channel name, will replace with the username!*\n" + `Example: \`${prefix}setupname {user}'s VC\``)
            .addField("\u200b", "\u200b")
            .addField(`\`${prefix}setup2\` --> Follow steps`, "> *Creates a (2rd) temp. Voice Channel Setup*")
            .addField(`\`${prefix}setup2name <ChannelName>\``, "> *Changes the (2rd) Created temp. Voice Channel's Name!* \n**Note:** *Having \`{user}\` in your Channel name, will replace with the username!*\n" + `Example: \`${prefix}setupname {user}'s VC\``)
            .addField("\u200b", "\u200b")
            .addField(`\`${prefix}setup3\` --> Follow steps`, "> *Creates a (3rd) temp. Voice Channel Setup*")
            .addField(`\`${prefix}setup3name <ChannelName>\``, "> *Changes the (3rd) Created temp. Voice Channel's Name!* \n**Note:** *Having \`{user}\` in your Channel name, will replace with the username!*\n" + `Example: \`${prefix}setupname {user}'s VC\``)
            .setFooter(ee.footertext, ee.footericon)
          ]
        })
      };
      break;
    case "voice": {
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setTitle("These are all cmds!")
          .setDescription(`PREFIX: \`${prefix}\`\n\n** ALL OF THOSE COMMANDS SOON!!!**`)
          .addField(`\`${prefix}lock\``, "Locks the Voice Channel (makes it Private)!", true)
          .addField(`\`${prefix}unlock\``, "> *Unlocks the Voice Channel (makes it public)!*", true)
          .addField(`\`${prefix}kick @User\``, "> *Kicks a User out of Your Channel!*", true)
          .addField(`\`${prefix}ban @User\``, "> *Kicks and Bans a User from Your Channel!*", true)
          .addField(`\`${prefix}unban @User\``, "> *Unbans (trust) a User for Your Channel!*", true)
          .addField(`\`${prefix}trust @User\``, "> *Trusts a User to your Channel!*", true)
          .addField(`\`${prefix}untrust @User\``, "> *Untrusts a User from your Channel!!*", true)
          .addField(`\`${prefix}limit <UserLimit>\``, "> *Set's the Channel's UserLimit (how many can join)*", true)
          .addField(`\`${prefix}bitrate <Bitrate in bits>\``, "> *Set's the Channel's bitrate*", true)
          .addField(`\`${prefix}vcinvite @User [optional message]\``, "> *Invites a User for your Voice Channel*", true)
          .addField(`\`${prefix}promote @User\``, "> *Make someone else owner in your Channel*", true)
          .setFooter(ee.footertext, ee.footericon)
        ]
      })
    };
      break;
    default:
      return message.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setTitle("These are all Command Groups!")
          .setDescription(`PREFIX: \`${prefix}\`\n\n*Enter the right Category, to see help for them* Example: \`${prefix}voice\``)
          .addField(`\`${prefix}general\``, "Shows all general/Information Commands!", true)
          .addField(`\`${prefix}setup\``, "> *Shows you all Setup related Commands (how to create a setup, etc.)*", true)
          .addField(`\`${prefix}voice\``, "> *Shows you all Voice Channel (hosted) related Commands*", true)
        ]
      });
      break
  }
};
/**
 * @INFO
 * Bot Coded by OldModz95#3105
 * @INFO
 * Developped By ProtonDev | https://shop.protondev.eu
 * @INFO
 */