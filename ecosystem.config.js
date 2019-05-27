/* eslint no-multi-str: [0] */
const APP_NAME = 'Express_template'
const PATH = '/home/CHANGE_ME/express'
const USER = 'CHANGE_ME'
const REPO = 'git@github.com:CQBinh/express-template.git'

const IP = 'CHANGE_ME'
const PORT = 'CHANGE_ME'
const BRANCH_PROD = 'origin/master'

const DEV_IP = 'CHANGE_ME'
const DEV_PORT = 'CHANGE_ME'
const DEV_BRANCH = 'origin/dev'

const POST_DEPLOY = {
  PROD: 'ln -nfs ../shared/.env .env && \
          npm install --production && \
          pm2 reload ecosystem.config.js --env production',
  DEV: 'ln -nfs ../shared/.env .env && \
          npm install && \
          pm2 reload ecosystem.config.js'
}

const PRE_DEPLOY = 'git checkout package-lock.json'

module.exports = {
  apps: [{
    name: APP_NAME,
    script: './app.js',
    instances: 'max',
    wait_ready: true,
    exec_mode: 'cluster'
  }],

  deploy: {
    dev: {
      user: USER,
      host: [{
        host: DEV_IP,
        port: DEV_PORT
      }],
      ref: DEV_BRANCH,
      repo: REPO,
      path: PATH,
      'pre-deploy': PRE_DEPLOY,
      'post-deploy': POST_DEPLOY.DEV
    },
    prod: {
      user: USER,
      host: [{
        host: IP,
        port: PORT
      }],
      ref: BRANCH_PROD,
      repo: REPO,
      path: PATH,
      'pre-deploy': PRE_DEPLOY,
      'post-deploy': POST_DEPLOY.PROD
    }
  }
}
