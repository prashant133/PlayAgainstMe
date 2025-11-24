const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();

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
app.use("/auth", authRouter);

module.exports = app;
