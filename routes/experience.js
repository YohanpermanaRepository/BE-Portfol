const express = require('express');
const router = express.Router();
const { 
    getAllExperience, 
    createExperience,
    updateExperience,
    deleteExperience
} = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');

router.route('/')
    .get(getAllExperience)
    .post(protect, readOnlyProtect, createExperience);

router.route('/:id')
    .put(protect, readOnlyProtect, updateExperience)
    .delete(protect, readOnlyProtect, deleteExperience);

module.exports = router;
