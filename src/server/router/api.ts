const apiRouter = require('express').Router()

apiRouter.get('/simple', (req, res) => {
  res.send({ success: false })
})

apiRouter.get('/base', (req, res) => {
  res.json(req.query)
})

apiRouter.post('/base', (req, res) => {
  console.log('req.body', req.body)

  res.json(req.body)
})

apiRouter.post('/base/buffer', (req, res) => {
  let msg: any[] = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

apiRouter.get('/error', (req, res) => {
  if (Math.random() > 0.5) {
    res.json({ success: true })
  } else {
    res.status(500)
    res.send()
  }
})

apiRouter.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({ success: true })
  }, 3000)
})

apiRouter.get('/extend', (req, res) => {
  res.send('extend get')
})

apiRouter.post('/extend', (req, res) => {
  res.send('extend post')
})

apiRouter.put('/extend', (req, res) => {
  res.send('extend put')
})

apiRouter.delete('/extend', (req, res) => {
  res.send('extend delete')
})

apiRouter.patch('/extend', (req, res) => {
  res.send('extend patch')
})

apiRouter.options('/extend', (req, res) => {
  res.send('extend options')
})

apiRouter.post('/extend/user', (req, res) => {
  res.json({
    code: 0,
    msg: '成功',
    data: {
      name: 'zzkuai',
      age: 24,
    },
  })
})

apiRouter.get('/interceptor', (req, res) => {
  res.json({
    message: 'interceptor',
    number: '',
  })
})

apiRouter.post('/config', (req, res) => {
  res.json({
    message: 'config',
  })
})

apiRouter.post('/config/transform', (req, res) => {
  res.json({
    data: {
      message: 'config transform',
    },
  })
})

apiRouter.get('/cancel', (req, res) => {
  setTimeout(() => {
    res.json({
      message: 'cancel get',
    })
  }, 1000)
})

apiRouter.post('/cancel', (req, res) => {
  setTimeout(() => {
    res.json(req.body)
  }, 1000)
})

module.exports = apiRouter
