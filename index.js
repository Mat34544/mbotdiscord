
const botconfig = require("./botconfig.json");
const Discord = require ("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js" )
  if (jsfile.length <= 0){
    console.log("No se encontraron comandos, revisa la programación.");
    return;
  }


  jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} Iniciado!`);
  bot.commands.set(props.help.name, props);
  });

});








bot.on("ready", async () => {
  console.log(`${bot.user.username} en Linea!`);
  bot.user.setActivity("M Community");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(bot,message,args);


















//INFORMACION SERVIDOR -INFOSERVER

if(cmd === `${prefix}infoserver`){
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Información Server")
  .setColor("#00d0ff")
  .setThumbnail(sicon)
  .addField("Nombre", message.guild.name)
  .addField("Creado En", message.guild.createdAt)
  .addField("Te uniste", message.member.joinedAt)
  .addField("Miembros en total", message.guild.memberCount)



  return message.channel.send(serverembed);
}






});


















bot.login(botconfig.token);
