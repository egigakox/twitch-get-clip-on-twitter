const axios = require('axios').default;
const config = require('./config.json');
const T = require('twit');
const { setInterval, setTimeout } = require('timers/promises');
const schedule = require('node-schedule');
const { client_id, bearer_token, client_secret, consumer_token, consumer_token_secret, access_token, access_token_secret } = config;
var shot1;

const Twit = new T({
    consumer_key: consumer_token,
    consumer_secret: consumer_token_secret,
    access_token: access_token,
    access_token_secret: access_token_secret
});

var headers = {
    'Authorization': `Bearer ${bearer_token}`,
    'Client-Id': client_id
};

function getStreamerID(nickname) {
    axios.get(`https://api.twitch.tv/helix/users?login=${nickname}`, {
        headers: headers
    }).then(function(response) {
        var id = response.data.data[0].id;
        getClips(id);
    })
};


function getClips(streamerid) {
    axios.get(`https://api.twitch.tv/helix/clips?broadcaster_id=${streamerid}&first=1`, {
        headers: headers
    }).then(function (response2) {
        shot1 = {
            'title': response2.data.data[0].title,
            'url': response2.data.data[0].url
        }
        Twit.post('statuses/update', {status: `#randombruce ${shot1.title} \r\n ${shot1.url}`}, function (err, data, response) {
            console.log(data);
        });
    })
};
const hour = 17;
const minute = 00;
const post_clip = schedule.scheduleJob(`${minute} ${hour} * * *`, function() {
    getStreamerID('randombrucetv');
})
