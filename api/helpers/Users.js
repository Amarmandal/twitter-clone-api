const axios = require('axios');

class User {
    get(url, userField) {
        return axios.get(url, {
            params: {
                "user.fields": userField,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TWITTER_API_TOKEN}`,
            
            }
        });
}}

module.exports = User;


