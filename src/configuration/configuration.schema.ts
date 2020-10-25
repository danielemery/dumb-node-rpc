import Joi from 'joi';
import { IRawConfiguration, IRawService } from './configuration.type';

const serviceSchema = Joi.object<IRawService>({
  name: Joi.string().required(),
  requestType: Joi.string(),
  responseType: Joi.string(),
});

const configurationSchema = Joi.object<IRawConfiguration>({
  name: Joi.string().required(),
  sourceFolder: Joi.string().required(),
  destinationFolder: Joi.string().required(),
  clientNpmPackageName: Joi.string(),
  serverNpmPackageName: Joi.string(),
  services: Joi.array().items(serviceSchema).required(),
});

export default configurationSchema;
