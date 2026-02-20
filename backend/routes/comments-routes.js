const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const commentController = require('../controllers/comments'); 


router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Comments Routes کار می‌کنند! 💬',
    timestamp: new Date().toISOString()
  });
});


router.get('/movie/:movieId', commentController.getMovieComments);  

router.post('/', protect, commentController.createComment);  

router.put('/:id', protect, commentController.updateComment);  

router.delete('/:id', protect, commentController.deleteComment); 

router.post('/:id/like', protect, commentController.likeComment);  



router.post('/:id/replies', protect, commentController.addReply);  


module.exports = router;