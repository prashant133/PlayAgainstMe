const express = require("express");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors")

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());

// cors

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials : true
  })
);


// setup session (middleware)
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);

//
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

// import routes
const authRouter = require("./routes/authRoute");
const matchRouter = require("./routes/matchRoute");

app.use("/auth", authRouter);
app.use("/api/v1/match", matchRouter);

const { notFound, errorMiddleware } = require("./middleware/errorMiddleware");
// error middleware
app.use(errorMiddleware);
app.use(notFound);

module.exports = app;
