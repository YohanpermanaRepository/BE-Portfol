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
const upload = require('../middleware/uploadMiddleware');

// @route   GET /api/activity
// @desc    Get all activities
router.route('/')
  .get(getAllActivities)
  .post(
    protect,
    readOnlyProtect,
    upload.fields([
      { name: 'images', maxCount: 10 },
      { name: 'image', maxCount: 10 }, // backward-compat: allow single/multiple field name
    ]),
    createActivity
  );

// @route   PUT|DELETE /api/activity/:id
router.route('/:id')
  .put(
    protect,
    readOnlyProtect,
    upload.fields([
      { name: 'images', maxCount: 10 },
      { name: 'image', maxCount: 10 },
    ]),
    updateActivity
  )
  .delete(protect, readOnlyProtect, deleteActivity);

module.exports = router;

