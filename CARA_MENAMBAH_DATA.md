# 📊 Cara Menambah Data ke Database

Ada 3 cara utama untuk menambah data ke database dengan Prisma:

---

## 1️⃣ **Seed File (Rekomendasi untuk Data Awal)**

Seed file digunakan untuk menambah data awal ketika project baru dimulai.

### File: `prisma/seed.js` (Sudah dibuat ✅)

Seed file ini berisi contoh data untuk:
- ✅ Profile
- ✅ Contact
- ✅ About
- ✅ Technologies
- ✅ Projects
- ✅ Certifications
- ✅ Education
- ✅ Experience
- ✅ User (admin)

### Cara Menjalankan Seed:

```bash
npm run seed
```

Output:
```
🌱 Starting to seed the database...
📝 Creating profile...
✅ Profile created...
📞 Creating contact info...
✅ Contact created...
[... dan seterusnya]
✨ Seeding completed successfully!
```

### Default Login (Setelah Seed):
```
Username: admin
Password: admin123
```

⚠️ **Ganti password ini setelah login pertama!**

---

## 2️⃣ **API Endpoints (Untuk Data Manual)**

Gunakan API endpoints yang sudah ada untuk menambah data melalui HTTP requests.

### Contoh: Menambah Project

**POST** `http://localhost:5000/api/projects`

Body (JSON):
```json
{
  "title": "My Awesome Project",
  "description": "A really cool project",
  "githubLink": "https://github.com/example/project",
  "demoLink": "https://project-demo.com",
  "isFeatured": true,
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "technologies": ["React", "Node.js", "PostgreSQL"]
}
```

Response:
```json
{
  "message": "Project created successfully"
}
```

### Contoh: Menambah Education

**POST** `http://localhost:5000/api/education`

Body (JSON):
```json
{
  "institution": "University of XYZ",
  "degree": "Bachelor",
  "major": "Computer Science",
  "logo": "https://example.com/logo.png",
  "gpa": 3.8,
  "predicate": "Cum Laude",
  "scholarship": "Merit Based",
  "startDate": "January 2019",
  "endDate": "December 2023",
  "transcriptLink": "https://example.com/transcript",
  "publications": [
    {
      "title": "Paper Title",
      "authors": "Your Name",
      "publisher": "Journal Name",
      "index": "Scopus",
      "year": 2023,
      "link": "https://paper-link.com"
    }
  ],
  "achievements": [
    {
      "description": "Dean's List",
      "link": "https://example.com"
    }
  ]
}
```

### Semua Endpoints Untuk Menambah Data:

```
POST /api/profiles       - Tambah Profile
POST /api/contact        - Tambah Contact
POST /api/about          - Tambah About
POST /api/technologies   - Tambah Technology
POST /api/projects       - Tambah Project
POST /api/certifications - Tambah Certification
POST /api/education      - Tambah Education
POST /api/experience     - Tambah Experience
POST /api/auth           - Register/Login User
```

---

## 3️⃣ **Prisma Studio (GUI Browser)**

Gunakan Prisma Studio untuk melihat dan mengedit data secara visual.

### Buka Prisma Studio:

```bash
npx prisma studio
```

Ini akan membuka UI di: `http://localhost:5555`

### Di Sini Anda Bisa:
✅ Lihat semua data di tabel
✅ Tambah data baru
✅ Edit data yang ada
✅ Hapus data
✅ Filter & search

Sangat memudahkan untuk testing!

---

## 📋 Cara Menambah Data Langkah-Langkah

### **Opsi 1: Gunakan Seed File (Paling Cepat)**

```bash
# 1. Jalankan seed
npm run seed

# 2. Lihat data di Prisma Studio
npx prisma studio

# 3. Edit/tambah data lebih lanjut di Studio atau API
```

### **Opsi 2: Gunakan API Endpoints**

```bash
# 1. Pastikan server berjalan
npm run dev

# 2. Kirim POST request ke API endpoints
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Description",
    "githubLink": "https://github.com/...",
    "demoLink": "https://...",
    "isFeatured": true,
    "images": ["https://..."],
    "technologies": ["React", "Node.js"]
  }'
```

### **Opsi 3: Gunakan Postman**

1. Download Postman: https://www.postman.com/downloads/
2. Import collection atau buat request baru
3. Set method ke POST
4. Masukkan URL: `http://localhost:5000/api/projects`
5. Set header: `Content-Type: application/json`
6. Masukkan JSON body
7. Klik Send

---

## 🎯 Recommended Workflow

### Untuk Development:

```bash
# 1. Setup database
npx prisma db push

# 2. Seed dengan data awal
npm run seed

# 3. Buka Prisma Studio untuk lihat data
npx prisma studio

# 4. Start development server
npm run dev

# 5. Testing API dengan Postman atau curl
```

### Untuk Production:

```bash
# 1. Push schema only (jangan seed otomatis)
npx prisma db push

# 2. Manually add important data via API
# atau seed dengan data yang approved

# 3. Start server
npm start
```

---

## ❓ FAQ

### **Q: Apakah seed file akan menghapus data lama?**
A: Tidak! File seed menggunakan `upsert` yang:
- Jika data belum ada → Buat baru
- Jika data sudah ada → Update atau lewati

Ini aman dijalankan berkali-kali.

### **Q: Bagaimana cara menambah data dengan relasi?**
A: Gunakan nested `create`:

```javascript
const project = await prisma.project.create({
  data: {
    title: 'My Project',
    images: {
      create: [
        { imageUrl: 'https://...' },
        { imageUrl: 'https://...' }
      ]
    },
    technologies: {
      connect: [
        { id: 1 },
        { id: 2 }
      ]
    }
  }
});
```

### **Q: Bagaimana cara custom seed file?**
A: Edit file `prisma/seed.js` dan sesuaikan dengan data Anda:

```javascript
// Ubah default technologies, projects, dll
// Tambah model baru jika ada
// Jalankan: npm run seed
```

### **Q: Port Prisma Studio sudah dipakai?**
A: Jalankan di port berbeda:

```bash
npx prisma studio --browser=none
# Buka manual: http://localhost:5555
# Atau gunakan:
npx prisma studio --port 5556
```

---

## 📝 File Structure

```
prisma/
├── schema.prisma     ← Database schema (14 models)
├── seed.js          ← Seed script dengan contoh data
└── .gitignore       ← Ignore dev.db

controllers/
├── projectController.js
├── educationController.js
└── ... (semua sudah Prisma)

lib/
└── prisma.js        ← Prisma client instance
```

---

## 🚀 Quick Start

```bash
# 1. Jalankan seed
npm run seed

# 2. Buka Prisma Studio
npx prisma studio

# 3. Atau start server dan gunakan API
npm run dev
```

Selesai! Data sudah ada di database. ✨

---

## 🆘 Troubleshooting

**Error: "Prisma Client not generated"**
```bash
npx prisma generate
npm run seed
```

**Error: "Database connection failed"**
```bash
# Check .env FILE
# Pastikan DATABASE_URL benar
npx prisma db push
```

**Error: "Unique constraint failed"**
```bash
# Data sudah ada, seed akan skip atau update
# Aman untuk dijalankan lagi
npm run seed
```

---

Sekarang Anda tahu cara menambah data! Pilih metode yang paling sesuai dengan kebutuhan Anda. 🎯
