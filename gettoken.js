const urltoken = 'https://id.twitch.tv/oauth2/token';
const axios = require('axios').default;
const config = require('./config.json');
const {client_id, client_secret} = config;
var bearer_token;

function getToken(){
    axios.post(urltoken, {
        client_id: client_id,
        client_secret:  client_secret,
        grant_type: 'client_credentials'
    }).then(function(response) {
        bearer_token = response.data.access_token;
        console.log(bearer_token);
    })
}
getToken();
