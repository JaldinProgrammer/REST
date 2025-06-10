import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { UserController } from '../controllers/user.controller';
import { validateRequest } from '../middleware/validate-request';
import { UserModel } from '../models/user.model';

const router = Router();
const userModel = new UserModel();
const userController = new UserController(userModel);

/**
 * @swagger
 * /api/v1/users/{userId}/posts:
 *   get:
 *     summary: Get all posts for a user
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *     responses:
 *       200:
 *         description: List of posts
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
 *                       user_id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
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
 *       404:
 *         description: User not found
 */
router.patch('/:userId/v1/user-posts/',
  param('userId'),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sort_by').optional().isIn(['created_at', 'updated_at', 'title']),
  query('order').optional().isIn(['ASC', 'DESC']),
  validateRequest,
  userController.getPostsByUserId.bind(userController)
);


/**
 * @swagger
 * /api/v1/users/{userId}/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *               content:
 *                 type: string
 *                 minLength: 10
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid input data
 */
router.get('/:userId/insert-posts',
  param('userId'),
  body('title').trim().isLength({ min: 3, max: 100 }),
  body('content').trim().isLength({ min: 10 }),
  validateRequest,
  userController.createPost.bind(userController)
);

export default router; 