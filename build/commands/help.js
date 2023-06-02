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
exports.HelpCommandAction = exports.HelpCommand = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
exports.HelpCommand = new discord_js_1.SlashCommandBuilder()
    .setName('help')
    .setDescription('Learn how to use Color.io\'s many commands!')
    .addStringOption(option => option.setName('category')
    .setDescription('A specific category to get help on')
    .addChoices({ name: 'palette', value: 'palette' }, { name: 'convert', value: 'convert' }, { name: 'view', value: 'view' }, { name: 'colorformat', value: 'colorformat' }));
const HelpCommandAction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    let helpEmbed;
    if (interaction.options.data.length === 1) {
        const category = interaction.options.data[0].value;
        if (category === 'convert') {
            helpEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0x00aaff)
                .setThumbnail(index_1.iconURL)
                .setTitle('Help Center: Converter')
                .setDescription('**Commands centered around converting between different color types:**')
                .addFields({
                name: '`/convert <original-type> <target type> <color1> <color2> ...`',
                value: `** **
                        Converts all the colors given into the desired format.
                        \`<original-type>\` the color format of the inputted colors (\`HEX\`, \`RGB\`, \`HSL\`)
                        \`<target-type>\` the desired target color format (\`HEX\`, \`RGB\`, \`HSL\`)
                        \`<color1> <color2> ...\` the individual color codes

                        Example: \`/convert hex rgb 2D47E2 2DE782 5945E0 5C34D6 29E063\`
                        Example: \`/convert rgb hsl [243, 110, 34]\`
                        ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                        ** ** ** **`
            })
                .addFields({
                name: '** ** ** ** \n **For help on color type format:**',
                value: '`/help colorformat`'
            })
                .setTimestamp()
                .setFooter({ text: 'Color.io © 2023' });
        }
        else if (category === 'palette') {
            helpEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0x00aaff)
                .setThumbnail(index_1.iconURL)
                .setTitle('Help Center: Palette')
                .setDescription('**Commands centered around creating color palettes:**')
                .addFields({
                name: '`/palette normal <type> <count>`',
                value: `** **
                        Generates all sorts of random color palettes
                        \`<type>\` controls the color format of the color codes (HEX, RGB, HSL)
                        \`<count>\` controls the number of colors in the palette
        
                        Example: \`/palette normal hex 6\`
                        ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                        ** ** ** **`
            })
                .addFields({
                name: '`/palette image <type> <count> <link>`',
                value: `** **
                        Generates color palettes from an image
                        \`<type>\` controls the color format of the color codes (HEX, RGB, HSL)
                        \`<count>\` controls the number of colors in the palette
                        \`<link>\` a link to the image to extract colors from
        
                        Example: \`/palette image hex 6 https://raw.githubusercontent.com/Kauhentus/image-storage/master/Aurora.jpg\`
                        ** ** ** **`
            })
                .setTimestamp()
                .setFooter({ text: 'Color.io © 2023' });
        }
        else if (category === 'colorformat') {
            helpEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0x00aaff)
                .setThumbnail(index_1.iconURL)
                .setTitle('Help Center: Color Formatting')
                .setDescription('**How to format color types for Color.io**')
                .addFields({
                name: '**Accepted color formats are HEX, RGB, and HSL:**',
                value: `\`hex\`: 6 letter hexadecimal (i.e. \`F40C5F\`)
                        ** ** ** **
                        \`rgb\`: 3 numbers surrounded by \`[]\` or \`()\`, delimited with commas \n (i.e. \`[187, 251, 85]\`, \`(27, 23, 161)\`, or \`{25, 179, 105}\`)
                        ** ** ** **
                        \`hsl\`: 3 numbers surrounded by \`[]\` or \`()\`, delimited with commas \n (i.e. \`[336, 0.613, 0.453]\`, \`(146, 0.612, 0.472)\`, or \`{251, 0.643, 0.532}\`)
                        ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                        ** ** ** **`
            })
                .setTimestamp()
                .setFooter({ text: 'Color.io © 2023' });
        }
        else {
            helpEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0x00aaff)
                .setThumbnail(index_1.iconURL)
                .setTitle('Help Center: Viewer')
                .setDescription('**Commands centered around viewing colors:**')
                .addFields({
                name: '`/view <type> <color1> <color2> ...`',
                value: `** **
                    Views all the colors given.
                    \`<type>\` the color format of the inputted colors (HEX, RGB, HSL)
                    \`<color1> <color2> ...\` the individual color codes
    
                    Example: \`/view hex 2D47E2 2DE782 5945E0 5C34D6 29E063\`
                    Example: \`/view rgb [243, 110, 34]\`
                    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                    ** ** ** **`
            })
                .addFields({
                name: '** ** ** ** \n **For help on color type format:**',
                value: '`/help colorformat`'
            })
                .setTimestamp()
                .setFooter({ text: 'Color.io © 2023' });
        }
    }
    else {
        helpEmbed = new discord_js_1.EmbedBuilder()
            .setColor(0x00aaff)
            .setTitle('Color.io Help Center')
            .setThumbnail(index_1.iconURL)
            .setDescription('Color.io has many commands. Here are a list of categories for more detailed help:')
            .addFields({
            name: '**Palettes** - get color palettes or generate them from an image',
            value: '\`/help palette\`', inline: true
        }, {
            name: '**Viewer** - view colors from RGB, hex, or HSV color coes',
            value: '\`/help view\`', inline: true
        }, {
            name: '**Converter** - convert colors from one format to the next',
            value: '\`/help converter\`', inline: true
        })
            .addFields({
            name: '** ** ** ** \n Having technical difficulties or need assistance?',
            value: 'Join the developer\'s Discord server: https://discord.gg/MnGWM2s', inline: false
        })
            .setTimestamp()
            .setFooter({ text: 'Color.io © 2023' });
    }
    yield interaction.reply({
        embeds: [helpEmbed]
    });
});
exports.HelpCommandAction = HelpCommandAction;
