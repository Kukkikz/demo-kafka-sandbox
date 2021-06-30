# demo-kafka-sandbox

This demo show how consumer and producer application connect to Kafka (Confluent Cloud) by Node JS. This code using [KafkaJS](https://kafka.js.org/docs/getting-started).

## How to run

You need to add file `config.json` in the root folder and use configuration below.

```
{
    "kafka": {
        "brokers": ["<your-broker-URL-with-port>"],
        "username": "<Kafka-API-key>",
        "password": "<Kafka-API-secret>"
    },
    "schemaRegistry": {
        "host": "<your-schema-registry-URL>",
        "username": "<schema-registry-API-key>",
        "password": "<schema-registry-API-secret>"
    }
}
```

Run `npm install` to install dependency.

Topics, app-id, consumer-group are in the source code, please update it.

Run `node <file-name>`. If you run producer.js, please add message you would like to send. For example `node .\producer.js "Hello World."`
