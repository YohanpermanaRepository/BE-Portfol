# ⚡ Quick Deploy ke Vercel - 5 Menit

## 🎯 TL;DR - Fast Path

```bash
# 1. Pastikan sudah push ke GitHub ✅ (DONE)
git status  # Harus "nothing to commit"

# 2. Buka Vercel & Import Repo
# → https://vercel.com/dashboard
# → "Add New" → "Project"
# → Pilih "backend-portfolio" repo
# → Click "Import"

# 3. Set Environment Variables
# Di Vercel Dashboard → Environment Variables:
DATABASE_URL=postgresql://...  # dari Vercel PostgreSQL/Prisma
JWT_SECRET=your_secret_key_12345
API_KEY=your_google_genai_key
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 4. Click "Deploy"

# 5. Done! Tunggu selesai, ambil URL-nya
```

---

## 📋 Data yang Dibutuhkan

Siapkan ini sebelum deploy (copy-paste ke Vercel):

### Database Connection
```
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
```
Ambil dari:
- **Vercel PostgreSQL**: https://vercel.com/dashboard → Storage
- **Prisma Cloud**: https://cloud.prisma.io

### API Keys
```
JWT_SECRET=super_secret_random_string_min_32_chars_buatNdiri
API_KEY=AIzaSy...  (dari Google Cloud Console)
CLOUDINARY_CLOUD_NAME=xyz
CLOUDINARY_API_KEY=abc123
CLOUDINARY_API_SECRET=def456
```

---

## 🚀 Step by Step (Super Simple)

### 1. Open Vercel
- Buka: https://vercel.com/dashboard
- Login dengan GitHub account

### 2. Import Project
```
Dashboard
  ↓
"Add New" button
  ↓
"Project"
  ↓
Pilih repo: "backend-portfolio"
  ↓
Click "Import"
```

### 3. Configure Environment
```
Project Settings
  ↓
"Environment Variables"
  ↓
Add setiap variable:
  - DATABASE_URL = ...
  - JWT_SECRET = ...
  - API_KEY = ...
  - CLOUDINARY_CLOUD_NAME = ...
  - CLOUDINARY_API_KEY = ...
  - CLOUDINARY_API_SECRET = ...
```

### 4. Deploy
```
Click "Deploy" button
  ↓
Wait loading...
  ↓
✅ Ready! Copy URL Anda
```

### 5. Test
```bash
# Replace YOUR_VERCEL_URL dengan URL dari dashboard
curl https://YOUR_VERCEL_URL.vercel.app/

# Harus return:
# "Portfolio API is running..."
```

---

## 📍 Where to Find Things

| Item | Location |
|------|----------|
| Database URL | Vercel Storage atau Prisma Cloud |
| JWT Secret | Generate sendiri (random string) |
| Google GenAI Key | Google Cloud Console |
| Cloudinary Keys | Cloudinary Dashboard |
| Deployment URL | Vercel Dashboard → Project → Domains |
| Logs | Vercel Dashboard → Deployments → Click status |

---

## ❌ Common Issues & Fix

| Problem | Solution |
|---------|----------|
| "Build failed" | Check Vercel logs → likely missing env vars |
| "Prisma not found" | Done auto (vercel-build script already set) |
| "Database connection error" | Check DATABASE_URL format & connection |
| "Cannot read properties of undefined" | Missing environment variable |
| "Deployment stuck" | Refresh page atau click redeploy |

---

## ✨ After Deployment

URL Anda akan jadi:
```
https://YOUR_PROJECT_NAME.vercel.app

API Endpoints:
GET  https://YOUR_PROJECT_NAME.vercel.app/api/profile
POST https://YOUR_PROJECT_NAME.vercel.app/api/auth/login
GET  https://YOUR_PROJECT_NAME.vercel.app/api/projects
PUT  https://YOUR_PROJECT_NAME.vercel.app/api/projects/:id
...dan seterusnya
```

Gunakan URL ini di frontend!

---

## 📝 Environment Variables Cheat Sheet

Copy-paste template ini, isi values Anda:

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
JWT_SECRET=YourSuperSecretKeyHereMust32CharsMinimum1234567
API_KEY=AIzaSyXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx
CLOUDINARY_CLOUD_NAME=mycloud
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnop
PORT=3000
```

---

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Prisma Cloud: https://cloud.prisma.io
- GitHub Repo: https://github.com/YOUR_USERNAME/backend-portfolio

---

## ✅ Checklist

- [ ] GitHub repo created & code pushed
- [ ] vercel.json file ada ✅
- [ ] package.json build scripts ada ✅
- [ ] DATABASE_URL ready (Vercel PostgreSQL / Prisma)
- [ ] JWT_SECRET ready
- [ ] API_KEY ready
- [ ] CLOUDINARY credentials ready
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Ready to deploy!

---

## 🎉 Done!

After deploy, Anda bisa:
1. Test API dengan Postman/curl
2. Link frontend ke Vercel URL
3. Monitor logs di Vercel Dashboard
4. Update code & auto-redeploy dari GitHub

**Total waktu: ~5 menit** ⚡

Good luck! 🚀
