const express = require('express');
const router = express.Router();
const { 
    getAllProjects, 
    createProject, 
    updateProject, 
    deleteProject 
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');

router.route('/')
    .get(getAllProjects)
    .post(protect, readOnlyProtect, createProject);

router.route('/:id')
    .put(protect, readOnlyProtect, updateProject)
    .delete(protect, readOnlyProtect, deleteProject);

module.exports = router;
