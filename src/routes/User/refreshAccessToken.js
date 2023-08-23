const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken')

router.post("/refreshAccessToken" , async (req , res) => {
    try{    
        const {refershToken} = req.body;
        res.send(await verifyToken(refershToken))
    }catch(err){
        res.send(JSON.stringify(err));
    }
})

module.exports = router;