import express from 'express'
const router = express.Router()

import providers from '../../data/auth/providers'

router.get('/', (req, res) => {
  res.json(providers)
})

export default router;