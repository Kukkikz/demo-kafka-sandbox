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
    clientId: config.clientConfig.producerId,
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
    const schema = await registry.getSchema(100002);
    const payload = {
        Name: 'John',
        Age: 25
    };

    if (schema.isValid(payload)) {
        await producer.connect();
        await producer.send({
            topic: config.clientConfig.topic,
            messages: [
                { value: await registry.encode(100002, payload) },
            ],
        })

        await producer.disconnect()
    } else {
        console.log('Payload is not valid');
    }





}

main().catch(error => {
    // console.error(error)
})