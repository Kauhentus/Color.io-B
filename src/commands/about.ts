import { CacheType, EmbedBuilder, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { iconURL } from "../index";

export const AboutCommand = new SlashCommandBuilder()
.setName('about')
.setDescription('Meta information about Color.io');


export const AboutCommandAction = async (interaction : CommandInteraction<CacheType>) => {
    let helpEmbed = new EmbedBuilder()
        .setColor(0x00aaff)
        .setTitle('About Color.io')
        .setThumbnail(iconURL)
        .setDescription(
            `A multi-functional bot centered around color utility tools.
            Convert colors, generate palettes, view colors, and more. 
            See \`c!help\` to get started.
            ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
            ** ** ** **
            If you have any issues or questions, contact the developer here: https://discord.gg/MnGWM2s`)
        .setTimestamp()
        .setFooter({text: 'Color.io © 2023'});
    
    await interaction.reply({
        embeds: [helpEmbed]
    });
}