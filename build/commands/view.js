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
exports.ViewCommandAction = exports.ViewCommand = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const convert_1 = require("./convert");
const color_1 = require("../util/color");
const draw_1 = require("../util/draw");
exports.ViewCommand = new discord_js_1.SlashCommandBuilder()
    .setName('view')
    .setDescription('view color swatches from rgb, hex, or hsl color codes')
    .addStringOption(option => option.setName('format')
    .setDescription('the color format of your input colors')
    .addChoices(...convert_1.colorChoices)
    .setRequired(true))
    .addStringOption(option => option.setName('input-colors')
    .setDescription('your input colors formatted according to `/help colorformat`')
    .setRequired(true));
const ViewCommandAction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const type = interaction.options.data[0].value;
    const inputString = interaction.options.data[1].value;
    color_1.Color.parseColorString(inputString, type)
        .then((colors) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const viewEmbed = new discord_js_1.EmbedBuilder()
            .setColor(0x00aaff)
            .setThumbnail(index_1.iconURL)
            .setTitle(`Viewing ${colors.length} colors (${type}):`)
            .setDescription(`${colors.map((color) => color_1.Color.toFormatString(color, type, false)).join('   ')}
                    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                    ** ** ** **
                    \`[${colors.map((color) => color_1.Color.toFormatString(color, type, true)).join(', ')}]\``)
            .setTimestamp()
            .setFooter({ text: 'Color.io © 2023' });
        const imageData = yield draw_1.Drawer.squares(colors);
        const imageAttachment = new discord_js_1.AttachmentBuilder(imageData);
        yield interaction.reply({ embeds: [viewEmbed] });
        (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({ files: [imageAttachment] });
    }))
        .catch(err => {
        const errorEmbed = new discord_js_1.EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('Command Error: View')
            .setDescription(`Error: ${err}
                    **Check \`/help view\` and \`/help colorformat\` for more info** `)
            .setTimestamp()
            .setFooter({ text: 'Color.io © 2023' });
        interaction.reply({
            embeds: [errorEmbed]
        });
    });
});
exports.ViewCommandAction = ViewCommandAction;
