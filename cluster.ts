import pm2, {StartOptions} from 'pm2';

const instances: number = parseInt(process.env.WEB_CONCURRENCY || "0") || -1
const maxMemory: number = parseFloat(process.env.WEB_MEMORY || "512")

let startOptions: StartOptions = {
  script: 'index.js',
  instances: instances,
  max_memory_restart: `${maxMemory}M`,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    NODE_PATH: '.'
  }
};

pm2.connect(() => {
  pm2.start(startOptions, (err) => {
    if (err) {
      return console.error('Error while launching applications', err.stack || err)
    }

    console.log('PM2 and application has been succesfully started')

    pm2.launchBus((_, bus) => {
      console.log('[PM2] Log streaming started')

      bus.on('log:out', (packet: any) => {
        console.log('[App:%s] %s', packet.process.name, packet.data)
      })

      bus.on('log:err', (packet: any) => {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data)
      })
    })
  })
})
