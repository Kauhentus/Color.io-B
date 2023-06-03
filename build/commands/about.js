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
exports.AboutCommandAction = exports.AboutCommand = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
exports.AboutCommand = new discord_js_1.SlashCommandBuilder()
    .setName('about')
    .setDescription('Meta information about Color.io');
const AboutCommandAction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    let helpEmbed = new discord_js_1.EmbedBuilder()
        .setColor(0x00aaff)
        .setTitle('About Color.io')
        .setThumbnail(index_1.iconURL)
        .setDescription(`A multi-functional bot centered around color utility tools.
            Convert colors, generate palettes, view colors, and more. 
            See \`c!help\` to get started.
            ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
            ** ** ** **
            If you have any issues or questions, contact the developer here: https://discord.gg/MnGWM2s`)
        .setTimestamp()
        .setFooter({ text: 'Color.io © 2023' });
    yield interaction.reply({ embeds: [helpEmbed] })
        .catch(() => { });
    ;
});
exports.AboutCommandAction = AboutCommandAction;
