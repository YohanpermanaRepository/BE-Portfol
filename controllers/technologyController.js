const prisma = require('../lib/prisma');

// @desc    Get all technologies
// @route   GET /api/technologies
// @access  Public
exports.getAllTechnologies = async (req, res) => {
  try {
    const technologies = await prisma.technology.findMany({
      select: { id: true, name: true, icon: true },
      orderBy: { name: 'asc' }
    });
    res.json(technologies);
  } catch (error) {
    console.error('Error fetching technologies:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new technology
// @route   POST /api/technologies
// @access  Private
exports.createTechnology = async (req, res) => {
  const { name, icon } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  try {
    const result = await prisma.technology.create({
      data: {
        name,
        icon: icon || null
      }
    });
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Technology with this name already exists.' });
    }
    console.error('Error creating technology:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a technology
// @route   PUT /api/technologies/:id
// @access  Private
exports.updateTechnology = async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  try {
    const result = await prisma.technology.update({
      where: { id: parseInt(id) },
      data: {
        name,
        icon: icon || null
      }
    });
    res.json({ message: 'Technology updated successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Technology not found' });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Another technology with this name already exists.' });
    }
    console.error('Error updating technology:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a technology
// @route   DELETE /api/technologies/:id
// @access  Private
exports.deleteTechnology = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.$transaction(async (tx) => {
      // First, remove associations with projects
      await tx.projectTechnology.deleteMany({
        where: { technologyId: parseInt(id) }
      });
      // Then, delete the technology
      await tx.technology.delete({
        where: { id: parseInt(id) }
      });
    });

    res.json({ message: 'Technology deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Technology not found' });
    }
    console.error('Error deleting technology:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};