 
 const amqp=require('amqplib/callback_api')

class Userexchange{

    fanout=(req,res)=>{

        try{

            const {email}=req.body;

            amqp.connect('amqp://localhost',(error0,connection)=>{
                if (error0)throw error0

                connection.createchannel((error1,channel)=>{
                    if(error1) throw error1
                    var exchange='logs';
                    var msg='Hello World';
                    channel.assertExchange(exchange,'fanout',{
                        durable:false
                    });
                    channel.publish(exchange,'',Buffer.from(msg));
                    console.log("send ",msg);

                })
            });
  

        }catch(e){
            console.log(e);
            return res.status(500).json({message:e.message, success:true})
        }
      
    }

}


module.exports=new Userexchange();