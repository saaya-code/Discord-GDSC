const {Client, Intents} = require("discord.js");
const Discord = require("discord.js")

const axios = require("axios")
//require("dotenv").config();

const client = new Client({intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES]});


client.on("ready",()=>{
console.log("Single and ready to mingle hehe")
        
})

client.on("messageCreate",async (msg)=>{
  try {
    

  if(msg.content == "ping"){
    msg.reply("pong!")
  }
  if(msg.content.startsWith("gif")){
    let searchingFor = msg.content.split(" ").splice(1).join(" ") || "Hello!"
    let link = `https://api.tenor.com/v1/search?q=${word}&key=${process.env.TENOR}&contentfilter=high`
    let response = await axios(link)
    let result = response.data.results[Math.floor(Math.random()*response.data.results.length)]
    msg.reply(result.url)
      }

  if(msg.content.startsWith("weather")){
    const searchingFor = msg.content.split(" ").splice(1).join(" ") || "sousse"
    const color = msg.member.displayHexColor;
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${searchingFor}&appid=${process.env.WEATHER}`
        console.log(searchingFor)
    const response = await axios(link)
    const json = response.data
 const embed = new Discord.MessageEmbed()
     .setTitle(`Weather now in ${searchingFor}`)
     .setColor(color)
     .addField('Weather', json.weather[0].main)
     .addField('Description', json.weather[0].description)
     .addField('Temperature', json.main.temp - 273.15 +'°C')
     .addField('Feels like',Math.floor(json.main.feels_like - 273.15) +'°C')
     .addField('Humidity in the air',json.main.humidity + '%')
     .addField('Pressure', json.main.pressure+ ' (Pa)')
     .setThumbnail(`http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
     .addField('Wind speeed',json.wind.speed +' m/s')
     
    msg.channel.send({embeds: [embed]})
  }
      } catch (error) {
       console.error(error)
       msg.react("❌") 
  }
  
})



client.login(process.env.TOKEN)
