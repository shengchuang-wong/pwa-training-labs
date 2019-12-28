window.addEventListener('load', () => {

  const webWorker = new Worker('web-worker.js')

  webWorker.addEventListener('message', (message) => {
    console.log({messageFromMain: message.data})
  })

  document.getElementById('myButton').addEventListener('click', () => {
    webWorker.postMessage('myMessage')
  })
})