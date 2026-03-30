# Experience Detail API Documentation

## Overview
API untuk mengelola Experience dengan detail page, gambar, dan relasi ke Projects & Certifications.

## Database Schema

### Model: Experience
```
id - Primary Key
company - String
position - String
logo - String (optional)
description - String (optional)
startDate - String (optional)
endDate - String (optional)
relatedCertificationId - Int (FK to Certification, optional)
relationships:
  - certification (1-to-many)
  - images (1-to-many, ExperienceImage)
  - projects (many-to-many, ExperienceProject)
```

### Model: ExperienceImage
```
id - Primary Key
experienceId - Int (FK to Experience, onDelete: Cascade)
imageUrl - String (dari Cloudinary)
caption - String (optional, keterangan gambar)
```

### Model: ExperienceProject (Junction Table)
```
experienceId - Int (FK to Experience, onDelete: Cascade)
projectId - Int (FK to Project, onDelete: Cascade)
Primary Key: (experienceId, projectId)
```

## API Endpoints

### 1. Experience List
**GET** `/api/experiences`
- Mendapatkan list semua experiences
- Response: Array of experiences (tanpa images/projects, untuk performance)
- Public endpoint

**Response Example:**
```json
[
  {
    "id": 1,
    "company": "PT Company Name",
    "position": "Senior Developer",
    "logo": "https://...",
    "description": "...",
    "startDate": "2022-01",
    "endDate": "2024-03",
    "relatedCertificationId": 5
  }
]
```

### 2. Experience Detail
**GET** `/api/experiences/:id`
- Mendapatkan detail experience lengkap dengan images, projects, dan certifications
- Response: Experience dengan include images, projects (include project details), dan certification
- Public endpoint

**Response Example:**
```json
{
  "id": 1,
  "company": "PT Company Name",
  "position": "Senior Developer",
  "logo": "https://...",
  "description": "Description...",
  "startDate": "2022-01",
  "endDate": "2024-03",
  "relatedCertificationId": 5,
  "certification": {
    "id": 5,
    "name": "Certification Name",
    "issuer": "Google",
    "year": 2022
  },
  "images": [
    {
      "id": 1,
      "imageUrl": "https://cloudinary.../image1.jpg",
      "caption": "Screenshot aplikasi dashboard"
    },
    {
      "id": 2,
      "imageUrl": "https://cloudinary.../image2.jpg",
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
        "githubLink": "https://...",
        "demoLink": "https://...",
        "technologies": [
          {
            "projectId": 3,
            "technologyId": 2,
            "technology": {
              "id": 2,
              "name": "React",
              "icon": "..."
            }
          }
        ],
        "images": [
          {
            "id": 1,
            "projectId": 3,
            "imageUrl": "https://..."
          }
        ]
      }
    }
  ]
}
```

### 3. Create Experience
**POST** `/api/experiences`
- Create experience baru
- Protected: Membutuhkan authentication (admin/editor)
- Body:
```json
{
  "company": "PT Company Name",
  "position": "Senior Developer",
  "logo": "https://...",
  "description": "...",
  "startDate": "2022-01",
  "endDate": "2024-03",
  "relatedCertificationId": 5
}
```

### 4. Update Experience
**PUT** `/api/experiences/:id`
- Update experience
- Protected: Membutuhkan authentication
- Body: Same as create (all fields optional)

### 5. Delete Experience
**DELETE** `/api/experiences/:id`
- Delete experience (cascades: hapus juga images dan project relations)
- Protected: Membutuhkan authentication

---

## Experience Images API

### 6. Add Image to Experience
**POST** `/api/experiences/:experienceId/images`
- Add gambar ke experience
- Protected: Membutuhkan authentication
- Body:
```json
{
  "imageUrl": "https://cloudinary.com/image.jpg",
  "caption": "Screenshot dashboard"
}
```

**Response:**
```json
{
  "id": 1,
  "experienceId": 1,
  "imageUrl": "https://cloudinary.com/image.jpg",
  "caption": "Screenshot dashboard"
}
```

### 7. Get Images
**GET** `/api/experiences/:experienceId/images`
- Mendapatkan list semua images dari experience
- Public endpoint

**Response:**
```json
[
  {
    "id": 1,
    "experienceId": 1,
    "imageUrl": "https://...",
    "caption": "Screenshot"
  }
]
```

### 8. Update Image
**PUT** `/api/experiences/:experienceId/images/:imageId`
- Update image (caption, atau imageUrl)
- Protected: Membutuhkan authentication
- Body:
```json
{
  "imageUrl": "https://...",
  "caption": "Updated caption"
}
```

### 9. Delete Image
**DELETE** `/api/experiences/:experienceId/images/:imageId`
- Delete image
- Protected: Membutuhkan authentication

---

## Experience-Project Relations API

### 10. Add Project to Experience
**POST** `/api/experiences/:experienceId/projects`
- Link project dengan experience
- Protected: Membutuhkan authentication
- Body:
```json
{
  "projectId": 3
}
```

**Response:**
```json
{
  "experienceId": 1,
  "projectId": 3
}
```

### 11. Remove Project from Experience
**DELETE** `/api/experiences/:experienceId/projects/:projectId`
- Unlink project dari experience
- Protected: Membutuhkan authentication

---

## Frontend Implementation Flow

### 1. List Experience Page
```
GET /api/experiences
→ Display list of experiences
→ Per experience bisa diklik ke detail page
```

### 2. Experience Detail Page (`/experiences/:id`)
```
GET /api/experiences/:id
→ Display:
   - Experience info (company, position, description, dates)
   - Logo + related certification (with link)
   - Image gallery (bisa click untuk lihat fullscreen)
   - Per gambar ada caption
   - Related Projects section (dengan bisa diklik ke project detail)
   - Related Certifications (jika ada)
```

### 3. Edit Experience (Admin)
```
PUT /api/experiences/:id - Update basic info
POST /api/experiences/:id/images - Tambah gambar
PUT /api/experiences/:id/images/:imageId - Edit gambar/caption
DELETE /api/experiences/:id/images/:imageId - Delete gambar
POST /api/experiences/:id/projects - Link project
DELETE /api/experiences/:id/projects - Unlink project
```

---

## Error Handling

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad request (validation error)
- `404` - Not found
- `500` - Server error

### Error Response
```json
{
  "message": "Error description"
}
```

### Common Errors
- `Experience not found` - ID tidak ada
- `Image not found` - Image ID tidak ada
- `Project not found` / `Relation not found` - Project relation tidak ada
- `Project already linked to this experience` - Project sudah di-link

---

## Notes

1. **Image Upload**: Frontend perlu handle image upload ke Cloudinary, hanya kirim imageUrl ke API
2. **Cascade Deletes**: 
   - Delete experience → delete semua images + project relations
   - Delete image → only delete image record
   - Delete project relation → only delete relation
3. **Protected Routes**: Semua POST/PUT/DELETE membutuhkan authentication (except GET)
4. **Related Certification**: Existing relation, satu experience bisa punya 1 certification (one-to-many dari certification side)
5. **Projects**: Many-to-many relation, satu experience bisa punya banyak projects, satu project bisa related ke banyak experiences
