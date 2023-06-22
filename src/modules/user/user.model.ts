import * as Joi from 'joi';
import mongoose from 'mongoose';
import { IUser } from './user.interface';
import * as bcrypt from 'bcryptjs';

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
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
export const User = mongoose.model('User', userSchema);
