const router = require("express").Router();
const path = require("path");
const Workout = require("../models/Workout");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  res.end();
});

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "exercise.html"));
});

router.get("/api/workouts", (req, res) => {
  console.log("get route hit");
  Workout.find({}).then((d) => {
    console.log(d);
    res.json(d);
  });
});

router.post("/api/workouts", (req, res) => {
  console.log("post route hit");
  console.log(req.body);
  Workout.create(req.body, (err, res) => {
    if (err) {
      throw err;
    }
    console.log(res);
  }).then((res) => {
    console.log(res);
  });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.params.id);
  console.log("put route hit");
  console.log(req.body); //type, name, distance, duration
  if (req.body.type === "cardio") {
    console.log("type cardio");
    Workout.updateOne(
      { _id: req.params.id },
      {
        $push: {
          exercises: {
            type: req.body.type,
            name: req.body.name,
            distance: req.body.distance,
            duration: req.body.distance,
          },
        },
      },
      (err, res) => {
        if (err) {
          return err;
        }
        console.log(res);
      }
    );
  } else {
    console.log("type resistance");
    Workout.updateOne(
      { _id: req.params.id },
      {
        $push: {
          exercises: {
            type: req.body.type,
            name: req.body.name,
            weight: req.body.weight,
            sets: req.body.sets,
            reps: req.body.reps,
            duration: req.body.duration,
          },
        },
      },
      (err, res) => {
        if (err) {
          return err;
        }
        console.log(res);
      }
    );
  }
});

router.get("/api/workout/range", (req,res)=>{
  
})


module.exports = router;
