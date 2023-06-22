import { config } from '../config/config';
import * as passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../src/modules/user/user.model';
import { IUser } from '../src/modules/user/user.interface';

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
    async function (jwtPayload, cb) {
      try {
        const user = await User.findById(jwtPayload.sub);
        if (user) cb(null, user);
      } catch (error) {
        cb(error);
      }
    },
  ),
);

export default passport;
