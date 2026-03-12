const express = require('express');
const router = express.Router();
const { loginUser, updateCredentials } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');

router.post('/login', loginUser);
router.put('/update-credentials', protect, readOnlyProtect, updateCredentials);

module.exports = router;