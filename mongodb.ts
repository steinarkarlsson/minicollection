import { MongoClient } from 'mongodb'
import { parse } from 'mongodb-uri'

const uri = process.env.MONGODB_URI
const parsedUri = parse(uri)
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

async function connect() {
    if (!client.isConnected()) {
        await client.connect()
    }
    return client.db(parsedUri.database)
}

export default connect
