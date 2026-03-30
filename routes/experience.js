const express = require('express');
const router = express.Router();
const { 
    getAllExperience,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
    addExperienceImage,
    getExperienceImages,
    updateExperienceImage,
    deleteExperienceImage,
    addProjectToExperience,
    removeProjectFromExperience,
    addCertificationToExperience,
    removeCertificationFromExperience
} = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');

// Experience CRUD
router.route('/')
    .get(getAllExperience)
    .post(protect, readOnlyProtect, createExperience);

router.route('/:id')
    .get(getExperienceById)
    .put(protect, readOnlyProtect, updateExperience)
    .delete(protect, readOnlyProtect, deleteExperience);

// Experience Images CRUD
router.route('/:experienceId/images')
    .get(getExperienceImages)
    .post(protect, readOnlyProtect, addExperienceImage);

router.route('/:experienceId/images/:imageId')
    .put(protect, readOnlyProtect, updateExperienceImage)
    .delete(protect, readOnlyProtect, deleteExperienceImage);

// Experience-Project Relations
router.route('/:experienceId/projects')
    .post(protect, readOnlyProtect, addProjectToExperience);

router.route('/:experienceId/projects/:projectId')
    .delete(protect, readOnlyProtect, removeProjectFromExperience);

// Experience-Certification Relations
router.route('/:experienceId/certifications')
    .post(protect, readOnlyProtect, addCertificationToExperience);

router.route('/:experienceId/certifications/:certificationId')
    .delete(protect, readOnlyProtect, removeCertificationFromExperience);

module.exports = router;
