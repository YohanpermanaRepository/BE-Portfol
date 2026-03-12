const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');

// Generates a JWT
const generateToken = (id, username, role = 'admin') => {
  // Make sure to add JWT_SECRET to your .env file
  return jwt.sign({ id, username, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
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
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, password: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // If passwords match, generate a token
      res.json({
        token: generateToken(user.id, user.username, user.role),
      });
    } else {
      // If passwords do not match
      res.status(401).json({ message: 'Invalid credentials' });
    }

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during authentication." });
  }
};


// @desc    Update user credentials
// @route   PUT /api/auth/update-credentials
// @access  Private
exports.updateCredentials = async (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body;
  const userId = req.user.id; // from protect middleware

  if (!currentPassword) {
    return res.status(400).json({ message: 'Current password is required to make changes.' });
  }
  if (!newUsername && !newPassword) {
    return res.status(400).json({ message: 'Please provide a new username or a new password.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect current password.' });
    }

    // If password is correct, proceed with updates
    const updateData = {};

    if (newUsername) {
      updateData.username = newUsername;
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      updateData.password = hashedPassword;
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    res.json({ message: 'Credentials updated successfully.' });

  } catch (error) {
    console.error("Error updating credentials:", error);
    // Check for unique constraint violation on username
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'That username is already taken. Please choose another.' });
    }
    res.status(500).json({ message: 'Server error while updating credentials.' });
  }
};