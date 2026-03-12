const prisma = require('../lib/prisma');

exports.getAbout = async (req, res) => {
  try {
    const about = await prisma.about.findUnique({
      where: { id: 1 },
      include: {
        images: {
          select: { imageUrl: true }
        }
      }
    });

    if (!about) {
      return res.status(404).json({ message: 'About data not found' });
    }

    res.json({
      description: about.description,
      images: about.images.map(img => img.imageUrl)
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateAbout = async (req, res) => {
  const { description, images } = req.body;
  try {
    // Use transaction to update description and images atomically
    await prisma.$transaction(async (tx) => {
      // Update description
      await tx.about.update({
        where: { id: 1 },
        data: { description }
      });

      // Delete old images
      await tx.aboutImage.deleteMany({
        where: { aboutId: 1 }
      });

      // Create new images
      if (images && images.length > 0) {
        await tx.aboutImage.createMany({
          data: images.map(imageUrl => ({
            aboutId: 1,
            imageUrl
          }))
        });
      }
    });

    res.json({ message: 'About section updated successfully' });
  } catch (error) {
    console.error('Error updating about data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
