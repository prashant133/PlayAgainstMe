const passport = require("passport");
const User = require("../model/userModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        //  check google Id
        const user = await User.findOne({ googleId: profile.id });

        // console.log(profile);

        if (!user) {
          // create a new user
          const user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            refreshToken: refreshToken || undefined ,
          });
        } else {
          user.refreshToken = refreshToken;
          await user.save();
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

// Required for sessions
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});

module.exports = passport;
