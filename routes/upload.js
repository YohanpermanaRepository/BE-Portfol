const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');
const upload = require('../middleware/uploadMiddleware');

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private
router.post('/', protect, readOnlyProtect, upload.single('image'), uploadImage);

module.exports = router;