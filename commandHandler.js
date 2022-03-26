
const ver_channel = '930711292203921428'
const welc_channel = '930455522153472021'
const bot_comm_channel = '931526820141072435'
const command_PREFIX = '!'
const ver_role = '930714095869636639'
const admin_role = '930716161220435968'

const help = require("./commands/help.js")
const play =  require("./commands/play.js")
const gatcha =  require("./commands/gatcha.js")
const verify = require("./commands/verify.js")

const commands = {help, play, gatcha,verify}

module.exports = async function (msg){
    if(message.author.bot) return
    await message.delete() //to avoid spam

    if(msg.channel.id == bot_comm_channel && member.roles.cache == ver_role ){
        let tokens = msg.content.split(" ")
        let command = tokens.shift()
        if(command.charAt(0)=== "!"){
            command = command.substring(1)
            commands[command](msg, tokens)
        }
    }
}

//need to send error message