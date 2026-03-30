# Experience Detail - Frontend Integration Guide

## API Endpoint

**GET** `/api/experience/:id`

## Response Data

```json
{
  "id": 1,
  "company": "Coding Camp",
  "position": "Mentor Non-Class Front-End Back-End",
  "logo": "https://...",
  "description": "Membimbing peserta...",
  "startDate": "February 2025",
  "endDate": "July 2025",
  "relatedCertificationId": 18,
  
  "certification": {
    "id": 18,
    "name": "Mentor Coding Camp",
    "issuer": "Dicoding Indonesia",
    "year": 2025,
    "link": "https://..."
  },
  
  "images": [
    {
      "id": 1,
      "imageUrl": "https://cloudinary.com/image.jpg",
      "caption": "Screenshot dashboard"
    },
    {
      "id": 2,
      "imageUrl": "https://cloudinary.com/image2.jpg",
      "caption": "Team meeting"
    }
  ],
  
  "projects": [
    {
      "experienceId": 1,
      "projectId": 3,
      "project": {
        "id": 3,
        "title": "Project Name",
        "description": "...",
        "Technologies": [
          { "technology": { "name": "React", "icon": "..." } }
        ],
        "images": [
          { "imageUrl": "https://..." }
        ]
      }
    }
  ]
}
```

## Halaman Detail - Yang Ditampilkan

### Section 1: Header
- Company logo (left)
- Company name
- Position
- Start Date - End Date
- Certification badge (jika ada, clickable ke detail certification)

### Section 2: Description
- Full description text

### Section 3: Image Gallery
- Grid/carousel dari `images` array
- Per image:
  - Display gambar
  - Show caption dibawah gambar
  - Clickable untuk fullscreen/modal

### Section 4: Related Projects
- List projects dari `projects` array
- Per project card:
  - Project thumbnail (dari `project.images[0]`)
  - Project title
  - Technologies badge
  - Clickable ke `/projects/:projectId`

## Admin Edit Features

### Add Image
```
POST /api/experience/:id/images
{
  "imageUrl": "https://...",  // dari Cloudinary
  "caption": "..."
}
```

### Edit Image Caption
```
PUT /api/experience/:id/images/:imageId
{
  "caption": "Updated caption"
}
```

### Delete Image
```
DELETE /api/experience/:id/images/:imageId
```

### Link Project
```
POST /api/experience/:id/projects
{
  "projectId": 3
}
```

### Unlink Project
```
DELETE /api/experience/:id/projects/:projectId
```

## Key Points

- Images array bisa kosong
- Projects array bisa kosong
- Certification bisa null
- Image captions bisa null
- Semua date format: "Month Year" (contoh: "February 2025")
- Admin endpoints memerlukan JWT token di Authorization header
