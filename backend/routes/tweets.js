const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;





// get all tweets
router.get('/', (req, res) =>{
 req.app.locals.db.collection('tweets')
 .find()
 .toArray()
 .then(result => {
    res.json(result)
 })
});



// post - write new tweet
router.post('/write', (req, res) =>{


    let tweet = {
        user: req.body.user,
        content: req.body.content
        }

  req.app.locals.db.collection("tweets").insertOne(tweet)
  .then(done => {
    res.json(tweet)
    console.log("insert", done);
  });
});



module.exports = router;