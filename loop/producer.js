const { Kafka } = require('kafkajs')
const config = require('../config.json');

const kafka = new Kafka({
    clientId: 'kik-test-app',
    brokers: config.kafka.brokers,
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: config.kafka.username,
        password: config.kafka.password
    }
})

const producer = kafka.producer()

const main = async () => {
    const message = process.argv[2];
    if (typeof (message) === 'undefined') {
        console.log('Message not found')
    } else {
        await producer.connect()

        let count = 0;
        
        while(true) {
            let msg = message + " " + count
            await producer.send({
                topic: 'demo-topic',
                messages: [
                    { value: msg }
                ],
            })
            console.log("data sent", count)
            await sleep(5000)
            count++
        }
        

        await producer.disconnect()
        
    }
}

const sleep = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

main().catch(error => {
    console.error(error)
})