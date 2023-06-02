import { CacheType, EmbedBuilder, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { iconURL } from "../index";
import { Color, ColorFlag } from "../util/color";

export const colorChoices = [
    {name: 'hex', value: 'hex'},
    {name: 'rgb', value: 'rgb'},
    {name: 'hsl', value: 'hsl'},
];

export const ConvertCommand = new SlashCommandBuilder()
    .setName('convert')
    .setDescription('convert between different color formats')
    .addStringOption(option => 
        option.setName('from-format')
            .setDescription('the color format of your input colors')
            .addChoices(...colorChoices)
            .setRequired(true))
    .addStringOption(option => 
        option.setName('to-format')
            .setDescription('your desired output color format')
            .addChoices(...colorChoices)
            .setRequired(true))
    .addStringOption(option => 
        option.setName('input-colors')
            .setDescription('your input colors formatted according to `/help colorformat`')
            .setRequired(true));

export const ConvertCommandAction = async (interaction : CommandInteraction<CacheType>) => {
    const fromType = interaction.options.data[0].value as ColorFlag;
    const fromTypeCaps = fromType.toUpperCase();
    const toType = interaction.options.data[1].value as ColorFlag;
    const toTypeCaps = toType.toUpperCase();
    const inputString = interaction.options.data[2].value as string;

    Color.parseColorString(inputString, fromType)
        .then(colors => {      
            const receivedEmbed = new EmbedBuilder()
                .setColor(colors[colors.length - 1].getInt())
                .setTitle(`Received ${fromTypeCaps} colors:`)
                .setDescription(
                    `${colors.map(color => Color.toFormatString(color, fromType, false)).join('   ')}`);
            
            const responseEmbed = new EmbedBuilder()
                .setColor(colors[colors.length - 1].getInt())
                .setTitle(`Converted color types to ${toTypeCaps}:`)
                .setThumbnail(iconURL)
                .setDescription(
                    `**${toTypeCaps}**: ${colors.map(color => Color.toFormatString(color, toType, false)).join('   ')}
                    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                    ** ** ** **
                    **${toTypeCaps}**:\`[${colors.map(color => Color.toFormatString(color, toType, true)).join(', ')}]\``)
                .setTimestamp()
                .setFooter({text: 'Color.io © 2023'});
            
            interaction.reply({embeds: [receivedEmbed, responseEmbed]});
        })
        .catch(err => {
            const errorEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('Command Error: Convert')
                .setDescription(
                    `Error: ${err}
                    **Check \`/help convert\` and \`/help colorformat\` for more info** `)
                .setTimestamp()
                .setFooter({text: 'Color.io © 2023'});
            
            interaction.reply({embeds: [errorEmbed]});
        });
}