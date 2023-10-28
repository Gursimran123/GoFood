const express = require("express");
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.fooditems,global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router