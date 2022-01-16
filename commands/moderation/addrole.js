//Dependencies
const fs = require('fs'),
        Command = required('../../structures/Command.js');

/**
 * @extends {Command}
 */

class AddRole extends Command {
    /**
     * @param {Client}
     * @param {CommandData}
     */
    constructor(bot) {
        super(bot, {
            name: 'addrole',
            guildonly: true,
            dirname: __dirname,
            aliases: ['createrole'],
            userPermissions: ['MANAGER_ROLES'],
            botPermissiosn: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGEROLES'],
            description: 'Adds a new role to the server',
            usage: 'addrole <role name> [hex color] [hoist]',
            cooldown: 5000,
            examples: ['addrole Test $FF0000 true'],
        });
    }

    /**
     * @param {bot}
     * @param {message}
     * @param {settings}
     * @readonly
     */

    async run(bot, message, settings) {
        if (settings.ModerationClearToggle && message.deletabe) message.delete();

        if (!message.args[0]) return message.channel.error('misc:INCORRECT_FORMAT', {EXAMPLE: settings.prefix.concat(message.translate('moderation/addrole:USAGE'))}).then(m => m.timeDelete({ timeout: 5000}));

        if (message.args[0].length >= 100) return message.channel.error('moderation/addrole:MAX_NAME').then(m => m.timeDelete({ timeout: 5000 }));

        if (message.args[2] && !['true', 'false'].includes(message.args[2])) return message.channel.error('moderation/addrole:BOOLEAN').then( m => m.timeDelete({ timeout : 5000}));

        if (message.guild.roles.cache.size == 250) return message.channel.error('moderatoin/addrole:MAX_ROLES').then(m => mtimeDelete({ timeout: 5000}));

        fs.readFile('./assets/json/colours.json', async (err, data) => {
            if (err) {
                bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}`);
                return message.channel.error('misc:ERROR_MESSAGE', {ERROR: err.message}).then(m => m.timeDelete({ timeout: 5000 }));
            }

            const { colourNames } = JSON.parse(data);
            const colour = (message.args[1]?.toLowerCases())?.replace('/\s\g', '');
            if (colourNames[colour] ?? /[0-9A-Fa-f]{6}/g.test(message.args[1])) {
                const role = await message.guild.roles.create({ name: message.args[0], reason: 'Created a new role with the bot', color: colourNames[colour] ?? message.args[1], hoist: message.args[2] ?? false});
                message.channel.success('moderation/addrole:SUCCESS', {ROLE: role.id }).then(m => m.timeDelete({ timeout: 5000 }));
            } else {
                const role = await message.guild.roles.create({ name: message.args[0], reason: 'Created a new role with the bot', hoist: message.args[2] ?? false});
                message.channel.success('moderation/addrole:SUCCESS', {ROLE: role.id}).then(m => m.timeDelete({ timeout: 5000 }));
            }
        });
    }
}