const prisma = require('../lib/prisma');

const getFullPortfolioContext = async () => {
  const profile = await prisma.profile.findUnique({
    where: { id: 1 },
    select: {
      id: true,
      name: true,
      profileImage: true,
      description: true
    }
  });

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

  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      githubLink: true,
      demoLink: true,
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
    ...p,
    images: p.images.map(img => img.imageUrl),
    technologies: p.technologies.map(pt => pt.technology)
  }));

  const certifications = await prisma.certification.findMany({
    select: { id: true, category: true, name: true, issuer: true, year: true, link: true },
    orderBy: { year: 'desc' }
  });

  const education = await prisma.education.findMany({
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

  const contact = await prisma.contact.findUnique({
    where: { id: 1 },
    select: {
      id: true,
      email: true,
      instagram: true,
      youtube: true,
      linkedin: true,
      description: true
    }
  });

  const about = await prisma.about.findUnique({
    where: { id: 1 },
    include: {
      images: {
        select: { imageUrl: true }
      }
    }
  });

  return {
    profile,
    experience,
    projects: formattedProjects,
    certifications,
    education,
    contact,
    about: {
      description: about?.description,
      images: about?.images.map(img => img.imageUrl) || []
    }
  };
};

exports.getPortfolioContext = async (req, res) => {
  try {
    const context = await getFullPortfolioContext();
    res.json(context);
  } catch (error) {
    console.error('Error fetching portfolio context:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getFullPortfolioContext = getFullPortfolioContext;
