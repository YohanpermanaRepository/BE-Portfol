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

exports.getExperienceById = async (req, res) => {
  const { id } = req.params;
  try {
    const experience = await prisma.experience.findUnique({
      where: { id: parseInt(id) },
      include: {
        certification: true,
        images: {
          select: {
            id: true,
            imageUrl: true,
            caption: true
          }
        },
        projects: {
          include: {
            project: {
              include: {
                technologies: {
                  include: {
                    technology: true
                  }
                },
                images: true
              }
            }
          }
        }
      }
    });

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(experience);
  } catch (error) {
    console.error("Error fetching experience detail:", error);
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

// Experience Images CRUD
exports.addExperienceImage = async (req, res) => {
  const { experienceId } = req.params;
  const { imageUrl, caption } = req.body;

  try {
    // Verify experience exists
    const experience = await prisma.experience.findUnique({
      where: { id: parseInt(experienceId) }
    });

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const image = await prisma.experienceImage.create({
      data: {
        experienceId: parseInt(experienceId),
        imageUrl,
        caption: caption || null
      }
    });

    res.status(201).json(image);
  } catch (error) {
    console.error("Error adding experience image:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExperienceImages = async (req, res) => {
  const { experienceId } = req.params;

  try {
    const images = await prisma.experienceImage.findMany({
      where: { experienceId: parseInt(experienceId) }
    });

    res.json(images);
  } catch (error) {
    console.error("Error fetching experience images:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateExperienceImage = async (req, res) => {
  const { experienceId, imageId } = req.params;
  const { imageUrl, caption } = req.body;

  try {
    const image = await prisma.experienceImage.update({
      where: { 
        id: parseInt(imageId),
        experienceId: parseInt(experienceId)
      },
      data: {
        imageUrl: imageUrl || undefined,
        caption: caption !== undefined ? caption : undefined
      }
    });

    res.json(image);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Image not found' });
    }
    console.error("Error updating experience image:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExperienceImage = async (req, res) => {
  const { experienceId, imageId } = req.params;

  try {
    await prisma.experienceImage.delete({
      where: { 
        id: parseInt(imageId),
        experienceId: parseInt(experienceId)
      }
    });

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Image not found' });
    }
    console.error("Error deleting experience image:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Experience-Project Relations
exports.addProjectToExperience = async (req, res) => {
  const { experienceId } = req.params;
  const { projectId } = req.body;

  try {
    // Verify experience and project exist
    const [experience, project] = await Promise.all([
      prisma.experience.findUnique({ where: { id: parseInt(experienceId) } }),
      prisma.project.findUnique({ where: { id: parseInt(projectId) } })
    ]);

    if (!experience || !project) {
      return res.status(404).json({ message: 'Experience or Project not found' });
    }

    // Check if relation already exists
    const existing = await prisma.experienceProject.findUnique({
      where: {
        experienceId_projectId: {
          experienceId: parseInt(experienceId),
          projectId: parseInt(projectId)
        }
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Project already linked to this experience' });
    }

    const relation = await prisma.experienceProject.create({
      data: {
        experienceId: parseInt(experienceId),
        projectId: parseInt(projectId)
      }
    });

    res.status(201).json(relation);
  } catch (error) {
    console.error("Error adding project to experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.removeProjectFromExperience = async (req, res) => {
  const { experienceId, projectId } = req.params;

  try {
    await prisma.experienceProject.delete({
      where: {
        experienceId_projectId: {
          experienceId: parseInt(experienceId),
          projectId: parseInt(projectId)
        }
      }
    });

    res.status(200).json({ message: 'Project removed from experience' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Relation not found' });
    }
    console.error("Error removing project from experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
