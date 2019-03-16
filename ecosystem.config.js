/* eslint no-multi-str: [0] */
const APP_NAME = 'Express_template'
const IP = '123.123.123.123'
const PORT = '1212'
const PATH = '/home/user/express'
const USER = 'user'
const BRANCH_PROD = 'origin/master'
const REPO = 'git@github.com:CQBinh/express-template.git'
const POST_DEPLOY = {
  PROD: 'ln -nfs ../shared/.env .env && \
          npm install --production && \
          pm2 startOrRestart ecosystem.config.js --env production'
}

module.exports = {
  apps: [{
    name: APP_NAME,
    script: './.start.sh',
    env_production: {
      NODE_ENV: 'production'
    },
    env_dev: {
      NODE_ENV: 'development'
    }
  }],

  deploy: {
    prod: {
      user: USER,
      host: [{
        host: IP,
        port: PORT
      }],
      ref: BRANCH_PROD,
      repo: REPO,
      path: PATH,
      'post-deploy': POST_DEPLOY.PROD
    }
  }
}
