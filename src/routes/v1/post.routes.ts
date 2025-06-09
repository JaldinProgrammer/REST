import { Router } from 'express';
import { query } from 'express-validator';
import { PostController } from '../../controllers/post.controller';
import { validateRequest } from '../../middleware/validate-request';
import { PostModel } from '../../models/post.model';

const router = Router();
const postModel = new PostModel();
const postController = new PostController(postModel);

router.get('/',
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sort_by').optional().isIn(['created_at', 'updated_at', 'title', 'id']),
  query('order').optional().isIn(['ASC', 'DESC']),
  validateRequest,
  postController.getAllPosts.bind(postController)
);

router.post('/getPostById' , async function(req, res) {
    const postId = parseInt(req.body.postId);
    const post = await postModel.findById(postId);
    if (!post) {
        res.status(200).json(null);
        return;
    }

    res.json({
        result: post,
        links: []
    });
});

router.get('/deletePost' , async function(req, res) {
    const postId = req.query.postId?.toString() || "0";
    const post = await postModel.findById(parseInt(postId));
    if (!post) {
        res.status(200).json(null);
        return;
    }
    await postModel.deletePostById(parseInt(postId));
    res.send('Deleted');
});

export default router;
