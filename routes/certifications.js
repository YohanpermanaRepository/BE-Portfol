const express = require('express');
const router = express.Router();
const { 
    getAllCertifications, 
    createCertification, 
    updateCertification, 
    deleteCertification 
} = require('../controllers/certificationController');
const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');

router.route('/')
    .get(getAllCertifications)
    .post(protect, readOnlyProtect, createCertification);

router.route('/:id')
    .put(protect, readOnlyProtect, updateCertification)
    .delete(protect, readOnlyProtect, deleteCertification);

module.exports = router;
