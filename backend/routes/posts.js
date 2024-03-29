
const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const commentsCtrl = require('../controllers/comments');
const likeCtrl = require('../controllers/likes');
const kudosCtrl = require('../controllers/kudos');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.post('/:postId/comments', auth, commentsCtrl.createComment);
router.get('/:postId/comments/:id', auth, commentsCtrl.getOneComment);
router.get('/:postId/comments/', auth, commentsCtrl.getAllComments);
router.put('/:postId/comments/:id', auth, commentsCtrl.modifyComment);
router.delete('/:postId/comments/:id', auth, commentsCtrl.deleteComment);

router.post('/:postId/likes', auth, likeCtrl.likeOnePost);
router.get('/:postId/like', auth, likeCtrl.getLikeOnOnePost);
router.get('/:postId/likes', auth, likeCtrl.getAllLikesOfOnePost);

router.post('/kudos', auth, kudosCtrl.createKudo);
router.get('/kudos/:usersId/received-kudos', auth, kudosCtrl.getReceivedKudos);
router.delete('/kudos/:kudoId/:recipientId', auth, kudosCtrl.deleteKudo);

module.exports = router;