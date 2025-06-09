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
    query('sort_by').optional().isIn(['id', 'created_at', 'updated_at']),
    query('order').optional().isIn(['ASC', 'DESC']),
    validateRequest,
    postController.getAllPosts.bind(postController)
);

export default router;