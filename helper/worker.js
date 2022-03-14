

// const amqp = require('amqplib/callback_api');

// amqp.connect('amqp://localhost', (connError, connection) => {
//     if (connError) {
//         throw connError;
//     }
  
//     connection.createChannel((channelError, channel) => {
//         if (channelError) {
//             throw channelError;
//         }
     
//         const QUEUE = 'Happy'
//         channel.assertQueue(QUEUE);
     
//         channel.consume(QUEUE, (msg) => {
//             console.log(`Message received From Happy QUEUE: ${msg.content.toString()}`)

          

//         }, {
//             noAck: true
//         })
//     })
// })



