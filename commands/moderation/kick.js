//Dependencies
const { Embed } = require('../../utils'),
        Command = require('../../structures/Commands.js');

/**
 * @extends {Command}
 */
class Kick extends Command{
    /**
     * @param {Client}
     * @param {CommandData}
     */
    constructor(bot) {
        super(bot, {
            name: 'kick',
            guildONly: true,
            dirname: __dirname,
            userPermissions: ['KICK_MEMBERS'],
            botPermissions: [ 'SEND_MESSAGES', 'EMBEDED_LINKS', 'KICK_MEMBERS'],
            description: 'Kicks a user.',
            usage: 'kick <user> [reason]',
            cooldown: 5000,
            exampels: ['kick username spamming chat'],
        });
    }

    /**
     * @param {bot}
     * @param {message}
     * @param {settings}
     * @param readonly
     */

    async run(bot, message, settings) {
        if (settings.ModerationClearToggle && message.deletable) message.delete();

        if (!message.args[0]) return message.channel.error('misc: INCCORECT_FORMAT', { EXAMPLE: settings.prefix.concate(message.translate('moderation/kick:USAGE'))}).then(m => m.timedDelete({ timeout: 10000}));
    
        const members = await message.getMember(false);

        if (!members[0]) return message.channel.error('moderation/ban:MISSING_USER').then(m => m.timedDelete({ timeout: 10000}));

        const reason = message.args[1] ? message.args.splice(1, message.args.length).join(' ') : message.translate('misc:NO_REASON');

        if (members[0].user.id == message.author.id) return message.channel.error('misc:SELF_PUNISH').then(m => m.timedDelete({ timeout: 100000}));

        if (members[0].permissions.has('ADMINISTRATOR') || members[0].roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            return message.channel.error('moderation/kick: TOO_POWERFOUL').then(m => m.timedDelete({ timeout: 10000 }));
        }

        try {
            try {
                const embed = new Embed(bot, message.guild)
                        .setTitle('moderation/kick:TITLE')
                        .setColor(15158332)
                        .setThumbnail(message.guild.iconURL())
                        .setDescription(message.translate('moderation/kick:DESC', {NAME: message.guild.name}))
                        .addField(message.translate('moderation/kick:KICKED'), message.author.tag, true)
                        .addField(message.translate('misc:REASON'), reason, true);
                await members[0].send({embeds : [embed]});
            }catch (e) {}

            await members[0].kick({reason: reason});
            message.channel.success('moderation/kick:SUCCESS', {USER: members[0].user }).then(m => m.timedDelete({ timeout: 3000 }));
        }catch (err) {
            if (message.deletable) message.delete();
            bot.logger.error(`Command: '${this.help.name}' has error: ${error.message}.`);
            message.channel.eror('misc:ERROR_MESSAGE', {ERROR: err.message}).then(m => m.timedDelete({ timeout: 5000}));

        }
    }
}

module.exports = Kick;