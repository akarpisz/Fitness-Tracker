const router = require("express").Router();
const path = require("path");
const Workout = require("../models/Workout");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "exercise.html"));
});

router.get("/api/workouts", (req, res) => {
  console.log("get route hit");
  Workout.find({}).then((data) => {
    res.json(data);
  }).catch(err=>{ res.json(err)});
});

router.post("/api/workouts", (req, res) => {
  console.log("post route hit");
  console.log(req.body);
  Workout.create(req.body, (err,result) => {
    if (err){
      return res.status(500).send(err)
    }
    console.log("create:" + result);
    res
    .status(200)
    .json(result)
  })
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
            distance: parseInt(req.body.distance),
            duration: parseInt(req.body.distance),
          },
        },
      },
      (err,data) => {
        if (err) {
          return res.status(500);
        }
        return res.status(200).json(data)
      }
    )

  } else {
    
    Workout.updateOne(
      { _id: req.params.id },
      {
        $push: {
          exercises: {
            type: req.body.type,
            name: req.body.name,
            weight: parseInt(req.body.weight),
            sets: parseInt(req.body.sets),
            reps: parseInt(req.body.reps),
            duration: parseInt(req.body.duration),
          },
        },
      },
      (err, data) => {
       if(err) {
         return res.status(500);
       }
       return res.status(200).json(data)
      }
    )
    .catch((err)=>{ return err});
  }
});

router.get("/api/workouts/range", (req,res)=>{
 Workout.find({}).then((data)=>{
  res.json(data);
 })
})

router.get("/stats", (req,res)=>{
  res.sendFile(path.join(__dirname, "../public/stats.html"));
})


module.exports = router;
