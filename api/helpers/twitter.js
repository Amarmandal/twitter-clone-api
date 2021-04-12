const axios = require('axios');

class Twitter {
    get(query, max_results,url) {
        return axios.get(url, {
            params: {
                query: query,
                max_results: max_results,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TWITTER_API_TOKEN}`,
            
            }
        });
    }

    getNextPage(query, maxResult, nextPage, url) {
        return axios.get(url, {
            params: {
                query: query,
                max_results: maxResult,
                next_token: nextPage
            },
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.TWITTER_API_TOKEN}`,
            
            }
        });
    }
}   

module.exports = Twitter;


