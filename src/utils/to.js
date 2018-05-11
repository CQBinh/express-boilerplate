export default (promise) => {
  return promise.then((data) => {
    return { error: null, data }
  }).catch((error) => {
    return { error }
  })
}
