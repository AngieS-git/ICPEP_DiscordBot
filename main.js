require('dotenv').config({
    path: './env/.env'
})

const Discord = require('discord.js')

const bot = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
    ]
})


bot.login(process.env.Disc_TOKEN)

bot.on('ready', () =>{console.log(`Logged in as ${bot.user.tag}!`)})

bot.on ('messageCreate', async message => {
    if(message.author.bot) return //ignores bot messages
    if(message.content.toLowerCase()==='!verify' && message.channel.id === '930711292203921428' )
    {
        await message.delete() //to avoid spam
        //role ID
        const role = message.guild.roles.cache.get('930714095869636639')
        if(role){
            try{
               await message.member.roles.add(role)
                console.log("Role Added!")
            }
            catch(err){
                console.log(err)
            }
        }
    }
})

bot.on('guildMemberAdd', member => {
    console.log(member.user.tag)
})


