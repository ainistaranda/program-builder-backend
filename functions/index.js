import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import dotenv from 'dotenv/config'
import { getAllPrograms, addNewProgram } from "./src/programs.js"
import { getAllExercises, addNewExercise } from "./src/exercises.js"
import { getAllUsers, addNewUser } from "./src/users.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get('/test', (req,res) => {
  // const uri = process.env.MONGO_URI
  res.send('hi')
})

app.get('/programs', getAllPrograms)
app.post('/program', addNewProgram)

app.get('/exercises', getAllExercises)
app.post('/exercises', addNewExercise)

app.get('/users', getAllUsers)
app.post('/users', addNewUser)

export const api = functions.https.onRequest(app)
