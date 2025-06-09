import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { UserController } from '../../controllers/user.controller';
import { validateRequest } from '../../middleware/validate-request';
import { UserModel } from '../../models/user.model';
import { PostModel } from '../../models/post.model';
import { PostController } from '../../controllers/post.controller';

const router = Router();
const userModel = new UserModel();
const postModel = new PostModel();
const userController = new UserController(userModel);
const postController = new PostController(postModel);

/**
 * @swagger
 * /api/v2/posts:
 *   get:
 *     summary: Get all users
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total_pages:
 *                       type: integer
 */
router.get('/',
  validateRequest,
  query('search').trim().isLength({ min: 3, max: 50 }),
  postController.searchPostsByTitleAndContent.bind(postController)
);

export default router; 