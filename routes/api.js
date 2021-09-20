const router = require("express").Router();
const Workout = require("../models/workout");
const Exercise = require("../models/Exercise");

router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(dbWorkout => {
        dbWorkout.foreach(workout => {
            let total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);

    }).catch(err => {
        res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

});
router.post('/api/workouts', (req, res) => {
    Workout.create({})
      .then((newWorkout) => {
        res.json(newWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;