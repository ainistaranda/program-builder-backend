import { dbConnect } from "./mongoConnect.js";
import { ObjectId } from "mongodb";

export async function addNewUser(req, res) {
  const newUser = req.body;

  const db = dbConnect();
  const programCollection = await db.collection("program").find().toArray();
  newUser.days=programCollection

  // programCollection.forEach((program) => {
  //     newUser.days =[{"day": 1, movements: program.movements}, {"day": 2, movements: program.movements},
  //     {"day": 3, movements: program.movements}];
  // });

  // newUser.days =  [
  //   {
  //     "day": "1",
  //     "movements": [
  //       {
  //         "movement": "Squat Variation",
  //         "exercise": [
  //           {
  //             "name": "Back Squat",
  //             "sets": "3",
  //             "reps": "5",
  //             "weight": "11111",
  //             "rpe": "8"
  //           },
  //           {
  //             "name": "Front Squat",
  //             "sets": "3",
  //             "reps": "5t",
  //             "weight": "",
  //             "rpe": "8"
  //           },
  //           {
  //             "name": "Goblet Squat",
  //             "sets": "3",
  //             "reps": "5y",
  //             "weight": "",
  //             "rpe": "8"
  //           }
  //         ]
  //       },
  //       {
  //         "movement": "Deadlift Variation",
  //         "exercise": [
  //           {
  //             "name": "Conventional Deadlift",
  //             "sets": "3",
  //             "reps": "5",
  //             "weight": "2222",
  //             "rpe": "8"
  //           },
  //           {
  //             "name": "Romanian Deadlift",
  //             "sets": "3",
  //             "reps": "5",
  //             "weight": "",
  //             "rpe": "8"
  //           },
  //           {
  //             "name": "Good Mornings",
  //             "sets": "3",
  //             "reps": "5",
  //             "weight": "",
  //             "rpe": "8"
  //           }
  //         ]
  //       },
  //       {
  //         "movement": "Single Leg Variation",
  //         "exercise": [
  //           {
  //             "name": "Bulgarian Split Squat",
  //             "sets": "3",
  //             "reps": "5",
  //             "weight": "",
  //             "rpe": "8"
  //           },
  //           {
  //             "name": "Lunges",
  //             "sets": "3",
  //             "reps": "5",
  //             "weight": "",
  //             "rpe": "8"
  //           },
  //           {
  //             "name": "Step Ups",
  //             "sets": "3",
  //             "reps": "5",
  //             "weight": "",
  //             "rpe": "8"
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]
  
  await db
    .collection("users")
    .insertOne(newUser)
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
  // getAllUsers(req, res);
  const matchingUsers = await db
    .collection("users")
    .find({ email: newUser.email, password: newUser.password })
    .toArray();
    
  delete matchingUsers[0].password;

  res.send(matchingUsers[0]);
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
  // const collection = await db
  //   .collection("users")
  //   .find({ _id: new ObjectId(userId) })
  //   .toArray();
  let body = req.body
  delete body._id 
  await db
    .collection("users")
    .findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: req.body })
    .catch((err) => {
      // res.status(500).send(err);
      // return;
      console.error(err)
    });
  res.status(202).send({ message: "user updated" })
}

export async function userLogin(req, res) {
  const db = dbConnect();
  const { email, password } = req.body;

  const matchingUsers = await db
    .collection("users")
    .find({ email, password })
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

