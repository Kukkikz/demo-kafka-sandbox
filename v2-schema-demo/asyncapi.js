const parser = require('@asyncapi/parser')
const avroSchemaParser = require('@asyncapi/avro-schema-parser')

const main = async () => {
    parser.registerSchemaParser(avroSchemaParser);

    const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload: '{"type":"record","name":"DemoCustomerData","namespace":"com.mycorp.mynamespace","doc":"Sample schema to help you get started.","fields":[{"name":"eventType","type":"string"},{"name":"data","type":{"type":"record","name":"customerDetail","fields":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"companyName","type":"string"},{"name":"email","type":"string"},{"name":"region","type":"string","default":"NA"}]}}]}'
`

    const result = await parser.parse(asyncapiWithAvro)
    // console.log(JSON.stringify(result.json()))
    console.log(result)
}

main().catch(error => {
    console.error(error)
})
