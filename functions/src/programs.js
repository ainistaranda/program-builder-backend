import { dbConnect } from "./mongoConnect.js";
import { ObjectId } from "mongodb";

export async function getAllPrograms(req, res) {
  const db = dbConnect();
  const collection = await db.collection("program").find().toArray();
  res.send(collection);
}

export async function addNewProgram(req, res) {
  const newProgram = req.body;
  const db = dbConnect();
  await db
    .collection("program")
    .insertOne(newProgram)
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
  getAllPrograms(req, res);
}

export async function getOneProgram(req, res) {
  const db = dbConnect();
  const { programId } = req.params;
  const collection = await db
    .collection("program")
    .find({ _id: new ObjectId(programId) })
    .toArray();
  res.send(collection);
}
