const prisma = require('../lib/prisma');

exports.getProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: { id: 1 },
      select: {
        id: true,
        name: true,
        profileImage: true,
        description: true
      }
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, profileImage, description } = req.body;
  try {
    await prisma.profile.update({
      where: { id: 1 },
      data: {
        name,
        profileImage,
        description
      }
    });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
