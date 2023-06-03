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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaletteCommandAction = exports.PaletteCommand = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const convert_1 = require("./convert");
const color_1 = require("../util/color");
const draw_1 = require("../util/draw");
const goldenratio_1 = require("./generators/goldenratio");
const harmony_1 = require("./generators/harmony");
const triad_1 = require("./generators/triad");
const util_1 = require("../util/util");
const get_pixels_1 = __importDefault(require("get-pixels"));
const get_rgba_palette_1 = __importDefault(require("get-rgba-palette"));
const pastel_1 = require("./generators/pastel");
const tetradic_1 = require("./generators/tetradic");
const generators = [
    //goldenRatioGenerator,
    harmony_1.harmonyGenerator,
    //triadGenerator,
    tetradic_1.tetradicGenerator,
    //pastelGenerator
];
const generatorNames = [
    //'golden-ratio',
    'harmony',
    //'triad',
    'tetradic',
    //'pastel'
];
const generatorPairs = [
    { generator: goldenratio_1.goldenRatioGenerator, name: 'golden-ratio' },
    // {generator: harmonyGenerator, name: 'harmony'},
    { generator: triad_1.triadGenerator, name: 'triad' },
    { generator: triad_1.triadGenerator, name: 'triad' },
    { generator: tetradic_1.tetradicGenerator, name: 'tetradic' },
    { generator: tetradic_1.tetradicGenerator, name: 'tetradic' },
    { generator: tetradic_1.tetradicGenerator, name: 'tetradic' },
    { generator: pastel_1.pastelGenerator, name: 'pastel' },
];
exports.PaletteCommand = new discord_js_1.SlashCommandBuilder()
    .setName('palette')
    .setDescription('generate either a normal or image color palette')
    .addSubcommand(subcommand => subcommand
    .setName('normal')
    .setDescription('generate a unique color palette')
    .addStringOption(option => option.setName('format')
    .setDescription('the color format of the output colors')
    .addChoices(...convert_1.colorChoices)
    .setRequired(true))
    .addIntegerOption(option => option.setName('number-of-colors')
    .setDescription('the number of colors to generate (max 16)')
    .setRequired(false)))
    .addSubcommand(subcommand => subcommand
    .setName('image')
    .setDescription('generate a color palette from an image')
    .addStringOption(option => option.setName('format')
    .setDescription('the color format of the output colors')
    .addChoices(...convert_1.colorChoices)
    .setRequired(true))
    .addStringOption(option => option.setName('url')
    .setDescription('A url ending in .jpg or .png for an image color palette')
    .setRequired(true))
    .addIntegerOption(option => option.setName('number-of-colors')
    .setDescription('the number of colors to generate (max 16)')
    .setRequired(false)));
const PaletteCommandAction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    //const category = interaction.options.get('category')?.value as ('normal' | 'image');
    var _a, _b, _c, _d;
    const options = interaction.options;
    const category = options.getSubcommand() === 'normal' ? 'normal' : 'image';
    const type = (_a = options.get('format')) === null || _a === void 0 ? void 0 : _a.value;
    const typeCaps = type.toUpperCase();
    const rawNumColors = ((_b = options.get('number-of-colors')) === null || _b === void 0 ? void 0 : _b.value) || 6;
    const numColors = Math.floor(rawNumColors);
    const imageUrl = (_c = options.get('url')) === null || _c === void 0 ? void 0 : _c.value;
    if (numColors <= 0 || numColors > 16) {
        const errorEmbed = new discord_js_1.EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('Command Error: Palette')
            .setDescription(`Error: invalid number of colors, valid range is 1 to 16
                **Check \`/help palette\` for more info** `)
            .setTimestamp()
            .setFooter({ text: 'Color.io © 2023' });
        interaction.reply({ embeds: [errorEmbed] });
        return;
    }
    if (category === 'normal') {
        const randomIndex = (0, util_1.randomInt)(0, generatorPairs.length - 1);
        const colors = generatorPairs[randomIndex].generator(numColors);
        const imageData = yield draw_1.Drawer.squares(colors);
        const imageAttachment = new discord_js_1.AttachmentBuilder(imageData);
        const highlightColor = colors[colors.length - 1].getInt();
        const viewEmbed = new discord_js_1.EmbedBuilder()
            .setColor(highlightColor)
            .setThumbnail(index_1.iconURL)
            .setTitle(`Generated Color Palette (${type} ${numColors} ${generatorPairs[randomIndex].name}):`)
            .setDescription(`${colors.map(color => color_1.Color.toFormatString(color, type, false)).join('   ')}
                ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                ** ** ** **
                \`[${colors.map(color => color_1.Color.toFormatString(color, type, true)).join(', ')}]\``)
            .setTimestamp()
            .setFooter({ text: 'Color.io © 2023' });
        yield interaction.reply({ embeds: [viewEmbed] })
            .catch(() => { });
        (_d = interaction.channel) === null || _d === void 0 ? void 0 : _d.send({ files: [imageAttachment] }).catch(() => { });
    }
    else {
        const onBadUrl = () => {
            const errorEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0xff0000)
                .setTitle('Command Error: Palette')
                .setDescription(`Error: The supplied image url "${imageUrl || ' '}" is missing or invalid. Double check that your url starts with \`https://\` and ends with \`.png\` or \`.jpg\`?
                    **Check \`/help palette\` for more info** `)
                .setTimestamp()
                .setFooter({ text: 'Color.io © 2023' });
            interaction.reply({ embeds: [errorEmbed] });
        };
        if (!(0, util_1.isValidHttpUrl)(imageUrl)) {
            onBadUrl();
            return;
        }
        (0, get_pixels_1.default)(imageUrl, (err, pixels) => __awaiter(void 0, void 0, void 0, function* () {
            var _e;
            if (err) {
                onBadUrl();
                return;
            }
            const rawRGBPalette = (0, get_rgba_palette_1.default)([...pixels.data], numColors);
            const colors = rawRGBPalette.map((triple) => new color_1.Color(triple, 'rgb'));
            const imageData = yield draw_1.Drawer.squares(colors);
            const imageAttachment = new discord_js_1.AttachmentBuilder(imageData);
            const highlightColor = colors[colors.length - 1].getInt();
            const viewEmbed = new discord_js_1.EmbedBuilder()
                .setColor(highlightColor)
                .setThumbnail(index_1.iconURL)
                .setTitle(`Generated Color Palette (Image ${numColors}):`)
                .setDescription(`${colors.map(color => color_1.Color.toFormatString(color, type, false)).join('   ')}
                    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                    ** ** ** **
                    \`[${colors.map(color => color_1.Color.toFormatString(color, type, true)).join(', ')}]\``)
                .setTimestamp()
                .setFooter({ text: 'Color.io © 2023' });
            yield interaction.reply({ embeds: [viewEmbed] })
                .catch(() => { });
            (_e = interaction.channel) === null || _e === void 0 ? void 0 : _e.send({ files: [imageAttachment] }).catch(() => { });
        }));
    }
});
exports.PaletteCommandAction = PaletteCommandAction;
