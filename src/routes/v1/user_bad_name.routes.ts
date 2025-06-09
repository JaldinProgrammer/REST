const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');

// BAD PRACTICES

// Using verbs in endpoint paths

router.get('/getAllUsers', userController.getUsers);
router.get('/getUser', userController.getUserById);
router.post('/addUser', userController.createUser);
router.put('/updateUser', userController.updateUser);
router.delete('/removeUser', userController.deleteUser);
router.post('/addPostToUser', userController.createPost);
router.get('/fetchPosts', userController.getPostsByUserId);

// Using plural nouns when get 1 row
router.get('/users', userController.getUserById);

// Using singular when get all rows
router.get('/user', userController.getUsers);

// use _ in the name of the endpoint
router.get('/user_posts', userController.getPostsByUserId);

// Using camelCase in endpoint paths
router.get('/getUserById', userController.getUserById);

// Using snake_case in endpoint paths
router.get('/get_user_by_id', userController.getUserById);

// Using PascalCase in endpoint paths
router.get('/GetUserById', userController.getUserById);

// Using uppercase in endpoint paths
router.get('/GET_USER_BY_ID', userController.getUserById);

// Using mixed uppercase and lowercase in endpoint paths
router.get('/User-active', userController.getUsers);

module.exports = router;