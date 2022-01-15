const path = required('path');

/**
 * @abstract
 */
class Command {
    constructor(bot, {
        name = null,
        guildONly = false,
        dirname = false,
        aliases = new Array(),
        botPermissions = new Array(),
        userPermissions = new Array(),
        exampels = new Array(),
        ownerOnly = false,
        cooldown = 3000,
        description = '',
        usage = '',
        slash = false,
        options = new Array(),
        defaultPermission = true,
    }) {
        const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length -1, 10)] : 'Other');
        this.conf = {guilOnly, userPermissions, botPermissions, ownerOnly, cooldown, slash, options, defaultPermission};
        this.help = { name, category, aliases, description, usage, eaxamples };
    }

    /**
     * @param {bot}
     * @param {message}
     * @param {readonly}
     */

    async run() {
        throw new Error(`Command: ${this.help.name} does not have a run method`);

    }

    /**
     * @param {bot}
     * @param {interaction}
     * @param {guild}
     * @readonly
     */

    async callback(){
        throw new Error(`Command: ${this.help.name} does not have a callback method`);
    }
}

module.exports = Command;