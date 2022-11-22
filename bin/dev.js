#!/usr/bin/env node

if (process.env.NODE_ENV === 'production') {
  console.error('Do not use nodemon in production, run bin/www directly instead.')
  process.exitCode = 1
  // @ts-ignore
  return
}

const path = require('path')
const ngrok = require('ngrok')
const nodemon = require('nodemon')

ngrok
  .connect({
    proto: 'http',
    addr: '3030',
  })
  .then((url) => {
    console.log(`ngrok tunnel opened at: ${url}`)
    console.log('Open the ngrok dashboard at: https://localhost:4040\n')

    nodemon({
      script: path.resolve(__dirname, '../' + 'app.ts'),
      exec: `NGROK_URL=${url} node`,
    })
      .on('start', () => {
        console.log('The application has started')
      })
      .on('restart', (files) => {
        console.group('Application restarted due to:')
        files.forEach((file) => console.log(file))
        console.groupEnd()
      })
      .on('quit', () => {
        console.log('The application has quit, closing ngrok tunnel')
        ngrok.kill().then(() => process.exit(0))
      })
  })
  .catch((error) => {
    console.error('Error opening ngrok tunnel: ', error)
    process.exitCode = 1
  })
