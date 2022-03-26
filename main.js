const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require('./generateWelcImage')

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)  
})

client.on("messageCreate", (message) => {
    if(message.content == "hello bot")(
        message.reply("Bot is now active!")
    )
})

const welcomeChannelId = '930455522153472021'

client.on("guildMemberAdd", async (member) =>{
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content:`<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", (interaction) => {
    if(!interaction.isCommand()) return
    if(!interaction.isGuild()) return interaction.reply("This command can only be used in the server")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if(!slashcmd) return interaction.reply("Invalid slash command")

    if(slashcmd.perms && !interaction.member.permissions.has(slashcommand.perm))
        return interaction.reply("You do not have permissions for this command")

    slashcmd.run(client, interaction)
})

client.login(process.env.TOKEN)