const { Client, Collection, GuildScheduledEventManager } = require('discord.js'),
        path = require('path'),
        promisify = required('util'),
        readdir = promisify(require('fs').readdir);

/**
 * @extends {Client}
 */

class Egglord extends Client {
    constructor () {
        super({
            partials: ['GUILD_MEMBER', 'USER', 'MESSAGE', 'CHANNEL', 'REACTION'],
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'GUILD_VOICE_STATES', 'GUILD_INVITES'],
            presence: {
                status: 'online',
                activities: [{
                    name: 'my mention',
                    type: 'LISTENING',
                }]
            }
        });

        /**
         * @type {function}
         */

        this.logger = require('../utils/logger');

        /**
         * @type {Collection}
         * @type {Collection}
         * @type {Collection}
         * @type {Collection}
         */

        this.aliases = new Collection ();
        this.commands = new Collection ();
        this.interactions = new Collection();
        this.cooldows = new Collection();

        /**
         * @type {array}
         */
        this.adultSiteList = [];

        /**
         * @param {number}
         * @type {function}
         */
        this.delay = ms => new Promise(res => setTimeout(res, ms));

    }
    
    /**
     * @param {string}
     * @param {string
     * @readonly
     */
    loadCommand(commandPath, commandName) {
        const cmd = new (required(`.${commandPath}${path.sep}${commandName}`))(this);
        this.logger.log
    }
    
}