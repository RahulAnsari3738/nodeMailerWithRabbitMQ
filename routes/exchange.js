const express=require('express')
const app=express();
const router=express.Router();

const userExchange=require('../controller/userExchange')



router.post('/fanout',userExchange.fanout)

module.exports=router;