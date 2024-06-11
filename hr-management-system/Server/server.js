const express = require('express');
const { Pool } = require('pg');
const next = require('next');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.SERVER_PORT || 6000;

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'user123',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'hr-system'
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connected successfully');
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.get('/check', (req, res) => {
    res.status(200).send({
      message: 'server is on and check has worked..'
    });
  });

  server.post('/api', (req, res) => {
    const { name, location } = req.body;
    res.status(200).send({
      message: `YOUR KEYS WERE ${name}, ${location}`
    });
  });
  
  server.post('/api/register', async (req, res) => {
    try {
      // Retrieve user data from request body
      const { name, email, password } = req.body;
  
      // Validate user input (e.g., check for required fields)
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Use parameterized queries to prevent SQL injection
      const insertQuery = `
        INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3)
      `;
      await pool.query(insertQuery, [name, hashedPassword, email]);
  
      // Respond with a success message
      res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
      // Handle errors
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'An error occurred during registration' });
    }
  });
  
  
  server.get('/setup', async (req, res) => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
      `);
      res.send('Table created successfully');
    } catch (err) {
      console.error('Error creating table:', err);
      res.sendStatus(500);
    }
  });

  server.post('/insert-users', async (req, res) => {
    const insertQuery = `
      INSERT INTO users (username, password_hash, email) VALUES
      ('john_doe', '$2b$12$eW5S1kKQ1Y3kK6XqQXqJxO5xI1GQz1l2ZzjklmnopQRzTvQrtX3zy', 'john_doe@example.com'),
      ('jane_smith', '$2b$12$aN6tKXQx7wXyJ1wZXzVxqZ6Q7bFZsQ5Xzklmnop1Zq2RxYq1sV4uo', 'jane_smith@example.com'),
      ('alice_jones', '$2b$12$hH5Yz5jXz5ZqV6Y3wXyJ1Z5q2Xq1Yq0XzYkL1wz0Q6rXzV8oU3lN', 'alice_jones@example.com'),
      ('bob_brown', '$2b$12$aN5Z5x1Yq0Q7wXyJ1Z5q2XqV6Y3z1wZ5zYq0X6rZzQY1w0XzYV7Tz', 'bob_brown@example.com');
    `;

    try {
      await pool.query(insertQuery);
      res.send('Users inserted successfully');
    } catch (err) {
      console.error('Error inserting users:', err);
      res.status(500).send('Error inserting users');
    }
  });

  server.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send('Error retrieving users');
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});
