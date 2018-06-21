const delay = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const backoff = (promise, config) => {
  config.delay = config.hasOwnProperty("delay") ? config.delay * 2 : config.minDelay;
  config.attempts = config.attempts - 1;

  return promise()
    .catch((err) => {
      if (config.delay > config.maxDelay || config.attempts <= 0) {
        return Promise.reject(err);
      } else {
        return delay(config.delay).then(() => backoff(promise, config));
      }
    });
};
