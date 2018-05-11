import amazon from './cross-env/amazon'
import client from './cross-env/client'
import file from './cross-env/file'
import limit from './cross-env/limit'
import validation from './cross-env/validation'

/*
 * App common variables
 */
const app = {
  env: {
    production: 'production',
    development: 'development',
    test: 'test'
  },

  // Code conventions
  conventions: {
    number: 0,
    array: [],
    string: '',
    object: null
  },

  // Regex
  regex: {
    objectId: /^[0-9a-fA-F]{24}$/,
    phone: /^\+?1?(\d{10,12}$)/,
    email: /\S+@\S+\.\S+/
  },

  // Format
  format: {
    date: 'DD/MM/YYYY, HH:mm'
  },

  // App locales
  locales: {
    list: 'en vi',
    en: 'en',
    vi: 'vi'
  },

  // Cities
  cities: {
    all: 'all',
    daNang: 'da-nang',
    hoChiMinh: 'ho-chi-minh'
  },

  // Default setting
  setting: {
    cashPerCoin: 200,
    salesmanCommission: 5,
    smsFee: 700
  },

  // Query default
  query: {
    all: 'all',
    statuses: {
      active: 'active',
      inactive: 'inactive'
    },
    balanceSheetTypes: ['chain', 'merchant']
  },

  // List roles
  roles: {
    admin: 'admin',
    sale: 'sale',
    accountant: 'accountant',
    marketing: 'marketing',
    customercare: 'customercare'
  },

  // Mail template
  mailTemplate: {
    balanceSheet: {
      announcementAtStartOfMonth: 'announcementAtStartOfMonth'
    }
  },

  // Campaign
  campaign: {
    sendingMethod: {
      list: 'app sms',
      app: 'app',
      sms: 'sms'
    }
  },

  // App timer
  timer: {
    delay: {
      sendEachBalanceSheetEmail: 2500
    }
  }
}

export default Object.assign(app, amazon, client, file, limit, validation)
