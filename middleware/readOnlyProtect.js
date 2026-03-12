// Middleware to check if user is demo (read-only)
// Demo users cannot perform create, update, or delete operations
const readOnlyProtect = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  // Check if user is demo
  if (req.user.role === 'demo') {
    return res.status(403).json({ 
      message: 'Demo users can only view data. Create, update, and delete operations are not allowed.' 
    });
  }

  next();
};

module.exports = { readOnlyProtect };
