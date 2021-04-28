import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    rooms: convey.roomDao.rooms.length,
  });
})

export default router