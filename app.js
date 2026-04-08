const express = require('express');
const os = require('os');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// Use an environment variable for the connection string, or a default
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = 'lab6db';
let db;

// Connect to MongoDB
MongoClient.connect(mongoUrl)
  .then(client => {
    console.log('Successfully connected to MongoDB Database');
    db = client.db(dbName);
  })
  .catch(error => console.error('Database connection failed:', error));

app.get('/', (req, res) => {
  res.json({
    app:  'CISC 886 Lab 6',
    mode: process.env.MODE || 'local',
    node: process.version,
    host: os.hostname(),
  });
});

app.get('/tasks', async (req, res) => {
  try {
    const tasksCollection = db.collection('tasks');
    const tasks = await tasksCollection.find().toArray();
    // Group tasks by status
    const grouped = Object.groupBy(tasks, task => task.status);
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('--------------------------------------------------');
  console.log(`  CISC 886 Lab 6 — App started`);
  console.log(`  Port:  ${PORT}`);
  console.log(`  Mode:  ${process.env.MODE || 'local'}`);
  console.log('--------------------------------------------------');
});