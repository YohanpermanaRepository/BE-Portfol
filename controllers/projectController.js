const prisma = require('../lib/prisma');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        githubLink: true,
        demoLink: true,
        videoUrl: true,
        isFeatured: true,
        images: {
          select: { imageUrl: true }
        },
        technologies: {
          select: {
            technology: {
              select: { name: true, icon: true }
            }
          }
        }
      },
      orderBy: { id: 'desc' }
    });

    const formattedProjects = projects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      githubLink: p.githubLink,
      demoLink: p.demoLink,
      videoUrl: p.videoUrl,
      isFeatured: p.isFeatured,
      images: p.images.map(img => img.imageUrl),
      technologies: p.technologies.map(pt => ({
        name: pt.technology.name,
        icon: pt.technology.icon
      }))
    }));

    res.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const manageProjectDependencies = async (tx, projectId, technologies, images) => {
  // Clear old dependencies
  await tx.projectTechnology.deleteMany({
    where: { projectId }
  });
  await tx.projectImage.deleteMany({
    where: { projectId }
  });

  // Handle technologies
  if (technologies && technologies.length > 0) {
    for (const techName of technologies) {
      let technology = await tx.technology.findUnique({
        where: { name: techName }
      });

      let technologyId;

      if (!technology) {
        // If technology doesn't exist, create it
        technology = await tx.technology.create({
          data: { name: techName, icon: null }
        });
        technologyId = technology.id;
      } else {
        technologyId = technology.id;
      }

      // Link the technology to the project
      await tx.projectTechnology.create({
        data: {
          projectId,
          technologyId
        }
      });
    }
  }

  // Handle images
  if (images && images.length > 0) {
    await tx.projectImage.createMany({
      data: images.map(imageUrl => ({
        projectId,
        imageUrl
      }))
    });
  }
};

exports.createProject = async (req, res) => {
  const { title, description, githubLink, demoLink, videoUrl, isFeatured, technologies, images } = req.body;
  try {
    await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          title,
          description,
          githubLink,
          demoLink,
          videoUrl,
          isFeatured
        }
      });

      await manageProjectDependencies(tx, project.id, technologies, images);
    });

    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, githubLink, demoLink, videoUrl, isFeatured, technologies, images } = req.body;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.project.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          githubLink,
          demoLink,
          videoUrl,
          isFeatured
        }
      });

      await manageProjectDependencies(tx, parseInt(id), technologies, images);
    });

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Project not found' });
    }
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.projectTechnology.deleteMany({
        where: { projectId: parseInt(id) }
      });
      await tx.projectImage.deleteMany({
        where: { projectId: parseInt(id) }
      });
      await tx.project.delete({
        where: { id: parseInt(id) }
      });
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Project not found' });
    }
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};