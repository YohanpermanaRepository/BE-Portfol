const express = require('express');
const router = express.Router();
const { 
    getAllTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology
} = require('../controllers/technologyController');
const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');

router.route('/')
    .get(getAllTechnologies)
    .post(protect, readOnlyProtect, createTechnology);

router.route('/:id')
    .put(protect, readOnlyProtect, updateTechnology)
    .delete(protect, readOnlyProtect, deleteTechnology);

module.exports = router;