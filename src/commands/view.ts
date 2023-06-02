import { CacheType, EmbedBuilder, CommandInteraction, SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { iconURL } from "../index";
import { colorChoices } from "./convert";
import { Color, ColorFlag } from "../util/color";
import { Drawer } from "../util/draw";

export const ViewCommand = new SlashCommandBuilder()
    .setName('view')
    .setDescription('view color swatches from rgb, hex, or hsl color codes')
    .addStringOption(option => 
        option.setName('format')
            .setDescription('the color format of your input colors')
            .addChoices(...colorChoices)
            .setRequired(true))
    .addStringOption(option => 
        option.setName('input-colors')
            .setDescription('your input colors formatted according to `/help colorformat`')
            .setRequired(true));

export const ViewCommandAction = async (interaction : CommandInteraction<CacheType>) => {
    const type = interaction.options.data[0].value as ColorFlag;
    const inputString = interaction.options.data[1].value as string;

    Color.parseColorString(inputString, type)
        .then(async (colors) => {      
            const viewEmbed = new EmbedBuilder()
                .setColor(0x00aaff)
                .setThumbnail(iconURL)
                .setTitle(`Viewing ${colors.length} colors (${type}):`)
                .setDescription(
                    `${colors.map((color : Color) => Color.toFormatString(color, type, false)).join('   ')}
                    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                    ** ** ** **
                    \`[${colors.map((color : Color) => Color.toFormatString(color, type, true)).join(', ')}]\``
                )
                .setTimestamp()
                .setFooter({text: 'Color.io © 2023'});

            const imageData = await Drawer.squares(colors)
            const imageAttachment = new AttachmentBuilder(imageData);
            
            await interaction.reply({embeds: [viewEmbed]});
            interaction.channel?.send({files: [imageAttachment]});
        })
        .catch(err => {
            const errorEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('Command Error: View')
                .setDescription(
                    `Error: ${err}
                    **Check \`/help view\` and \`/help colorformat\` for more info** `)
                .setTimestamp()
                .setFooter({text: 'Color.io © 2023'});
            
            interaction.reply({embeds: [errorEmbed]});
        });
}