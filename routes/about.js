const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');

router.route('/')
    .get(getAbout)
    .put(protect, readOnlyProtect, updateAbout);

module.exports = router;
