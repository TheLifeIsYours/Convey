import express from 'express';
const router = express.Router();

router.get('/', async (req, res, next) => {
  req.session.userInfo = undefined;
  req.session.isLoggedIn = false;

  req.session.destroy(() => {
    return res.status(200).redirect('/')
  });
});

export default router;