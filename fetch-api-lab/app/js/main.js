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

// helper functions ----------
function logResult(result) {
  console.log(result);
}

function logSize(response) {
  console.log(response.headers.get('content-length'));
  return response;
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
}

// Validate response
function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// Read response
function readResponseAsJSON(response) {
  return response.json();
}

// Show text
function showText(responseAsText) {
  const message = document.getElementById('message');
  message.textContent = responseAsText;
}

function showSize(response) {
  const message = document.getElementById('message');
  message.textContent = response;
}

// Show image
function showImage(responseAsBlob) {
  const container = document.getElementById('img-container');
  const imgElem = document.createElement('img');
  container.appendChild(imgElem);
  const imgUrl = URL.createObjectURL(responseAsBlob);
  imgElem.src = imgUrl;
}

// Read Blob
function readResponseAsBlob(response) {
  return response.blob();
}

// Read Text
function readResponseAsText(response) {
  return response.text();
}

// Fetch JSON ----------
function fetchJSON() {
  // TODO
  fetch('examples/animals.json')
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError);
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);

// Fetch Image ----------
function fetchImage() {
  fetch('examples/fetching.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError);
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);

// Fetch text ----------
function fetchText() {
  fetch('examples/words.txt')
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText);
}
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);

// HEAD request ----------
function headRequest() {
  fetch('examples/words.txt', {
      method: 'HEAD'
    })
    .then(validateResponse)
    .then(logSize)
    .then(readResponseAsText)
    .then(logResult)
    .catch(logError);
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);

// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {
  var messageHeaders = {
    'Content-Type': 'application/json',
    'X-CUSTOM': 'hello world',
    // 'Y-CUSTOM': 'lorem ipsum'
  };
  var myHeaders = new Headers(messageHeaders);

  const formData = new FormData(document.getElementById('msg-form'));
  fetch('http://localhost:5000/', {
      method: 'POST',
      headers: messageHeaders,
      body: JSON.stringify({
        lab: 'fetch',
        status: 'fun'
      }),
      // mode: 'no-cors'
    })
    // .then(validateResponse)
    // .then(readResponseAsText)
    // .then(showText)
    .then(logResult)
    .catch(logError);
}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);