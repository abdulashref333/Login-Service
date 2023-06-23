import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';

dotenv.config();

export const checkingEnvVariables = () => {
  const envSchema = Joi.object()
    .keys({
      APP_NAME: Joi.string().default('Login-Service'),
      NODE_ENV: Joi.string().valid('prod', 'dev', 'test').required(),
      PORT: Joi.number().default(3000),
      JWT_SECRET: Joi.string().required().description('JWT secret key'),
      JWT_EXPIRATION: Joi.string().description('time after which access tokens expire'),
      GOOGLE_CLIENT_ID: Joi.string().required(),
      GOOGLE_CLIENT_SECRET: Joi.string().required(),
      FACEBOOK_APP_ID: Joi.string().required(),
      FACEBOOK_APP_SECRET: Joi.string().required(),
    })
    .unknown();

  const { error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};

const getDbUrl = () => {
  const { MONGODB_URL, MONOGODB_HOST, MONGODB_DATABASE, MONGODB_PORT } = process.env;

  return MONGODB_URL
    ? MONGODB_URL
    : `mongodb://${MONOGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}` +
        (process.env.NODE_ENV === 'test' ? '-test' : '') +
        '?authSource=admin`';
};
export const config = {
  appName: process.env.APP_NAME,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: getDbUrl(),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiration: process.env.JWT_EXPIRATION,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
  },
};
