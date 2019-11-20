/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*jshint esversion: 6*/

const app = (() => {

  function getImageName(country) {
    // create and return a promise
    country = country.toLowerCase();
    const promiseOfImagename = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (country === 'spain' || country === 'chile' || country === 'peru') {
          resolve(country + '.png');
        } else {
          reject(Error('Did NOT recieve a valid country name, or at least its not in our list!'))
        }
      }, 1000);
    });
    console.log(promiseOfImagename);
    return promiseOfImagename;

  }

  function isSpain(country) {
    // Optional - create and return a promise that resolves if input is "Spain"
    const promiseOfIsSpain = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (country === 'spain') {
          resolve('This country is Spain!');
        } else {
          reject(Error('This country is NOT Spain!'))
        }
      }, 1000);
    });
    console.log(promiseOfIsSpain);
    return promiseOfIsSpain;
  }

  function flagChain(country) {
    return getImageName(country)
      .then(fetchFlag)
      .then(processFlag)
      .then(appendFlag)
      .catch(logError);
  }

  function allFlags(promiseList) {
    return Promise.all(promiseList)
      .catch(returnFalse);
  }

  var promises = [
    getImageName('Spain'),
    getImageName('Chile'),
    getImageName('Peru')
  ];
  // call the allFlags function
  allFlags(promises).then(function (result) {
    console.log(result);
  });

  // use Promise.race
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
  });

  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
  });

  Promise.race([promise1, promise2])
    .then(logSuccess)
    .catch(logError);

  /* Helper functions */

  function logSuccess(result) {
    console.log('Success!: ' + result);
  }

  function logError(err) {
    console.log('Oh no!:\n' + err);
  }

  function returnFalse() {
    return false;
  }

  function fetchFlag(imageName) {
    return fetch('flags/' + imageName); // fetch returns a promise
  }

  function processFlag(flagResponse) {
    if (!flagResponse.ok) {
      throw Error('Bad response for flag request!'); // This will implicitly reject
    }
    return flagResponse.blob(); // blob() returns a promise
  }

  function appendFlag(flagBlob) {
    const flagImage = document.createElement('img');
    const flagDataURL = URL.createObjectURL(flagBlob);
    flagImage.src = flagDataURL;
    const imgContainer = document.getElementById('img-container');
    imgContainer.appendChild(flagImage);
    imgContainer.style.visibility = 'visible';
  }

  function fallbackName() {
    return 'chile.png';
  }

  // Don't worry if you don't understand this, it's not part of Promises.
  // We are using the JavaScript Module Pattern to enable unit testing of
  // our functions.
  return {
    getImageName: (getImageName),
    flagChain: (flagChain),
    isSpain: (isSpain),
    fetchFlag: (fetchFlag),
    processFlag: (processFlag),
    appendFlag: (appendFlag),
    allFlags: (allFlags)
  };

})();