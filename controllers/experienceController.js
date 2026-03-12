const prisma = require('../lib/prisma');

exports.getAllExperience = async (req, res) => {
  try {
    const experience = await prisma.experience.findMany({
      select: {
        id: true,
        company: true,
        position: true,
        logo: true,
        description: true,
        startDate: true,
        endDate: true,
        relatedCertificationId: true
      },
      orderBy: { endDate: 'desc' }
    });

    res.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createExperience = async (req, res) => {
  const { company, position, logo, description, startDate, endDate, relatedCertificationId } = req.body;
  try {
    const result = await prisma.experience.create({
      data: {
        company,
        position,
        logo,
        description,
        startDate,
        endDate,
        relatedCertificationId: relatedCertificationId ? parseInt(relatedCertificationId) : null
      }
    });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateExperience = async (req, res) => {
  const { id } = req.params;
  const { company, position, logo, description, startDate, endDate, relatedCertificationId } = req.body;
  try {
    const result = await prisma.experience.update({
      where: { id: parseInt(id) },
      data: {
        company,
        position,
        logo,
        description,
        startDate,
        endDate,
        relatedCertificationId: relatedCertificationId ? parseInt(relatedCertificationId) : null
      }
    });

    res.json(result);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Experience not found' });
    }
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.experience.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Experience not found' });
    }
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
