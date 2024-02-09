const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const OpenAI = require('openai');


/* experiment AI */
/**
 * En Klass kommer med variabler och metoder. Ur en klass skapas ett object
 * res.json standard i post är att skicka med det nnya objectet som skapats
 */



const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY,
})


// get all tweets
router.get('/', (req, res) =>{
 req.app.locals.db.collection('tweets')
 .find()
 .toArray()
 .then(result => {

  let sortedResult = result.sort(( a,b) => {
    return b.created - a.created;
  })
  console.log('sorterat:', sortedResult)
    res.json(sortedResult)
 })
});



// post - write new tweet
router.post('/write', async (req, res) =>{

  let tweet = {
    created: new Date(),
    user: req.body.user,
    content: req.body.content
    }

req.app.locals.db.collection("tweets").insertOne(tweet)
.then(done => {
console.log("insert", done);
});

  try {

    await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {role: "system", content: "Du är en ballerina som dansar på sina små tår. Du gillar bakelser och tyllkjolar"},
          {role: "user", content: req.body.content}
        ]
    })
    .then( data => {
      let aiTweet = {
        created: new Date(),
        user: 'Ballerinan',
        content: data.choices[0].message.content
        }

      req.app.locals.db.collection("tweets")
      .insertOne(aiTweet)
      .then(done => {
      

      res.json(tweet)
      console.log("insert", done);
      });
      
    })


  } catch (error) {
    console.log('error', error);
    res.status(500).json({message: "Something went wrong"})

  }


});



module.exports = router;