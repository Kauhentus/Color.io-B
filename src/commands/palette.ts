import { CacheType, EmbedBuilder, CommandInteraction, SlashCommandBuilder, AttachmentBuilder, CommandInteractionOptionResolver } from "discord.js";
import { iconURL } from "../index";
import { colorChoices } from "./convert";
import { Color, ColorFlag, Triple } from "../util/color";
import { Drawer } from "../util/draw";
import { goldenRatioGenerator } from "./generators/goldenratio";
import { harmonyGenerator } from "./generators/harmony";
import { triadGenerator } from "./generators/triad";
import { chunkIntoN, isValidHttpUrl, randomInt } from "../util/util";
import getPixels from "get-pixels";
import palette from "get-rgba-palette";

const generators = [
    goldenRatioGenerator,
    harmonyGenerator,
    triadGenerator
];
const generatorNames = [
    'golden-ratio',
    'harmony',
    'triad'
];

/*export const PaletteCommand = new SlashCommandBuilder()
    .setName('palette')
    .setDescription('generate either a normal or image color palette')
    .addStringOption(option => 
        option.setName('category')
            .setDescription('choose between normal palette or image palette generation')
            .addChoices(
                {name: 'normal', value: 'normal'},
                {name: 'image', value: 'image'}
            )
            .setRequired(true))
    .addStringOption(option => 
        option.setName('format')
            .setDescription('the color format of the output colors')
            .addChoices(...colorChoices)
            .setRequired(true))
    .addIntegerOption(option => 
        option.setName('number-of-colors')
            .setDescription('the number of colors to generate (max 16)')
            .setRequired(false))
    .addStringOption(option => 
        option.setName('url')
            .setDescription('A url ending in .jpg or .png for an image color palette')
            .setRequired(false));*/

export const PaletteCommand = new SlashCommandBuilder()
    .setName('palette')
    .setDescription('generate either a normal or image color palette')
    .addSubcommand(subcommand => 
        subcommand
            .setName('normal')
            .setDescription('generate a unique color palette')
            .addStringOption(option => 
                option.setName('format')
                    .setDescription('the color format of the output colors')
                    .addChoices(...colorChoices)
                    .setRequired(true))
            .addIntegerOption(option => 
                option.setName('number-of-colors')
                    .setDescription('the number of colors to generate (max 16)')
                    .setRequired(false)))
    .addSubcommand(subcommand => 
        subcommand
            .setName('image')
            .setDescription('generate a color palette from an image')
            .addStringOption(option => 
                option.setName('format')
                    .setDescription('the color format of the output colors')
                    .addChoices(...colorChoices)
                    .setRequired(true))
            .addStringOption(option => 
                option.setName('url')
                    .setDescription('A url ending in .jpg or .png for an image color palette')
                    .setRequired(true))
            .addIntegerOption(option => 
                option.setName('number-of-colors')
                    .setDescription('the number of colors to generate (max 16)')
                    .setRequired(false))
            );
    

export const PaletteCommandAction = async (interaction : CommandInteraction<CacheType>) => {
    //const category = interaction.options.get('category')?.value as ('normal' | 'image');
    
    const options = interaction.options as CommandInteractionOptionResolver;
    const category = options.getSubcommand() === 'normal' ? 'normal' : 'image';
    const type = options.get('format')?.value as ColorFlag;
    const typeCaps = type.toUpperCase();
    const rawNumColors = options.get('number-of-colors')?.value as number || 6;
    const numColors = Math.floor(rawNumColors);
    const imageUrl = options.get('url')?.value as string;
    
    if(numColors <= 0 || numColors > 16){
        const errorEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('Command Error: Palette')
            .setDescription(
                `Error: invalid number of colors, valid range is 1 to 16
                **Check \`/help palette\` for more info** `)
            .setTimestamp()
            .setFooter({text: 'Color.io © 2023'});

        interaction.reply({embeds: [errorEmbed]});
        return;
    }

    if(category === 'normal'){
        const randomIndex = randomInt(0, generators.length - 1);
        const colors = generators[randomIndex](numColors);
        
        const imageData = await Drawer.squares(colors)
        const imageAttachment = new AttachmentBuilder(imageData);
        const highlightColor = colors[colors.length - 1].getInt();

        const viewEmbed = new EmbedBuilder()
            .setColor(highlightColor)
            .setThumbnail(iconURL)
            .setTitle(`Generated Color Palette (${type} ${numColors} ${generatorNames[randomIndex]}):`)
            .setDescription(
                `${colors.map(color => Color.toFormatString(color, type, false)).join('   ')}
                ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                ** ** ** **
                \`[${colors.map(color => Color.toFormatString(color, type, true)).join(', ')}]\``
            )
            .setTimestamp()
            .setFooter({text: 'Color.io © 2023'});
        
        await interaction.reply({embeds: [viewEmbed]})
            .catch(() => {/* ignore, no perms to reply to message */});
        interaction.channel?.send({files: [imageAttachment]})
            .catch(() => {/* ignore, no perms to send message/embed image */});
    }

    else {
        const onBadUrl = () => {
            const errorEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('Command Error: Palette')
                .setDescription(
                    `Error: The supplied image url "${imageUrl || ' '}" is missing or invalid. Double check that your url starts with \`https://\` and ends with \`.png\` or \`.jpg\`?
                    **Check \`/help palette\` for more info** `)
                .setTimestamp()
                .setFooter({text: 'Color.io © 2023'});

            interaction.reply({embeds: [errorEmbed]});
        }
        if(!isValidHttpUrl(imageUrl)){
            onBadUrl();
            return;
        }

        getPixels(imageUrl, async (err, pixels) => {
            if(err) {
                onBadUrl();
                return;
            }

            const rawRGBPalette : Triple[] = palette([...pixels.data], numColors);
            const colors = rawRGBPalette.map((triple: Triple) => new Color(triple, 'rgb'));

            const imageData = await Drawer.squares(colors)
            const imageAttachment = new AttachmentBuilder(imageData);
            const highlightColor = colors[colors.length - 1].getInt();

            const viewEmbed = new EmbedBuilder()
                .setColor(highlightColor)
                .setThumbnail(iconURL)
                .setTitle(`Generated Color Palette (Image ${numColors}):`)
                .setDescription(
                    `${colors.map(color => Color.toFormatString(color, type, false)).join('   ')}
                    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                    ** ** ** **
                    \`[${colors.map(color => Color.toFormatString(color, type, true)).join(', ')}]\``
                )
                .setTimestamp()
                .setFooter({text: 'Color.io © 2023'});
            
            await interaction.reply({embeds: [viewEmbed]})
                .catch(() => {/* ignore, no perms to reply to message */});
            interaction.channel?.send({files: [imageAttachment]})
                .catch(() => {/* ignore, no perms to send message/embed image */});
        });
    }
}