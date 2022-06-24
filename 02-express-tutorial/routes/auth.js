//3-define router and change all 'app' to 'router', change url to '/' or '/'url''
//4-module export = router

const express = require('express')
const router = express.Router();

router.post('/',(req,res)=>{
    const {name} = req.body;
    if(!name){
        res.status(401).send('Please Provide Credentials')
    }
    res.status(200).send(`Welcome ${name}`)
})

module.exports = router;
