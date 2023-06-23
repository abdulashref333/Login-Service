import * as Joi from 'joi';
import mongoose from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema<IUser>(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!Joi.string().email().validate(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    facebookId: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef User
 */
export const User = mongoose.model('User', userSchema);
