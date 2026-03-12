const prisma = require('../lib/prisma');

exports.getContact = async (req, res) => {
  try {
    const contact = await prisma.contact.findFirst({
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

    if (!contact) {
      return res.status(404).json({ message: 'Contact info not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateContact = async (req, res) => {
  const { email, instagram, youtube, linkedin, description } = req.body;
  try {
    await prisma.contact.update({
      where: { id: 1 },
      data: {
        email,
        instagram,
        youtube,
        linkedin,
        description
      }
    });
    res.json({ message: 'Contact info updated successfully' });
  } catch (error) {
    console.error('Error updating contact info:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
