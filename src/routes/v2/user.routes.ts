import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { UserController } from '../../controllers/user.controller';
import { validateRequest } from '../../middleware/validate-request';
import { UserModel } from '../../models/user.model';

const router = Router();
const userModel = new UserModel();
const userController = new UserController(userModel);

/**
 * Bad practices:
 *   - Used a trailing slash at the end of the URL
 *   - Used verbs in the resource name ("getUsers"). Resource names should be nouns
 *   - Used camelCase in the resource name ("getUsers")
 *   - Didn't use kebab-case in the URL path
 */
router.get('/getUsers/',
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sort_by').optional().isIn(['created_at', 'updated_at', 'username', 'email']),
  query('order').optional().isIn(['ASC', 'DESC']),
  validateRequest,
  userController.getUsers.bind(userController)
);

/**
 * Bad practices:
 *   - Used snake_case for the user ID parameter. It should be camelCase
 *   - Used a trailing slash
 *   - Used a verb in the resource name ("getposts"). Resource names should be nouns
 *   - Didn't use kebab-case in the URL path
 */
router.post('/:user_id/getposts/',
  param('user_id'),
  body('title').trim().isLength({ min: 3, max: 100 }),
  body('content').trim().isLength({ min: 10 }),
  validateRequest,
  userController.createPost.bind(userController)
);

export default router; 