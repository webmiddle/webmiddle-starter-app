import { rootContext } from 'webmiddle';

const defaultHandleResult = (result, t) => t.pass();
const defaultHandleError = (err, t) => Promise.reject(err);

export default function testWrapper() {
  const testServices = [];
  return {
    testServices,
    test: (description, Service, handleResult = defaultHandleResult, handleError = defaultHandleError) => {
      Object.defineProperty(Service, 'name', {
        value: String(testServices.length + 1),
      });
      Service.description = description;
      testServices.push(Service);

      // only run tests with the AVA cli
      // see https://github.com/avajs/ava/blob/3ac2a8f813947588832fccd065d160fc533cd75c/lib/worker/ensure-forked.js
      const isForked = typeof process.send === 'function';
      if (isForked) {
        const ava = require('ava'); // eslint-disable-line global-require
        ava(description, async (t) => {
          await rootContext.evaluate(<Service />)
            .then(result => handleResult(result, t))
            .catch(err => handleError(err, t));
        });
      }
    },
  };
}
