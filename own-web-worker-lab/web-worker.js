self.addEventListener('message', message => {
  console.log({
    messageInWebWorker: message.data
  })

  postMessage(message.data)
})