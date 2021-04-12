const axios = require('axios');

class TweetList {
    get(url, expand, medias, tweetField) {
        return axios.get(url, {
            params: {
                expansions: expand,
                "media.fields": medias,
                "tweet.fields": tweetField,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TWITTER_API_TOKEN}`,
            
            }
        });
}}

module.exports = TweetList;


