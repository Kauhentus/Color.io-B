"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconURL = void 0;
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const token_json_1 = require("./token.json");
const help_1 = require("./commands/help");
const about_1 = require("./commands/about");
const convert_1 = require("./commands/convert");
const view_1 = require("./commands/view");
const palette_1 = require("./commands/palette");
const antispam_1 = require("./antispam");
const logger_1 = require("./util/logger");
const warning = process.emitWarning;
process.emitWarning = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('buffer.File')) {
        // ignore buffer.File experimental feature warning;
    }
    else {
        logger_1.logger.warn(`warning | ${args.map((arg) => arg.toString()).join(' | ')}`);
        // @ts-ignore
        return warning.apply(process, args);
    }
};
const antispam = new antispam_1.Antispam();
const commands = [
    help_1.HelpCommand,
    about_1.AboutCommand,
    convert_1.ConvertCommand,
    view_1.ViewCommand,
    palette_1.PaletteCommand
];
const commandDispatch = new Map();
commandDispatch.set('help', help_1.HelpCommandAction);
commandDispatch.set('about', about_1.AboutCommandAction);
commandDispatch.set('convert', convert_1.ConvertCommandAction);
commandDispatch.set('view', view_1.ViewCommandAction);
commandDispatch.set('palette', palette_1.PaletteCommandAction);
const rest = new discord_js_2.REST({ version: '10' }).setToken(token_json_1.token);
const loadCommands = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Started refreshing application (/) commands.');
    yield rest.put(discord_js_2.Routes.applicationCommands(token_json_1.clientid), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
});
exports.iconURL = 'https://cdn.discordapp.com/app-icons/918674664623058955/c15abbd61dcc8e0f42ad6262e839cad3.png?size=512';
loadCommands().then(() => {
    const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
    client.on('ready', () => {
        var _a;
        const guildCacheSize = client.guilds.cache.size;
        const channelsCacheSize = client.guilds.cache.map(guild => guild.channels.cache.size).reduce((a, b) => a + b);
        const usersCacheSize = client.users.cache.size;
        const membersCacheSize = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b);
        console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
        console.log(`Serving ${client.guilds.cache.size} guilds in ${channelsCacheSize} channels with ${membersCacheSize} members`);
        logger_1.logger.info(`meta | ${guildCacheSize} | ${channelsCacheSize} | ${usersCacheSize} | ${membersCacheSize}`);
    });
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.isChatInputCommand())
            return;
        const commandName = interaction.commandName;
        const commandAction = commandDispatch.get(commandName);
        if (antispam.test(interaction.user.id, commandName)) {
            const errorEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('Error: Too many command requests')
                .setDescription(`Try again in a few seconds`)
                .setTimestamp()
                .setFooter({ text: 'Color.io © 2023' });
            interaction.reply({ embeds: [errorEmbed] });
            return;
        }
        if (!commandAction)
            return;
        commandAction(interaction)
            .then(() => {
            logger_1.logger.info(`command | ${interaction.user.id} | ${interaction.createdTimestamp} | ${commandName}`);
        })
            .catch((err) => {
            logger_1.logger.error(`error | ${interaction.user.id} | ${interaction.createdTimestamp} | source-A | ${err}`);
            const errorEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('Unknown error')
                .setDescription(`Error message:
                        ${err.toString()}
                        ** ** ** **
                        Please contact the developer here: https://discord.gg/MnGWM2s`)
                .setTimestamp()
                .setFooter({ text: 'Color.io © 2023' });
            interaction.reply({ embeds: [errorEmbed] });
        });
    }));
    client.on('error', (err) => {
        logger_1.logger.error(`error | - | - | source-B | ${err}`);
    });
    client.login(token_json_1.token);
});
