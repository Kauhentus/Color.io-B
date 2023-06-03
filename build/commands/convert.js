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
exports.ConvertCommandAction = exports.ConvertCommand = exports.colorChoices = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const color_1 = require("../util/color");
exports.colorChoices = [
    { name: 'hex', value: 'hex' },
    { name: 'rgb', value: 'rgb' },
    { name: 'hsl', value: 'hsl' },
];
exports.ConvertCommand = new discord_js_1.SlashCommandBuilder()
    .setName('convert')
    .setDescription('convert between different color formats')
    .addStringOption(option => option.setName('from-format')
    .setDescription('the color format of your input colors')
    .addChoices(...exports.colorChoices)
    .setRequired(true))
    .addStringOption(option => option.setName('to-format')
    .setDescription('your desired output color format')
    .addChoices(...exports.colorChoices)
    .setRequired(true))
    .addStringOption(option => option.setName('input-colors')
    .setDescription('your input colors formatted according to `/help colorformat`')
    .setRequired(true));
const ConvertCommandAction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const fromType = interaction.options.data[0].value;
    const fromTypeCaps = fromType.toUpperCase();
    const toType = interaction.options.data[1].value;
    const toTypeCaps = toType.toUpperCase();
    const inputString = interaction.options.data[2].value;
    color_1.Color.parseColorString(inputString, fromType)
        .then(colors => {
        const receivedEmbed = new discord_js_1.EmbedBuilder()
            .setColor(colors[colors.length - 1].getInt())
            .setTitle(`Received ${fromTypeCaps} colors:`)
            .setDescription(`${colors.map(color => color_1.Color.toFormatString(color, fromType, false)).join('   ')}`);
        const responseEmbed = new discord_js_1.EmbedBuilder()
            .setColor(colors[colors.length - 1].getInt())
            .setTitle(`Converted color types to ${toTypeCaps}:`)
            .setThumbnail(index_1.iconURL)
            .setDescription(`**${toTypeCaps}**: ${colors.map(color => color_1.Color.toFormatString(color, toType, false)).join('   ')}
                    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                    ** ** ** **
                    **${toTypeCaps}**:\`[${colors.map(color => color_1.Color.toFormatString(color, toType, true)).join(', ')}]\``)
            .setTimestamp()
            .setFooter({ text: 'Color.io © 2023' });
        interaction.reply({ embeds: [receivedEmbed, responseEmbed] })
            .catch(() => { });
    })
        .catch(err => {
        const errorEmbed = new discord_js_1.EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('Command Error: Convert')
            .setDescription(`Error: ${err}
                    **Check \`/help convert\` and \`/help colorformat\` for more info** `)
            .setTimestamp()
            .setFooter({ text: 'Color.io © 2023' });
        interaction.reply({ embeds: [errorEmbed] })
            .catch(() => { });
    });
});
exports.ConvertCommandAction = ConvertCommandAction;
