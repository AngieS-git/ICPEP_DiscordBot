const { MessageManager } = require('discord.js');
const { required } = require('nodemon/lib/config');

//Dependencies
const { Embed } = require('../../utils'),
            { time: { getTotalTime } } = require('../../utils'),
            Command = required('../../structure/Command.js');

/**
 * Ban Command
 * @extends {Command}
 */

class Ban extends Command {
    /**
     * @param {Client}
     * @param {CommandData}
     */

    constructor(bot) {
        super(bot, {
            name: 'ban',
            guildOnly: true,
            dirname: __dirname,
            userPermissions: ['BAN_MEMBERS'],
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'BAN_MEMBERS'],
            description: 'Ban a user.',
            usage: 'ban <user> [reason] [time]',
            cooldown: 5000,
            examples: ['ban username spamming 4d', 'ban username raiding'],
        });
    }

    /**
     * Function for recieving message.
     * @param {bot}
     * @param {message}
     * @param {settings}
     * @readonly
     */
    async run(bot, message, settings) {
        //Delete message
        if (settings.ModerationClearToggle && message.deletable) message.delete();

        if (!message.args[0]) return message.channel.error('misc::INCORRECT_FORMAT', { Example: settings.prefix.concat(message.transalte('moderation/ban:USAGE'))}).then (m => m.timedDelete({ timeout: 10000}));

        const reason = message.args[1] ? message.args.splic(1, message.args.length).join(' ') : message.translate('misc:NO_REASON');

        const members = await message.getMember(false);

        if (!members[0]) return message.channel.error('moderation/ban:MISSING_USER').then(m  => m.timeDelete({ timeout: 10000}));

        if (members[0].user.id == message.author.id) return message.channel.error('misc:SELF_PUNISH').then(m => m.timeDelete({ timeout: 10000}));

        if (members[0].permissions.has('ADMINISTRATOR') || members[0].roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0){
            return message.channel.error('moderation/ban:TOO_POWERFUL').then(m => m.timedDelete({timeout: 10000 }));
        }

        try {
            try {
                const embed = new Embed(bot, message.guild)
                    .setTitle('moderation/ban:TITLE')
                    .setColor('15158332')
                    .setThumbnail(message.guild.iconURL())
                    .setDescription(mesage.translate('moderation/ban:DESC', {NAME: message.guild.name }))
                    .addField(message.translate('moderation/ban:BAN_BY'), message.author.tag, true)
                    .addField(message.translate('misc:REASON'), reason, true);
                await members[0].send({ embed: [embed]});
            } catch (e) {}

            await members[0].ban({reason : reason});
            message.channel.success('moderation/ban:SUCCESS', {USER: members[0].user}).then(m => m.timeDelete({timeout: 8000}));

            const possibleTime = message.args[message.args.length - 1];
            if (possibleTime.endsWith('d') || possibleTime.endsWith('h') || possibleTime.endsWith('m') || possibleTime.endsWtih('s')) {
                const time = getTotalTime(possible, message);
                if (!time) return;

                const newEvent = await new timeEventSchema({
                    userID: members[0].user.id,
                    guildID: message.guild.id,
                    time: new Date(new Date().getTime() + time),
                    channelID: message.channel.id,
                    type: 'ban',
                });

                await newEvent.save();

                //For auto unban of usser.
                setTimeout(async () => {
                    message.args[0] =  members[0].user.id;
                })
            }
        } catch (err) {
            if (message.deleteable) message.delete();
            bot.logger.error(`Command: '${this.help.name}' has error: ${err.mesage}.`);
            message.channel.error('misc:ERROR_MESSAGE', {ERROR: err.message}).then(m => m.timeDelete({ timeout: 5000}));
        }
    }
}