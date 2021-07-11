const router = require('express').Router()

router.get('/simple', (req, res) => {
  res.send({ success: false })
})

router.get('/base', (req, res) => {
  res.json(req.query)
})

router.post('/base', (req, res) => {
  console.log('req.body', req.body)

  res.json(req.body)
})

router.post('/base/buffer', (req, res) => {
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

router.get('/error', (req, res) => {
  if (Math.random() > 0.5) {
    res.json({ success: true })
  } else {
    res.status(500)
    res.send()
  }
})

router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({ success: true })
  }, 3000)
})

router.get('/extend', (req, res) => {
  res.send('extend get')
})

router.post('/extend', (req, res) => {
  res.send('extend post')
})

router.put('/extend', (req, res) => {
  res.send('extend put')
})

router.delete('/extend', (req, res) => {
  res.send('extend delete')
})

router.patch('/extend', (req, res) => {
  res.send('extend patch')
})

router.options('/extend', (req, res) => {
  res.send('extend options')
})

router.post('/extend/user', (req, res) => {
  res.json({
    code: 0,
    msg: '成功',
    data: {
      name: 'zzkuai',
      age: 24,
    },
  })
})

module.exports = router
