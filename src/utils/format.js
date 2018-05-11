import moment from 'moment'
import diacritics from 'diacritics'
import config from '../configs'

const removeDiacritics = diacritics.remove

// Format number
const number = (value) => {
  if (!value) {
    return '0'
  }
  if (typeof value === 'string') {
    value = parseFloat(value)
  }
  return Number(value.toFixed(1)).toLocaleString()
}

/**
 * Format phone number
 *
 * @param  {String} phone
 */
const phone = (value = '') => {
  if (!value) {
    return ''
  }

  // Cast to string
  value = value.toString()

  // Remove all space character in phone number
  value = value.split(' ').join('')

  if (value[0] !== '0' && (value[0] !== '8' && value[1] !== '4') && (value.indexOf('+84') === -1)) {
    value = `0${value}`
  }

  // If format is 0xxx xxx xxx, change to +84 xxx xxx xxx
  if (value[0] === '0') {
    value = `+84${value.substring(1)}`
  } else if (value[0] === '8' && value[1] === '4') {
    // If format is 84 xxx xxx xxx, add '+' to the first of phone number
    value = `+${value}`
  }
  return value
}

/**
 * Convert phone string to readable
 *
 * @param {String} phone
 */
const readablePhone = (value) => {
  if (!value) {
    return ''
  }

  // Replace +84 to 0
  value = value.replace('+84', '0')

  // Reverse string
  value = value.split('').reverse().join('')

  // Add space to position 4 + 8
  value = `${value.substr(0, 3)} ${value.substr(3)}`
  value = `${value.substr(0, 7)} ${value.substr(7)}`

  // Reverse again
  value = value.split('').reverse().join('')

  return value
}

/**
 * Capitalize first letter of string
 * @param {String} str
 */
const capitalize = (str = '') => {
  if (!str) {
    return ''
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Lowercase first letter of string
 * @param {String} str
 */
const lowerCaseFirstLetter = (str) => {
  if (!str) {
    return ''
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * Transform string to searchable string
 *
 * @param  {String} string
 * @return {String}
 */
const searchString = (string) => {
  // Remove all special characters, except: _ - .
  string = string.replace(/[`~!@#$%^&*()|+=?;:'",<>{}[]\/]/gi, '')
  return new RegExp(removeDiacritics(string).toLowerCase(), 'i')
}

/**
 * Format ISO date to readable string
 *
 * @param {String} value
 */
function date(value) {
  if (!value) {
    return ''
  }

  return moment(value).format(config.format.date)
}

export default {
  number,
  phone,
  readablePhone,
  capitalize,
  lowerCaseFirstLetter,
  searchString,
  date
}
