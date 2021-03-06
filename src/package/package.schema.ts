import Joi from 'joi';

import PackageType from './package.type';

const packageSchema = Joi.object<PackageType>({
  author: Joi.string().required(),
  license: Joi.string().required(),
  name: Joi.string().required(),
  version: Joi.string().required(),
  dependencies: Joi.object(),
});

export default packageSchema;
