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

function logError(error) {
  console.log('Looks like there was a problem:', error);
}


// Fetch JSON ----------

function fetchJSON() {
  fetch('examples/animals.json')
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError)
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// Fetch Image ----------

function fetchImage() {
  fetch('examples/fetching.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError)
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// Fetch text ----------

function fetchText() {
  fetch('examples/words.txt')
    .then(validateResponse)
    .then(readResponseAsText)
    .then(logResult)
    .then(showText)
    .catch(logError)
}
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);


// HEAD request ----------

function headRequest() {
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
    .then(validateResponse)
    .then((resp) => logHeader(resp, ['content-length']))
    .catch(logError)
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);


// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {

  const formData = new FormData(document.getElementById('msg-form'))
  const messageHeaders = new Headers()
  messageHeaders.append('Content-Type', 'application/json') // can be modified
  // messageHeaders.append('Content-Length', 1000) // cannot be modified
  messageHeaders.append('X-Custom', 'hello world')
  messageHeaders.append('Y-Custom', 'hello world 2')

  fetch('http://localhost:5000', {
    method: 'POST',
    body: formData,
    headers: messageHeaders
  })
  .then(validateResponse)
  .then(readResponseAsText)
  .then(showText)
  .catch(logError)

  // fetch('http://localhost:5001', {
  //   method: 'POST',
  //   body: formData,
  //   mode: 'no-cors'
  // })
  // // .then(validateResponse)
  // // .then(readResponseAsText)
  // // .then(showText)
  // .catch(logError)
}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

function readResponseAsJSON(response) {
  return response.json()
}

function showImage(responseAsBlob) {
  const container = document.getElementById('img-container')
  const imgElem = document.createElement('img')
  container.appendChild(imgElem)
  const imgUrl = URL.createObjectURL(responseAsBlob)
  imgElem.src = imgUrl
}

function readResponseAsBlob(response) {
  return response.blob()
}

function showText(responseAsText) {
  const message = document.getElementById('message')
  message.textContent = responseAsText
}

function readResponseAsText(response) {
  return response.text()
}

function logHeader(response, headersName) {
  for (let pair of response.headers.entries()) {
    if(headersName.includes(pair[0])) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  }
}