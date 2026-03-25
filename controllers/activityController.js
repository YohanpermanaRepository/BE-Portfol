const prisma = require('../lib/prisma');

// GET /api/activity
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
      },
      orderBy: { id: 'desc' },
    });

    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST /api/activity
exports.createActivity = async (req, res) => {
  const { title, description, imageUrl, image } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const result = await prisma.activity.create({
      data: {
        title,
        description: description ?? null,
        imageUrl: imageUrl ?? image ?? null,
      },
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// PUT /api/activity/:id
exports.updateActivity = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, image } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const result = await prisma.activity.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description: description ?? null,
        imageUrl: imageUrl ?? image ?? null,
      },
    });

    res.json(result);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Activity not found' });
    }
    console.error('Error updating activity:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE /api/activity/:id
exports.deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.activity.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Activity not found' });
    }
    console.error('Error deleting activity:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

