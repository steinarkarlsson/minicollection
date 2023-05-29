// @ts-nocheck
import { MongoClient } from 'mongodb'
const uri = `mongodb+srv://${encodeURIComponent(process.env.MONGO_DB_USERNAME)}:${encodeURIComponent(process.env.MONGO_DB_PASSWORD)}@minicollection.k8jydig.mongodb.net/figures.figures?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

export default async function connectToDatabase() {
    await client.connect()
    return client.db('minicollection')
}