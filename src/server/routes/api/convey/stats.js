const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    rooms: convey.roomDao.rooms.length,
  });
})

module.exports = router