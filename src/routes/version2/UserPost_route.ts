import { Router } from 'express';

const router = Router();

// No documentation for this route
// Not defyning a type for the request body
const users = [];

// handles creation of users but ignores all validation, security, and structure
router.post('/', (req, res) => {
  // Direct access to body withoug validation
  const body = req.body;

  const user = {
    id: Math.floor(Math.random() * 99999), // Weak, and potentially duplicate IDs
    username: body.username, // Could be undefined or invalid
    email: body.email,       // No email format check
  };

  users.push(user); // Using an array


  // Does not follow JSON API response standards
  // Uses status 200 OK, not explicitly setting a status code, defaults to 200
  res.send('User saved successfully'); // No JSON, just a string
});

export default router;
