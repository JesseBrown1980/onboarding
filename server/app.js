const express = require("express");
const middlewares = require("./middlewares");
const morgan = require("morgan");
const { join } = require("path");

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

app.use(middlewares.auth);

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
