const { Kafka, ConfigResourceTypes } = require('kafkajs')
const config = require('./config.json');

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

//Use KafkaJS Admin Client https://kafka.js.org/docs/admin

const admin = kafka.admin()

const main = async () => {
    await admin.connect()

    //List of topics
    console.log("============List of topics==============")
    const topics = await admin.listTopics()
    console.log(topics)

    //Topic metadata
    console.log("============Topic metadata==============")
    const topicMetadata = await admin.fetchTopicMetadata({ topics: ["demo-customer-data"] })
    console.log(topicMetadata.topics[0].partitions)

    //Topic configs
    console.log("============Topic configs==============")
    const topicConfig = await admin.describeConfigs({
        includeSynonyms: false,
        resources: [
          {
            type: ConfigResourceTypes.TOPIC,
            name: 'demo-customer-data'
          }
        ]
      })
    console.log(topicConfig)
    console.log(topicConfig.resources[0].configEntries)

    //Topic Offset
    console.log("============Topic Offset==============")
    const topicOffset = await admin.fetchTopicOffsets("demo-customer-data")
    console.log(topicOffset)

    //List Group
    console.log("============List Group==============")
    const groups = await admin.listGroups()
    console.log(groups)

    //Group Details
    console.log("============Group Details==============")
    const groupDetails = await admin.describeGroups([ 'demo-schema-group' ])
    console.log(groupDetails)

    //Consumer Group Offset
    console.log("============Consumer Group Offset==============")
    const consumerGroupOffset = await admin.fetchOffsets({ 
        groupId: "demo-schema-group", 
        topic: "demo-customer-data" });
    
    console.log(consumerGroupOffset)
    
    
    await admin.disconnect()
}

main().catch( error => {
    console.error(error)
})