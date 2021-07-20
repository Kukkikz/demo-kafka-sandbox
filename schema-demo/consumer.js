const { Kafka } = require('kafkajs')
const { SchemaRegistry, SchemaType } = require('@kafkajs/confluent-schema-registry')
const config = require('../config.json');

const registry = new SchemaRegistry({
    host: config.schemaRegistry.host,
    auth: {
        username: config.schemaRegistry.username,
        password: config.schemaRegistry.password,
    },
})



const kafka = new Kafka({
    clientId: config.clientConfig.clientId,
    brokers: config.kafka.brokers,
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: config.kafka.username,
        password: config.kafka.password
    }
})

const consumer = kafka.consumer({ groupId: config.clientConfig.groupId })

const main = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: config.clientConfig.topic, fromBeginning: true })


    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                console.log({
                    value: await registry.decode(message.value),
                })
            } catch {
                console.log('error');
            }
            
        },
    })
}

main().catch(error => {
    console.error(error)
})

