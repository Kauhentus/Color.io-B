import { Client, CommandInteraction, EmbedBuilder, Events, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import { REST, Routes } from 'discord.js';

import { token } from './config.json';
import { HelpCommand, HelpCommandAction } from './commands/help';
import { AboutCommand, AboutCommandAction } from "./commands/about";
import { ConvertCommand, ConvertCommandAction } from "./commands/convert";


const commands = [
    HelpCommand,
    AboutCommand,
    ConvertCommand
];
const commandDispatch = new Map<string, (interaction: CommandInteraction) => Promise<void>>();
commandDispatch.set('help', HelpCommandAction);
commandDispatch.set('about', AboutCommandAction);
commandDispatch.set('convert', ConvertCommandAction);

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
        console.log(`Logged in as ${client.user?.tag}!`);
    });
    
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const commandName = interaction.commandName;
        const commandAction = commandDispatch.get(commandName);
        if(commandAction) commandAction(interaction);
    });
    
    client.login(token);
});