require('dotenv').config({
    path: './env/.env'
})
//channel IDs
const ver_channel = '930711292203921428'
const welc_channel = '930455522153472021'
const command_PREFIX = '!'
const Discord = require('discord.js');


const bot = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
    ]
})


bot.on('ready', () =>{console.log(`Logged in as ${bot.user.tag}!`)})

//draft of discord bot commands
//for now it sends a message, will implement database comparison later on
bot.on('messageCreate', async message =>{
    if(message.author.bot)
    await message.delete() //to avoid spam
    let args = message.content.substring(command_PREFIX.length).split(" ")

    if(message.channel.id === ver_channel || message.channel.id('930418892415852586')){
        switch(args[0]){
            case 'help':
                const help_embed = new Discord.MessageEmbed()
                .setTitle("Helper Bot")
                .setColor(0x1EC1FE)
                .setDescription("Make sure to use the !help to get access to the commands")
    
                message.author.send({embeds:[help_embed]})
            break;
    
            case 'verify':
                const verify_embed = new Discord.MessageEmbed()
                .setTitle("Verification Bot")
                .setColor(0xF8DD1A)
                .setDescription("Please enter your full name to be verified")
    
                message.author.send({embeds:[verify_embed]})
            break;

            default:
                const error_embed = new Discord.MessageEmbed()
                .setTitle("Error Bot")
                .setColor(0xFF0000)
                .setDescription("Sorry, your command does not belong in command list")
    
                message.author.send({embeds:[error_embed]})
    
        }
    }
    
})
/*
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
*/

//prompts user to verify
bot.on('guildMemberAdd', member => {
    console.log(member.user.tag)
    
    const welc_message = `Welcome <@${member.user.id}>
    to the server!. Click ${member.guild.channels.cache.get(ver_channel).toString()}
    and type !verify to be verified in the server.`
    
    const send2ver = member.guild.channels.cache.get(welc_channel)
    send2ver.send(welc_message)
})


//pms user additional instructions whenever they type !verify

bot.login(process.env.Disc_TOKEN)