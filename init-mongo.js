// Connect to the specific database used in app.js
db = db.getSiblingDB('lab6db');

// Insert sample tasks into the 'tasks' collection
db.tasks.insertMany([
  { task: 'Complete Lab 6 Part B', status: 'completed' },
  { task: 'Test Docker Compose', status: 'pending' },
  { task: 'Submit Assignment', status: 'pending' }
]);

print("Database initialized successfully!");