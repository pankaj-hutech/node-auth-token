const express = require('express');
const User = require('../../Modal/User');
const authGurdToken = require('../../middleware/auth');
const router = express.Router();

router.get('/get-all-user' , authGurdToken , async (req , res) => {
    try{
      const getAllUser = await User.find()
      res.status(200).send(JSON.stringify(getAllUser))
    }catch(err){
      res.send(JSON.stringify(err)).status(400);
    }
})

module.exports = router