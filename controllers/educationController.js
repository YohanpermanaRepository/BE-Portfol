const prisma = require('../lib/prisma');

exports.getAllEducation = async (req, res) => {
  try {
    const educationRows = await prisma.education.findMany({
      select: {
        id: true,
        institution: true,
        degree: true,
        major: true,
        logo: true,
        gpa: true,
        predicate: true,
        scholarship: true,
        startDate: true,
        endDate: true,
        transcriptLink: true,
        publications: {
          select: {
            title: true,
            authors: true,
            publisher: true,
            indexLevel: true,
            year: true,
            link: true
          },
          orderBy: { year: 'desc' }
        },
        achievements: {
          select: {
            description: true,
            link: true
          },
          orderBy: { id: 'desc' }
        }
      },
      orderBy: { endDate: 'desc' }
    });

    res.json(educationRows);
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createEducation = async (req, res) => {
  const { institution, degree, major, logo, gpa, predicate, scholarship, startDate, endDate, transcriptLink, publications, achievements } = req.body;
  try {
    await prisma.$transaction(async (tx) => {
      const education = await tx.education.create({
        data: {
          institution,
          degree,
          major,
          logo,
          gpa: gpa ? parseFloat(gpa) : null,
          predicate,
          scholarship,
          startDate,
          endDate,
          transcriptLink
        }
      });

      const educationId = education.id;

      // Create publications
      if (publications && publications.length > 0) {
        await tx.publication.createMany({
          data: publications.map(p => ({
            educationId,
            title: p.title,
            authors: p.authors,
            publisher: p.publisher,
            indexLevel: p.index,
            year: p.year,
            link: p.link
          }))
        });
      }

      // Create achievements
      if (achievements && achievements.length > 0) {
        await tx.achievement.createMany({
          data: achievements.map(a => ({
            educationId,
            description: a.description,
            link: a.link
          }))
        });
      }
    });

    res.status(201).json({ message: 'Education created successfully' });
  } catch (error) {
    console.error('Error creating education:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateEducation = async (req, res) => {
  const { id } = req.params;
  const { institution, degree, major, logo, gpa, predicate, scholarship, startDate, endDate, transcriptLink, publications, achievements } = req.body;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.education.update({
        where: { id: parseInt(id) },
        data: {
          institution,
          degree,
          major,
          logo,
          gpa: gpa ? parseFloat(gpa) : null,
          predicate,
          scholarship,
          startDate,
          endDate,
          transcriptLink
        }
      });

      // Delete old publications and achievements
      await tx.publication.deleteMany({
        where: { educationId: parseInt(id) }
      });
      await tx.achievement.deleteMany({
        where: { educationId: parseInt(id) }
      });

      // Create new publications
      if (publications && publications.length > 0) {
        await tx.publication.createMany({
          data: publications.map(p => ({
            educationId: parseInt(id),
            title: p.title,
            authors: p.authors,
            publisher: p.publisher,
            indexLevel: p.index,
            year: p.year,
            link: p.link
          }))
        });
      }

      // Create new achievements
      if (achievements && achievements.length > 0) {
        await tx.achievement.createMany({
          data: achievements.map(a => ({
            educationId: parseInt(id),
            description: a.description,
            link: a.link
          }))
        });
      }
    });

    res.json({ message: 'Education updated successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Education not found' });
    }
    console.error('Error updating education:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.publication.deleteMany({
        where: { educationId: parseInt(id) }
      });
      await tx.achievement.deleteMany({
        where: { educationId: parseInt(id) }
      });
      await tx.education.delete({
        where: { id: parseInt(id) }
      });
    });

    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Education not found' });
    }
    console.error('Error deleting education:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
