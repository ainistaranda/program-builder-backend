import { dbConnect } from "./mongoConnect.js";


export async function addNewUser(req, res) {
  const newUser = req.body;
  const db = dbConnect();
  await db
    .collection("users")
    .insertOne(newUser)
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
  getAllUsers(req, res);
}

export async function getAllUsers(req, res) {
  const db = dbConnect();
  const collection = await db.collection("users").find().toArray();
  res.send(collection);
}