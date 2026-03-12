const prisma = require('../lib/prisma');

exports.getAllCertifications = async (req, res) => {
  try {
    const certifications = await prisma.certification.findMany({
      select: { id: true, category: true, name: true, issuer: true, year: true, link: true },
      orderBy: [{ id: 'desc' }, { name: 'asc' }]
    });
    res.json(certifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createCertification = async (req, res) => {
  const { category, name, issuer, year, link } = req.body;
  try {
    const result = await prisma.certification.create({
      data: {
        category,
        name,
        issuer,
        year,
        link
      }
    });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating certification:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateCertification = async (req, res) => {
  const { id } = req.params;
  const { category, name, issuer, year, link } = req.body;
  try {
    await prisma.certification.update({
      where: { id: parseInt(id) },
      data: {
        category,
        name,
        issuer,
        year,
        link
      }
    });
    res.json({ message: 'Certification updated successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Certification not found' });
    }
    console.error('Error updating certification:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteCertification = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.certification.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Certification not found' });
    }
    console.error('Error deleting certification:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
