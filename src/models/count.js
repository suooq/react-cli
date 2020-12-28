// 异步
function mookAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.5);
    }, 500);
  });
}

export default {
  namespace: 'count',
  state: {
    count: 0,
  },
  effects: {
    * asyncSetCount({ payload, callback }, { put, call }) {
      const result = yield call(mookAsync);
      if (result === true) {
        yield put({
          type: 'setCount',
          payload,
        });
      }
      callback && callback(result);
    },
  },
  reducers: {
    setCount(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
