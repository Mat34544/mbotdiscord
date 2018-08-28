const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

//-tempmute @user 1s/1m/h/d/y

let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!tomute) return message.reply("No se encontro al usuario");
if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("No se puede mutear!");
let muterole = message.guild.find(R => R.name === "muted");
//Creacion rol
if(!muterole){
            try{
              muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
              })
              message.guild.channel.forEach(async (channel, id) => {
                              await channel.overwritepermissions(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                              })
                            })
  }catch(e){
   console.log(e.stack);
  }
 }
 //Creacion role termina
let mutetime = args[1]
if (!mutetime) return message.reply("No especificaste un tiempo de muteo!")

await(tomute.addRole(muterole.id));
message.reply(`<@>${tomute.id}> Ha sido muteado por ${ms(ms(mutetime))}`)

setTimeput(function(){
  tomute.removeRole(muterole.id)
  message.channel.send(`<@${tomute.id}> Ha sido desmuteado`)
}, (10000));

}




module.exports.help = {
  name:"tempmute"
}
