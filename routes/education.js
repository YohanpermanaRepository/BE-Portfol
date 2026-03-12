const express = require('express');
const router = express.Router();
const { 
    getAllEducation, 
    createEducation, 
    updateEducation, 
    deleteEducation 
} = require('../controllers/educationController');
const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');

router.route('/')
    .get(getAllEducation)
    .post(protect, readOnlyProtect, createEducation);

router.route('/:id')
    .put(protect, readOnlyProtect, updateEducation)
    .delete(protect, readOnlyProtect, deleteEducation);

module.exports = router;
