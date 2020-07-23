const express = require("express");
const path = require("path");
const routes = require(path.join(__dirname, "/controllers/routes.js"));
const PORT = process.env.PORT || 5050

const app = express();

app.use(express.static("/public"));
app.use(urlencoded({ extended: true}));
app.use(express.json());
app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Listening; Port ${PORT}`);
});