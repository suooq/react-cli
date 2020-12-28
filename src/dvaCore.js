import { create } from 'dva-core';
import models from './models';

const dva = create();
models.forEach((item) => dva.model(item));
const dvaCore = {
  start() {
    dva.start();
    // eslint-disable-next-line no-underscore-dangle
    return dva._store;
  },
};

export default dvaCore;
