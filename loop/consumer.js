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

const consumer = kafka.consumer({ groupId: 'demo-group3' })

const main = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'demo-topic', fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
        value: message.value.toString(),
        })
        console.log("send log to azure 2")
    },
    })
    console.log("send log to azure")
}

main().catch( error => {
    console.error(error)
})

