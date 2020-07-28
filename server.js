const express = require("express");
const path = require("path");

const routes = require(path.join(__dirname, "/controllers/routes.js"));

const PORT = process.env.PORT || 5050
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true)
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb");


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(logger("dev"));
app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Listening; Port ${PORT}`);
});
