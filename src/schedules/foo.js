import cron from 'cron'

const { CronJob } = cron
const job = new CronJob({
  cronTime: '00 01 00 01 * *',
  onTick: () => {
    console.log('tick')
  },
  start: false,
  timeZone: 'Asia/Ho_Chi_Minh'
})
job.start()
