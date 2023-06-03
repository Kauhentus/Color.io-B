import { Client, CommandInteraction, EmbedBuilder, Events, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import { REST, Routes } from 'discord.js';

import { token } from './config.json';
import { HelpCommand, HelpCommandAction } from './commands/help';
import { AboutCommand, AboutCommandAction } from "./commands/about";
import { ConvertCommand, ConvertCommandAction } from "./commands/convert";
import { ViewCommand, ViewCommandAction } from "./commands/view";
import { PaletteCommand, PaletteCommandAction } from "./commands/palette";
import { Antispam } from "./antispam";
import { logger } from "./util/logger";

const warning = process.emitWarning;
process.emitWarning = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('buffer.File')) {
        // ignore buffer.File experimental feature warning;
    } else {
        logger.warn(`warning | ${args.map((arg : any) => arg.toString()).join(' | ')}`);
        // @ts-ignore
        return warning.apply(process, args);
    }
}

const antispam = new Antispam();
const commands = [
    HelpCommand,
    AboutCommand,
    ConvertCommand,
    ViewCommand,
    PaletteCommand
];
const commandDispatch = new Map<string, (interaction: CommandInteraction) => Promise<void>>();
commandDispatch.set('help', HelpCommandAction);
commandDispatch.set('about', AboutCommandAction);
commandDispatch.set('convert', ConvertCommandAction);
commandDispatch.set('view', ViewCommandAction)
commandDispatch.set('palette', PaletteCommandAction)


const rest = new REST({ version: '10' }).setToken(token);
const loadCommands = async () => {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands('918674664623058955'), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
}

export const iconURL = 'https://cdn.discordapp.com/app-icons/918674664623058955/c15abbd61dcc8e0f42ad6262e839cad3.png?size=512';

loadCommands().then(() => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.on('ready', () => {
        const guildCacheSize = client.guilds.cache.size;
        const channelsCacheSize = client.guilds.cache.map(guild => guild.channels.cache.size).reduce((a, b) => a + b);
        const usersCacheSize = client.users.cache.size;
        const membersCacheSize = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b);

        console.log(`Logged in as ${client.user?.tag}!`);
        console.log(`Serving ${client.guilds.cache.size} guilds in ${channelsCacheSize} channels with ${membersCacheSize} members`);
        logger.info(`meta | ${guildCacheSize} | ${channelsCacheSize} | ${usersCacheSize} | ${membersCacheSize}`);
    });
    
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const commandName = interaction.commandName;
        const commandAction = commandDispatch.get(commandName);
        if (antispam.test(interaction.user.id, commandName)) {
            const errorEmbed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle('Error: Too many command requests')
                    .setDescription(
                        `Try again in a few seconds`)
                    .setTimestamp()
                    .setFooter({text: 'Color.io © 2023'});

                interaction.reply({embeds: [errorEmbed]});
            return;
        }

        if(!commandAction) return;
        commandAction(interaction)
            .then(() => {
                logger.info(`command | ${interaction.user.id} | ${interaction.createdTimestamp} | ${commandName}`);
            })
            .catch((err) => {
                logger.error(`error | ${interaction.user.id} | ${interaction.createdTimestamp} | source-A | ${err}`);

                const errorEmbed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle('Unknown error')
                    .setDescription(
                        `Error message:
                        ${err.toString()}
                        ** ** ** **
                        Please contact the developer here: https://discord.gg/MnGWM2s`)
                    .setTimestamp()
                    .setFooter({text: 'Color.io © 2023'});

                interaction.reply({embeds: [errorEmbed]});
            });
    });

    client.on('error', (err) => {
        logger.error(`error | - | - | source-B | ${err}`);
    })
    
    client.login(token);
});