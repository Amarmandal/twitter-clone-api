require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
const Twitter = require('./api/helpers/twitter');
const TweetList = require('./api/helpers/tweetList');
const User = require('./api/helpers/Users')
const twitterHelper = new Twitter();
const tweetListHelper = new TweetList();
const userHelper = new User();


app.get('/tweets', (req, res) => {
    const url = 'https://api.twitter.com/2/tweets/search/recent';
    const {query, max_results } = req.query;
    twitterHelper.get(query, max_results,url)
        .then(response => {
            const {data} = response;
            return res.status(200).json(data);
        }).catch(err => {
            console.log(err);
            return res.status(400).json('Error fetching the api');
        })
})

app.post('/buildtweet', (req, res) => {
    const url = `https://api.twitter.com/2/tweets?ids=${req.body}`;
    const {expansions} = req.query;
    const mediaFields = req.query['media.fields'];
    const tweetFields = req.query["tweet.fields"];
    
    tweetListHelper.get(url, expansions, mediaFields, tweetFields)
        .then(response => {
            const {data} = response;
            return res.status(200).json(data);
        }).catch(err => {
            console.log(err);
            return res.status(400).json('Error fetching the api');
        })
})

app.post('/getusers', (req, res) => {
    const url = `https://api.twitter.com/2/users?ids=${req.body}`;
    const userFields = req.query["user.fields"];
    
    userHelper.get(url, userFields)
        .then(response => {
            const {data} = response;
            return res.status(200).json(data);
        }).catch(err => {
            console.log(err);
            return res.status(400).json('Error fetching the api');
        })
})

app.get('/nextpage', (req, res) => {
    const url = `https://api.twitter.com/2/tweets/search/recent`;
    const {query, max_results, next_token } = req.query;
    twitterHelper.getNextPage(query, max_results, next_token, url)
        .then(response => {
            const {data} = response;
            return res.status(200).json(data);
        }).catch(err => {
            console.log(err);
            return res.status(400).json('Error fetching the api');
        })
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
})
