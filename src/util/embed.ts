import { EmbedBuilder } from "discord.js";

export const createErrorEmbed = (title : string, description: string) => {
    const errorEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()
        .setFooter({text: 'Color.io © 2023'});
    return errorEmbed;
}