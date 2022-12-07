import { dbConnect } from "./mongoConnect.js";
import { ObjectId } from "mongodb";

export async function addNewUser(req, res) {
  const newUser = req.body;

  const db = dbConnect();
  const collection = await db.collection("program").find().toArray();

  collection.forEach((program) => {
    newUser[program.day] = program.movements;
  });
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

export async function getOneUser(req, res) {
  const db = dbConnect();
  const { userId } = req.params;
  const collection = await db
    .collection("users")
    .find({ _id: new ObjectId(userId) })
    .toArray();
  res.send(collection);
}

export async function updateUser(req, res) {
  const db = dbConnect();
  const { userId } = req.params;
  await db
    .collection("users")
    .findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: req.body })
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
  res.status(202).send({ message: "user updated" });
}

export async function userLogin(req, res) {
  const db = dbConnect();
  const { email, password } = req.body;


  const matchingUsers = await db
    .collection("users")
    .find({ email })
    .toArray();

  if (!matchingUsers.length) {
    res.status(401).send({ message: "invalid email or password" });
    return;
  }
  if (password === matchingUsers[0].password) {
    res.send(matchingUsers);
  } else {
    res.status(401).send({ message: "invalid email or password" });
    return;
  }
}
