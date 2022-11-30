import { MongoClient } from "mongodb"
// import { uri } from "./credentials.js"
import 'dotenv/config'

export function dbConnect() {
  const client = new MongoClient(process.env.MONGO_URI)
  return client.db("programs");
}