import fs from 'fs'
import moment from 'moment'

/**
 * Return start of month of give date
 *
 * @param {String} date
 */
const startOfMonth = (date) => {
  if (!date) {
    return new Date(moment().startOf('m').toISOString())
  } else {
    return new Date(moment(date).startOf('m').toISOString())
  }
}

/**
 * Check folder is existed or not
 * If not exists, create new
 *
 * @param {String} path
 */
const checkFileExists = (path, fileName) => {
  const folderExists = fs.existsSync(path)
  if (!folderExists) {
    fs.mkdirSync(path)
  }

  return fs.existsSync(`${path}/${fileName}`)
}

/**
 * Get string index from array of object id
 *
 * @param  {Array}  array
 * @param  {String} id
 */
const getIndexFromArrayObjectId = (array = [], id = '') => {
  let index = -1

  // Cast to string
  id = id.toString()

  // Loop
  for (const i in array) {
    if (array[i] && array[i].toString() === id) {
      index = i
      break
    }
  }

  return index
}

export default {
  startOfMonth,
  checkFileExists,
  getIndexFromArrayObjectId
}
