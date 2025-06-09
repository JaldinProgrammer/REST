import {PostController} from '../../controllers/post.controller';
import {PostModel} from "../../models/post.model";
import {Router} from "express";
import {query} from "express-validator";

const router = Router();
const userModel = new PostModel();
const postController = new PostController(userModel);

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts with pagination and sorting
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: "Page number for pagination (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         required: false
 *         description: "Number of items per page (default: 10, max: 100)"
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *           enum: [created_at, updated_at, username, email]
 *         required: false
 *         description: "Field to sort by"
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         required: false
 *         description: "Sort order (ASC or DESC)"
 *     responses:
 *       '200':
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       '400':
 *         description: Invalid query parameters
 */
router.get('/',
    query('page').optional().isInt({min: 1}),
    query('limit').optional().isInt({min: 1, max: 100}),
    query('sort_by').optional().isIn(['created_at', 'updated_at', 'username', 'email']),
    query('order').optional().isIn(['ASC', 'DESC']),
    postController.getAllPosts.bind(postController)
);

export default router;
