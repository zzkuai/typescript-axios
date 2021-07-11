const router = require('express').Router()

router.get('/simple', (req, res) => {
  res.send({ success: false })
})

module.exports = router
