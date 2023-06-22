import { config } from '../config/config';
import * as passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../src/modules/user/user.model';
import { IUser } from '../src/modules/user/user.interface';
import { IToken } from '../src/utils/jwt';
import { NotAuthorizedError } from '../src/errors/not-auhorize-error';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
    },
    async function (jwtPayload: IToken, cb) {
      try {
        const user = await User.findById(jwtPayload.sub);
        if (user) cb(null, user);
        else cb(new NotAuthorizedError(), null);
      } catch (error) {
        cb(error);
        throw new Error(error.message);
      }
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: '/api/v1/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (user) done(null, user);
      else {
        try {
          const newUser = await User.create({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          done(null, newUser);
        } catch (error) {
          done(error);
          throw new Error(error.message);
        }
      }
    },
  ),
);

export default passport;
