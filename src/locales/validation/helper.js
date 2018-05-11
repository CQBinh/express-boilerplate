import defaultText from './default-text'

const invalid = (text) => {
  return `${text} ${defaultText.notValid}`
}

export default {
  invalid
}
