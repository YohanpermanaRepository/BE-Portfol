const express = require('express');
const router = express.Router();
const { getContact, updateContact } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');const { readOnlyProtect } = require('../middleware/readOnlyProtect');
router.route('/')
    .get(getContact)
    .put(protect, updateContact);

module.exports = router;
