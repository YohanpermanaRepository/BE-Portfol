# Prisma Migration Guide

## Installation Commands
```bash
npm install @prisma/client
npm install -D prisma
```

## After Installation
```bash
# Push the schema to the database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Optional: Open Prisma Studio to view and manage data
npx prisma studio
```

## Migration Example - Auth Controller

### Before (MySQL with mysql2):
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    const [users] = await db.query('SELECT id, username, password FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({
        token: generateToken(user.id, user.username),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
```

### After (Prisma):
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT secret is not set in .env file.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  try {
    // Prisma query instead of raw SQL
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, password: true },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({
        token: generateToken(user.id, user.username),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
```

## Key Changes Pattern

### Create
```javascript
// Before (MySQL)
await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

// After (Prisma)
await prisma.user.create({
  data: {
    username,
    password: hashedPassword,
  },
});
```

### Read/Find
```javascript
// Before (MySQL)
const [users] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

// After (Prisma)
const user = await prisma.user.findUnique({
  where: { id },
});

// Find many
const users = await prisma.user.findMany({
  where: { /* conditions */ },
});
```

### Update
```javascript
// Before (MySQL)
await db.query('UPDATE users SET username = ? WHERE id = ?', [username, id]);

// After (Prisma)
await prisma.user.update({
  where: { id },
  data: { username },
});
```

### Delete
```javascript
// Before (MySQL)
await db.query('DELETE FROM users WHERE id = ?', [id]);

// After (Prisma)
await prisma.user.delete({
  where: { id },
});
```

## Common Queries with Relations

### Get Project with All Relations
```javascript
const project = await prisma.project.findUnique({
  where: { id: projectId },
  include: {
    images: true,
    technologies: {
      include: {
        technology: true,
      },
    },
  },
});
```

### Get Education with Achievements and Publications
```javascript
const education = await prisma.education.findUnique({
  where: { id: educationId },
  include: {
    achievements: true,
    publications: true,
  },
});
```

### Create with Relations
```javascript
await prisma.project.create({
  data: {
    title: 'My Project',
    description: 'Description',
    images: {
      create: [
        { imageUrl: 'url1' },
        { imageUrl: 'url2' },
      ],
    },
    technologies: {
      connect: [
        { id: techId1 },
        { id: techId2 },
      ],
    },
  },
});
```

## Environment Variables Confirmation

Your `.env` already has:
- DATABASE_URL ✅
- POSTGRES_URL ✅
- PRISMA_DATABASE_URL ✅

Keep these in place. If you want to verify the connection:
```bash
npx prisma db execute --stdin < nul
```

Or run migrations:
```bash
npx prisma db push
npx prisma db seed  # if you have seed files
```
