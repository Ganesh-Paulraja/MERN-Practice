const myPromise = new Promise((resolve, reject) => {
  
  const success = true;

  if (success) {
    resolve("Food is ready! 🍕");   // ← success
  } else {
    reject("Food unavailable ❌");   // ← failure
  }
    // pending   → waiting, neither success nor failure yet
    // fulfilled → resolve() was called ✅
    // rejected  → reject() was called ❌
});

myPromise
  .then((result) => {
    console.log(result);  // → Food is ready! 🍕
  })
  .catch((err) => {
    console.log(err);     // → Food unavailable ❌
  })
  .finally(() => {
    console.log("Done — whether success or fail");
  });