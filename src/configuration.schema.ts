import Joi from 'joi';
import { IConfiguration, IService } from './configuration.type';

const serviceSchema = Joi.object<IService>({
  name: Joi.string().required(),
  requestType: Joi.string(),
  responseType: Joi.string(),
});

const configurationSchema = Joi.object<IConfiguration>({
  name: Joi.string().required(),
  sourceFolder: Joi.string().required(),
  destinationFolder: Joi.string().required(),
  services: Joi.array().items(serviceSchema),
});

export default configurationSchema;
