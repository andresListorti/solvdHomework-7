// Task 1: Implement promiseAll Function
// Your task is to implement a function called promiseAll that mimics the behavior of Promise.all(). The function should accept an array of promises and return a single promise that resolves to an array of resolved values or rejects with the reason of the first rejected promise.
// Instructions
// 1. Implement a function called promiseAll that takes an array of promises as an argument.
// 2. The function should return a new promise that resolves when all promises in the input array have resolved, and rejects if any of the promises reject.
// 3. If all promises resolve, the resolved value of the returned promise should be an array containing the resolved values of the input promises, in the same order.
// 4. If any promise rejects, the returned promise should reject with the reason of the first rejected promise.
//
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let completedPromises = 0;
  
      if (promises.length === 0) {
        resolve(results); // Empty input array, resolve immediately
        return;
      }
  
      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            results[index] = value;
            completedPromises++;
  
            if (completedPromises === promises.length) {
              resolve(results); // All promises resolved, resolve with results
            }
          })
          .catch((error) => {
            reject(error); // Reject with the first error encountered
          });
      });
    });
  }
  //
  // // Testing - Task 1: Implement promiseAll Function
  const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
  
  promiseAll(promises)
    .then((results) => {
      console.log("All promises resolved:", results); // Expected output: [1, 2, 3]
    })
    .catch((error) => {
      console.error("At least one promise rejected:", error);
    });
  //
  //
  // Task 2: Implement promiseAllSettled Function
  // Your task is to implement a function called promiseAllSettled that mimics the behavior of Promise.allSettled(). The function should accept an array of promises and return a promise that resolves to an array of objects representing the settlement of each promise.
  // Instructions
  // 1. Implement a function called promiseAllSettled that takes an array of promises as an argument.
  // 2. The function should return a new promise that resolves with an array of objects representing the settlement of each promise in the input array.
  // 3. Each object in the resolved array should have properties status and value or reason. The status can be either 'fulfilled' or 'rejected', and value should hold the resolved value (if fulfilled) or reason should hold the rejection reason (if rejected).
  //
  function promiseAllSettled(promises) {
    return new Promise((resolve) => {
      const settledResults = [];
  
      if (promises.length === 0) {
        resolve(settledResults); // Empty input array, resolve immediately
        return;
      }
  
      let completedPromises = 0;
  
      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            settledResults[index] = { status: "fulfilled", value };
          })
          .catch((reason) => {
            settledResults[index] = { status: "rejected", reason };
          })
          .finally(() => {
            completedPromises++;
  
            if (completedPromises === promises.length) {
              resolve(settledResults); // All promises settled, resolve with results
            }
          });
      });
    });
  }
  
  //
  // // Testing - Task 2: Implement promiseAllSettled Function
  const promises2 = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3),
  ];
  
  promiseAllSettled(promises2).then((results) => {
    console.log("All promises settled:", results);
    // Expected output: [{ status: 'fulfilled', value: 1 },
    //                  { status: 'rejected', reason: 'Error occurred' },
    //                  { status: 'fulfilled', value: 3 }]
  });
  //
  //
  // Task 3: Implement Chaining of Promises as a Separate Function
  //   Your task is to implement a function called chainPromises that facilitates chaining of promises. The function should accept an array of functions that return promises and execute them sequentially.
  //   Instructions
  //   1. Implement a function called chainPromises that takes an array of functions as an argument.
  //   2. Each function in the array should return a promise.
  //   3. The chainPromises function should execute the functions sequentially, chaining the promises together.
  //   4. The returned promise should resolve with the value of the last resolved promise or reject with the reason of the first rejected promise.
  //
  function chainPromises(functionsArray) {
    // Start with a resolved promise to kick off the chain
    let initialPromise = Promise.resolve();
  
    // Chain the promises one by one
    for (const func of functionsArray) {
      initialPromise = initialPromise.then(func);
    }
  
    return initialPromise;
  }
  
  // // Testing - Task 3: Implement Chaining of Promises as a Separate Function
  function asyncFunction1() {
    return Promise.resolve("Result from asyncFunction1");
  }
  
  function asyncFunction2(data) {
    return Promise.resolve(data + " - Result from asyncFunction2");
  }
  
  function asyncFunction3(data) {
    return Promise.resolve(data + " - Result from asyncFunction3");
  }
  
  const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];
  
  chainPromises(functionsArray)
    .then((result) => {
      console.log("Chained promise result:", result);
      // Expected output: "Chained promise result: Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
    })
    .catch((error) => {
      console.error("Chained promise error:", error);
    });
  //
  //
  // Task 4: Implement promisify Function
  // Your task is to implement a function called promisify that converts a callback-style function into a function that returns a promise.
  // Instructions
  // 1. Implement a function called promisify that takes a callback-style function as an argument.
  // 2. The promisify function should return a new function that returns a promise.
  // 3. The new function should execute the original callback-style function and resolve the promise with its result or reject the promise with any error encountered.
  //
  function promisify(callbackStyleFunction) {
    return function (...args) {
      return new Promise((resolve, reject) => {
        callbackStyleFunction(...args, (error, result) => {
          if (error) {
            reject(error); // Reject with the error encountered
          } else {
            resolve(result); // Resolve with the result
          }
        });
      });
    };
  }
  //
  // // Testing - Task 4: Implement promisify Function
  function callbackStyleFunction(value, callback) {
    setTimeout(() => {
      if (value > 0) {
        callback(null, value * 2);
      } else {
        callback("Invalid value", null);
      }
    }, 1000);
  }
  
  const promisedFunction = promisify(callbackStyleFunction);
  
  promisedFunction(3)
    .then((result) => {
      console.log("Promised function result:", result); // Expected output: "Promised function result: 6"
    })
    .catch((error) => {
      console.error("Promised function error:", error);
    });
  