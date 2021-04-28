const express = require('express');
const router = express.Router()

const providers = require('../../data/auth/providers')

router.get('/', (req, res) => {
  res.json(providers)
})

module.exports = router;