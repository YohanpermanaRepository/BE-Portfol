const prisma = require('../lib/prisma');
const cloudinary = require('../config/cloudinary');

const tryParseJsonArray = (value) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return value;

  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed : value;
  } catch {
    return value;
  }
};

const normalizeImages = (images, imageUrl, image) => {
  const maybeImages = tryParseJsonArray(images);
  if (Array.isArray(maybeImages)) return maybeImages.filter(Boolean);
  if (typeof maybeImages === 'string' && maybeImages.trim() !== '') return [maybeImages];

  const single = imageUrl ?? image;
  return single ? [single] : [];
};

const getFilesFromReq = (req) => {
  const { files } = req;
  if (!files) return [];

  // upload.array(...) style: req.files is an array
  if (Array.isArray(files)) return files;

  // upload.fields(...) style: req.files is an object of arrays
  const images = files.images ?? [];
  const image = files.image ?? [];
  return [...images, ...image];
};

const uploadFilesToCloudinary = async (files) => {
  if (!files || files.length === 0) return [];

  const uploaded = await Promise.all(
    files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'portfolio_assets',
      });
      return result.secure_url;
    })
  );

  return uploaded.filter(Boolean);
};

// GET /api/activity
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        images: {
          select: { imageUrl: true },
        },
        createdAt: true,
      },
      orderBy: { id: 'desc' },
    });

    res.json(
      activities.map((a) => ({
        id: a.id,
        title: a.title,
        description: a.description,
        // Backward compatible: tetap kirim `imageUrl` sebagai gambar pertama.
        imageUrl: a.images?.[0]?.imageUrl ?? null,
        images: a.images.map((img) => img.imageUrl),
        createdAt: a.createdAt,
      }))
    );
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST /api/activity
exports.createActivity = async (req, res) => {
  const { title, description, images, imageUrl, image } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const files = getFilesFromReq(req);
    const uploadedUrls = await uploadFilesToCloudinary(files);

    const normalizedImages = [
      ...normalizeImages(images, imageUrl, image),
      ...uploadedUrls,
    ];

    const result = await prisma.activity.create({
      data: {
        title,
        description: description ?? null,
        ...(normalizedImages.length > 0
          ? {
              images: {
                create: normalizedImages.map((imageUrl) => ({ imageUrl })),
              },
            }
          : {}),
      },
      include: {
        images: { select: { imageUrl: true } },
      },
    });

    res.status(201).json({
      id: result.id,
      title: result.title,
      description: result.description,
      imageUrl: result.images?.[0]?.imageUrl ?? null,
      images: result.images.map((img) => img.imageUrl),
      createdAt: result.createdAt,
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// PUT /api/activity/:id
exports.updateActivity = async (req, res) => {
  const { id } = req.params;
  const { title, description, images, imageUrl, image } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const activityId = parseInt(id);
    const files = getFilesFromReq(req);
    const hasImageInput =
      (Array.isArray(files) && files.length > 0) ||
      images !== undefined ||
      imageUrl !== undefined ||
      image !== undefined;

    const uploadedUrls = hasImageInput ? await uploadFilesToCloudinary(files) : [];
    const normalizedImages = hasImageInput
      ? [...normalizeImages(images, imageUrl, image), ...uploadedUrls]
      : [];

    await prisma.$transaction(async (tx) => {
      await tx.activity.update({
        where: { id: activityId },
        data: {
          title,
          description: description ?? null,
        },
      });

      // Replace images only if request includes image input
      if (hasImageInput) {
        await tx.activityImage.deleteMany({ where: { activityId } });

        if (normalizedImages.length > 0) {
          await tx.activityImage.createMany({
            data: normalizedImages.map((imageUrl) => ({
              activityId,
              imageUrl,
            })),
          });
        }
      }
    });

    const result = await prisma.activity.findUnique({
      where: { id: activityId },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        images: { select: { imageUrl: true } },
      },
    });

    if (!result) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json({
      id: result.id,
      title: result.title,
      description: result.description,
      imageUrl: result.images?.[0]?.imageUrl ?? null,
      images: result.images.map((img) => img.imageUrl),
      createdAt: result.createdAt,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Activity not found' });
    }
    console.error('Error updating activity:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE /api/activity/:id
exports.deleteActivity = async (req, res) => {
  const { id } = req.params;
  const activityId = parseInt(id);

  try {
    await prisma.$transaction(async (tx) => {
      await tx.activityImage.deleteMany({ where: { activityId } });
      await tx.activity.delete({ where: { id: activityId } });
    });

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Activity not found' });
    }
    console.error('Error deleting activity:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

