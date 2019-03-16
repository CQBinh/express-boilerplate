#!/usr/bin/env babel-node

import program from 'commander'
import fs from 'fs'
import map from 'apr-map'

require('colors')

program.option('-m, --model [name]', 'Model name')
  .parse(process.argv)

if (!program.model || (program.model === true)) {
  console.log('Model name is required'.red)
  process.exit(1)
}

const modelDir = `./src/packages/${program.model}/`

function logErrorAndExit(message) {
  console.log(message.red)
  process.exit(1)
}


(async () => {
  if (fs.existsSync(modelDir)) {
    logErrorAndExit('This model is already existed')
  }
  await fs.mkdirSync(modelDir)
  const filesName = ['route', 'validation', 'controller', 'service', 'repository', 'model', 'static', 'config']
  map.series(filesName, async (name) => {
    const modelData = await fs.readFileSync(`./commands/templates/${name}.js`, 'utf8')
    await fs.writeFileSync(`${modelDir}/${name}.js`, modelData)
  })
})()
