const https = require('https');

function checkTwitchStreams(streamers, channel, liveStatus) {
    streamers.forEach((name) => {
      https.get(`https://api.twitch.tv/kraken/streams/${name}?client_id=${auth.twitch_clientId}`, res => {
        let body = '';
        res
          .on('data', chunk => body += chunk)
          .on('end', () => {
            let result = JSON.parse(body)
            if(result.stream !== null) {
              if(liveStatus[name] == 0) {
                const embed = new Discord.RichEmbed()
                  .setTitle("O streamer " + result.stream.channel.display_name + " acabou de entrar em direto na Twitch!")
                  .setDescription("Acompanha já a transmissão em direto!")
                  .setThumbnail(result.stream.preview.small)
                  .addField("Título", result.stream.channel.status, true)
                  .addField("Viewers: ", result.stream.viewers, true)
                  .setURL("https://www.twitch.tv/" + result.stream.channel.display_name)
                  .setColor("#6034b1")
                  .setFooter('João Rodrigues © 2018');
                channel.send({ embed });
                liveStatus[name] = 1;
              } else {
                //todo: remove message if user sets offline
              }
            }
          });
      })
        .on('error', e => console.log("Erro: ", e.message));
    });
  }

  module.exports.checkTwitchStreams = checkTwitchStreams;