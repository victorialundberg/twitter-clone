const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const OpenAi = require("openai");

const openai = new OpenAi({
    apiKey: process.env.AI_API_KEY,
})





// get all tweets
router.get('/', (req, res) =>{
 req.app.locals.db.collection('tweets')
 .find()
 .toArray()
 .then(result => {
  
  let sortedResult = result.sort((a, b) => {
    return b.posted - a.posted;
  })

    res.json(sortedResult)
  })
});



// post - write new tweet
router.post('/write', async (req, res) =>{


    let tweet = {
        user: req.body.user,
        content: req.body.content,
        posted: new Date(),
        }

  req.app.locals.db.collection("tweets").insertOne(tweet)
  .then(done => {
    console.log("insert", done);
  });

  try {

    await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a mountain troll who hates people, you are grumpy and annoyed and gives short answers."
        },
        {
          role: "user",
          content: req.body.content
        }
      ]
    })
    .then(data => {
      console.log("ai-answer", data.choices[0].message.content);
      let aiTweet = {
        user: "Mountain Troll Engvar",
        content: data.choices[0].message.content,
        posted: new Date()
      }

      req.app.locals.db.collection("tweets").insertOne(aiTweet)
      .then(done => {
        res.json(tweet)
        console.log("insert", done);
      });
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({message: "somthing went wrong"});
  }

});



module.exports = router;