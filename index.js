require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
require("./keepalive");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);

  const channelId = process.env.VOICE_CHANNEL;
  const channel = client.channels.cache.get(channelId);

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: true
  });

  console.log("Bot joined the voice channel!");
});

client.login(process.env.TOKEN);
