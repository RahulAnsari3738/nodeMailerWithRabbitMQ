
const nodemailer = require('nodemailer')

const amqp = require('amqplib/callback_api');

class Usercontroller{

    email =async(req,res)=>{

   try{
    const{email}=req.body;

amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError;
    }

    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }

        // var data = {
        //     Response:info.response,
        //     MessageId:info.messageId
        // };
        // var newData=JSON.stringify(data)
   
        const QUEUE = 'email'
        channel.assertQueue(QUEUE);
 

        channel.sendToQueue(QUEUE, Buffer.from(`${email}`));
        console.log(`Message send ${QUEUE} QUEUE`);
        this.worker()
        return res.status(200).json({message:"send", success:true})
       
     
    })
})
    
 
    }catch(e){
       console.log(e);
       return res.status(500).json({message:e.message, success:false})
    }

    }


    worker =async (req,res)=>{
    
  try{
            amqp.connect('amqp://localhost', (connError, connection) => {
                if (connError) {
                   throw connError;
                }
          
                connection.createChannel((channelError, channel) => {
                   if (channelError) {
                       throw channelError;
                   }
               
                   const QUEUE = 'email'
                   channel.assertQueue(QUEUE);
              
                   channel.consume(QUEUE, (msg) => {
                       console.log(`Message received From Happy QUEUE: ${msg.content.toString()}`)
     
            var transporter = nodemailer.createTransport({

                service: 'gmail',
                auth: {
                    user: 'dummyseniour007@gmail.com',
                    pass: "gurmeet@21"
                }
        
                
            });
        
            var mailOption = {
                from: 'dummyseniour007@gmail.com',
                to: `${msg.content.toString()}`,
                subject: 'Sending Emil using Node.js',
                html: '<h1> hello m </h1>'
            };
        
          transporter.sendMail(mailOption,function(error,info){
              if(error){
                  console.log(error);
              }
              console.log(info.response);
              return res.status(200).json({message:info.response, success:true})
         
            })
        
                   }, {
                       noAck: true
                   })
                })
                })

            }catch(e){
                console.log(e);
                return res.status(500).json({message:e.message, success:true})
            }




        
    }

}


module.exports=new Usercontroller;