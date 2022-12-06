import { app } from "firebase-admin";

app.get("/load", (req, res) => {
  const collection = {
    weekOne: {
      dayOne: [
        {
          movementPattern: {
            sets: 3,
            reps: 10,
            load: 0,
          },
          squat: {
            sets: 3,
            reps: 10,
            load: 0,
          },
        },
      ],
      dayTwo: [
        {
          horizontalPush: {
            sets: 3,
            reps: 10,
            load: 0,
          },
          squat: {
            sets: 3,
            reps: 10,
            load: 0,
          },
        },
      ],
    },
  };

  collection.add(collection);
});

