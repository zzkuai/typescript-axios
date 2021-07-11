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

module.exports = router
