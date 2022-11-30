import { dbConnect } from "./mongoConnect.js";
import { ObjectId } from "mongodb";

export async function addNewExercise(req, res) {
  const newExercise = req.body;
  const db = dbConnect();
  await db
    .collection("exercises")
    .insertOne(newExercise)
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
  getAllExercises(req, res);
}

export async function getAllExercises(req, res) {
  const db = dbConnect();
  const collection = await db.collection("exercises").find().toArray();
  res.send(collection);
}