const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const virt = { toJSON: { virtuals: true } };
const WorkoutSch = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      duration: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number
      }
    },
  ]
}, virt);

// WorkoutSch.virtual('totalDuration')
// .get(function(){
//   console.log(this.exercises);
//   let vals = this.exercises.map(function(ex){ 
//     return ex.duration});
//     console.log(vals)
//   let total = vals.reduce((acc,curr)=>{
//     return acc + curr;
//   })
//   this.totalDuration = total
//   console.log(this.totalDuration);
//   return this.totalDuration
// })

const Workout = mongoose.model("workout", WorkoutSch);





module.exports = Workout;
