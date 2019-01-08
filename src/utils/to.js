export default (promise) => {
  return promise.then((data) => {
    return [null, data]
  }).catch((error) => {
    return [error]
  })
}
