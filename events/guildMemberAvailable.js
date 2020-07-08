const request = require('request');

module.exports = (client, member) => {
  if (member.user.bot) return;
  request({
    url: 'https://api.pushbullet.com/v2/pushes',
    method:'POST',
    headers: {
      'Access-Token': client.config.PUSHAPIKEY,
      'Content-Type': 'application/json'
    },
    json: true,
    body: {
      url: 'https://juanbot.juanto3.me',
      title: member.user.username + ' went online',
      type: 'link',
      channel_tag: 'juanbot'
    }
  });
};
