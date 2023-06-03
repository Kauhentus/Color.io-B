"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorEmbed = void 0;
const discord_js_1 = require("discord.js");
const createErrorEmbed = (title, description) => {
    const errorEmbed = new discord_js_1.EmbedBuilder()
        .setColor(0xff0000)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()
        .setFooter({ text: 'Color.io © 2023' });
    return errorEmbed;
};
exports.createErrorEmbed = createErrorEmbed;
