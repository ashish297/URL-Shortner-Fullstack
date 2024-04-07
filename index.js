const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRouter = require("./routes/staticRouter")
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require('./middlewares/auth');


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkForAuthentication);

//connect to db
mongoose.connect("mongodb://localhost:27017/url-shortner")
  .then(()=>console.log("Connected to Database!"))
  .catch(err=>console.log("Error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", staticRouter);
app.use("/url" ,restrictTo(["Normal", "ADMIN"]), urlRoute);
app.use("/user", userRoute);

app.listen(PORT, ()=>console.log("Server Started!"));
