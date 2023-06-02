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
const config_json_1 = require("./config.json");
const help_1 = require("./commands/help");
const about_1 = require("./commands/about");
const convert_1 = require("./commands/convert");
const view_1 = require("./commands/view");
const commands = [
    help_1.HelpCommand,
    about_1.AboutCommand,
    convert_1.ConvertCommand,
    view_1.ViewCommand
];
const commandDispatch = new Map();
commandDispatch.set('help', help_1.HelpCommandAction);
commandDispatch.set('about', about_1.AboutCommandAction);
commandDispatch.set('convert', convert_1.ConvertCommandAction);
commandDispatch.set('view', view_1.ViewCommandAction);
const rest = new discord_js_2.REST({ version: '10' }).setToken(config_json_1.token);
const loadCommands = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Started refreshing application (/) commands.');
    yield rest.put(discord_js_2.Routes.applicationCommands('918674664623058955'), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
});
exports.iconURL = 'https://cdn.discordapp.com/app-icons/918674664623058955/c15abbd61dcc8e0f42ad6262e839cad3.png?size=512';
loadCommands().then(() => {
    const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
    client.on('ready', () => {
        var _a;
        console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
    });
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.isChatInputCommand())
            return;
        const commandName = interaction.commandName;
        const commandAction = commandDispatch.get(commandName);
        if (commandAction)
            commandAction(interaction);
    }));
    client.login(config_json_1.token);
});
/*Drawer.squares([
    new Color('00aaff', 'hex'),
    new Color('ff00aa', 'hex'),
    new Color('aaff00', 'hex')
]);*/ 
