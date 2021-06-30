const { Kafka } = require('kafkajs')
const config = require('./config.json');

const kafka = new Kafka({
    clientId: 'kik-test-app2',
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
        await producer.send({
            topic: 'demo-topic',
            messages: [
                { value: message },
            ],
        })

        await producer.disconnect()
    }
}

main().catch(error => {
    console.error(error)
})