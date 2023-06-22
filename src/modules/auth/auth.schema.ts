import * as Joi from 'joi';
import { IValidationSchema } from '../../utils/joi.interfaces';

export const loginValidation: IValidationSchema = {
  body: Joi.object({
    email: Joi.string().required().trim(true).email(),
    password: Joi.string().required().trim(true).min(8),
  }).required(),
};
