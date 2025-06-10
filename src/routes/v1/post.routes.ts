import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { PostController } from '../../controllers/post.controller';
import { validateRequest } from '../../middleware/validate-request';
import { PostModel } from '../../models/post.model';
import { StatusCodes } from 'http-status-codes';

const router = Router();
const postModel = new PostModel();
const postController = new PostController(postModel);

/**
 * @swagger
 * /api/v1/posts/search:
 *   get:
 *     summary: Search for posts by title or content
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter posts by title
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: Filter posts by content
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
 *     responses:
 *       200:
 *         description: List of posts matching the search criteria
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
 */
router.get('/search',
  query('title').optional().isString().trim(),
  query('content').optional().isString().trim(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  validateRequest,
  async (req, res) => {
    const { title, content } = req.query;

    if (title) {
      await postController.searchPostsByTitle(req, res);
    } else if (content) {
      await postController.searchPostsByContent(req, res);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Please provide either a title or content to search for posts.'+title
      });
    }
  }
);

export default router; 