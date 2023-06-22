import { config } from '../config/config';
import * as passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../src/modules/user/user.model';
import { IUser } from '../src/modules/user/user.interface';
import { IToken } from '../src/utils/jwt';
import { NotAuthorizedError } from '../src/errors/not-auhorize-error';

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

export default passport;
