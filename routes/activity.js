const express = require('express');
const router = express.Router();

const {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activityController');

const { protect } = require('../middleware/authMiddleware');
const { readOnlyProtect } = require('../middleware/readOnlyProtect');

// @route   GET /api/activity
// @desc    Get all activities
router.route('/')
  .get(getAllActivities)
  .post(protect, readOnlyProtect, createActivity);

// @route   PUT|DELETE /api/activity/:id
router.route('/:id')
  .put(protect, readOnlyProtect, updateActivity)
  .delete(protect, readOnlyProtect, deleteActivity);

module.exports = router;

