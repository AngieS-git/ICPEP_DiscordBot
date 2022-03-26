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


const guildId = "930418891308544051"

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

client.on("ready", async () => {
    const guild = client.guilds.cache.get(guildId)
    if(!guild)
        console.error("Target guild not found")
        await guild.commands.set([...client.slashcommands.values()])
        console.log(`Successfully loaded in ${client.slashcommands.size}`)
        process.exit(0)
})

client.login(process.env.TOKEN)