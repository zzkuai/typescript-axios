const router = require('express').Router()

router.get('/simple', (req, res) => {
  res.send({ success: false })
})

router.get('/base', (req, res) => {
  res.json(req.query)
})

module.exports = router
