import { Router } from 'express';

// Using any, which defeats TypeScript's type safety
const users: any[] = [];
const router = Router();

// No swagger documentation for this route
// No versioning in the route path, making it hard to manage changes
// Single route doing too many things, violating REST principles
router.get('/', async (req: any, res: any) => { 
  const q = req.query;

  // Using query parameters to define actions – not RESTful at all
  if (q.action == 'getUser') {
    if (!q.id) {
      // No proper status code for missing parameters
      res.send('missing id');
      return;
    }

    // Inefficient loop, no type checking, no error handling
    let found = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == q.id) {
        found = users[i];
      }
    }

    // No 404 status if user not found
    res.send(found);
  } else if (q.action == 'createUser') {
    // No input validation or sanitization
    const newUser = {
      id: Math.random() * 9999999, // Non-deterministic and non-unique ID generation
      name: q.name, // Accepts undefined or invalid names
      email: q.email, // No email validation
    };

    users.push(newUser);

    // No JSON response, no 201 Created status code
    res.send('created');
  } else {
    // Unknown action with no 400 Bad Request status
    res.send('unknown action');
  }
});

export default router;