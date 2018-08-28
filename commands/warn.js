const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));


module.exports.run = async (bot, message, args) => {
  //!warn @usuario razon

  if(!message.memeber.hasPermission("MANAGE_MEMBERS")) return message.reply("No tienes permisos!");
  let wUser = message.mentions.users.first();
  if(wUser) return message.reply("No se encontro al Usuario!");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Buena Esa!");
  let reason = args.slice(1).join(" ") || "No reason";

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;
  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#e26d00")
  .addField("Usuario con Warn", wUser.tag)
  .addField("Warn en", message.channel)
  .addField("Numero de warns", warns[wUser.id].warns)
  .addField("Razón", reason);

  let reporteschannel = message.guild.channels.find(c => c.name === "reportes");
  if(!reporteschannel) return message.channel.send("No se encontro canal de reportes")

  warnchannel.send(warnembed);

  if(warns[wUser.id].warns === 2){
    let muterole = message.guild.roles.find(`name`, "muted")
    if (!muterole) return message.reply("Se debee crear el rol muted!");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(" Ha sido muteado temporalmente!, cuidado.`");

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.channel.send (`${wUser.tag} Ha sido desmuteado!`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns === 3){
    message.guild.member(wUser).ban(reason);
    message.channel.send(`${wUser.id} Ha sido baneado!`)

  }




}





module.exports.help = {
  name: "warn"
}
