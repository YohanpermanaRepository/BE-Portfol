# 🚀 Deployment ke Vercel - Panduan Lengkap

Berikut adalah step-by-step untuk deploy backend portfolio ke Vercel.

---

## 📋 Prerequisites

Sebelum mulai, pastikan Anda sudah punya:
- ✅ GitHub account (untuk push code)
- ✅ Vercel account (https://vercel.com - bisa pakai login GitHub)
- ✅ PostgreSQL database di Vercel atau Prisma Cloud
- ✅ Environment variables sudah disiapkan

---

## 🔑 Environment Variables yang Dibutuhkan

Siapkan daftar ini sebelum deploy:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
JWT_SECRET=your_secret_key_here
API_KEY=your_google_genai_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=3000
```

Ambil values dari:
- **DATABASE_URL** → Vercel PostgreSQL atau Prisma Data Platform
- **JWT_SECRET** → Generate string random panjang
- **API_KEY** → Google GenAI API key
- **CLOUDINARY_*** → Dashboard Cloudinary

---

## 📝 Step 1: Persiapan Local Repository

### 1. Initialize Git (jika belum)
```bash
cd "C:\Users\yyooh\Desktop\backend-portfolio\BEYP"
git init
git add .
git commit -m "Initial commit: Prisma refactor complete"
```

### 2. Create `.gitignore` (jika belum ada)
```bash
echo "node_modules" >> .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "dist" >> .gitignore
echo "build" >> .gitignore
echo ".DS_Store" >> .gitignore
```

### 3. Push ke GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/backend-portfolio.git
git branch -M main
git push -u origin main
```

---

## 🔧 Step 2: Setup Vercel Project

### Option A: Dari GitHub (Recommended)

1. **Go to Vercel Dashboard**
   - Buka https://vercel.com/dashboard
   - Klik "Add New" → "Project"

2. **Import dari GitHub**
   - Pilih repository `backend-portfolio`
   - Klik "Import"

3. **Configure Project**
   - **Project Name**: `backend-portfolio` (atau nama lain)
   - **Framework Preset**: Other (atau Node.js)
   - Klik "Configure" untuk Environment Variables

4. **Add Environment Variables**
   - Klik "Environment Variables"
   - Tambahkan semua variables:
     ```
     DATABASE_URL = postgresql://...
     JWT_SECRET = your_secret_key
     API_KEY = your_google_genai_key
     CLOUDINARY_CLOUD_NAME = your_cloud_name
     CLOUDINARY_API_KEY = your_api_key
     CLOUDINARY_API_SECRET = your_api_secret
     PORT = 3000
     ```
   - Klik "Add" untuk masing-masing

5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses deploy selesai

### Option B: Dari CLI

```bash
# 1. Install Vercel CLI (jika belum)
npm install -g vercel

# 2. Login ke Vercel
vercel login

# 3. Deploy
vercel --prod

# 4. Ikuti instruksi untuk:
#    - Link ke GitHub repo
#    - Set environment variables
#    - Deploy ke production
```

---

## 🌍 Step 3: Konfigurasi Database di Vercel

Jika menggunakan Vercel PostgreSQL:

### 1. Create Database di Vercel Storage
- Go to: https://vercel.com/docs/storage/vercel-postgres
- Click "Create Database"
- Copy `POSTGRES_URL` atau `DATABASE_URL`

### 2. Setup Prisma dengan Database
```bash
# Local: push schema ke database
npx prisma db push

# (Optional) Seed data awal
npm run seed
```

### 3. Di Vercel Dashboard
- Add environment variable: `DATABASE_URL` = your connection string

---

## ✅ Step 4: Verify Deployment

### Check Deployment Status
1. Buka project di Vercel Dashboard
2. Lihat tab "Deployments"
3. Status harus "Ready" (bukan "Building" atau "Error")

### Test API
```bash
# Ganti YOUR_VERCEL_URL dengan URL project Anda
curl https://YOUR_VERCEL_URL.vercel.app/

# Response:
# "Portfolio API is running..."

# Test endpoints lain:
curl https://YOUR_VERCEL_URL.vercel.app/api/profile
curl https://YOUR_VERCEL_URL.vercel.app/api/projects
```

### Lihat Logs
- Vercel Dashboard → Project → Footer → "Logs"
- Atau: `vercel logs`

---

## 🔗 Step 5: Update Frontend URL

Setelah deploy, update frontend untuk point ke URL Vercel:

```javascript
// Di frontend atau .env frontend:
REACT_APP_API_URL = https://YOUR_VERCEL_URL.vercel.app/api

// Kemudian gunakan di fetch:
const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
```

---

## 📊 Monitoring & Maintenance

### View Real-time Logs
```bash
vercel logs --tail
```

### Redeploy
```bash
# Dari CLI
vercel --prod

# Atau dari Vercel Dashboard
# Click "Deployments" → Latest → "..." → "Redeploy"
```

### Update Environment Variables
```bash
# CLI
vercel env list
vercel env add VAR_NAME VAR_VALUE

# Atau di Dashboard
# Settings → Environment Variables → Edit
```

---

## 🆘 Troubleshooting

### Error 1: "Prisma Client not found"
```bash
# Solution: Add build script
# (Sudah ada di package.json: "vercel-build": "prisma generate")

# Atau di Vercel Settings:
# Build & Development Settings → Build Command
# Set ke: npm install && npx prisma generate
```

### Error 2: "DATABASE_URL is not set"
```bash
# Check di Vercel Dashboard:
# Settings → Environment Variables
# Pastikan DATABASE_URL ada dan benar
```

### Error 3: "Connection timeout"
```bash
# Masalah: Database tidak accessible dari Vercel
# Solution:
# 1. Verify DATABASE_URL (harus include sslmode=require)
# 2. Whitelist Vercel IPs di database firewall
# 3. Test local connection dulu: npx prisma db execute --stdin < nul
```

### Error 4: "Build failed"
```bash
# Check logs:
# Vercel Dashboard → Deployments → Click failed deployment
# Lihat "Build Logs" section

# Biasanya karena:
# - Missing environment variables
# - Invalid database connection
# - npm dependencies conflict
```

---

## 📋 Checklist Deployment

Sebelum deploy, pastikan:

- [ ] Semua files sudah di-push ke GitHub
- [ ] `.env` file ada di `.gitignore` (aman!)
- [ ] `vercel.json` sudah update
- [ ] `package.json` sudah ada build scripts
- [ ] Database URL sudah disiapkan
- [ ] Environment variables disiapkan
- [ ] Prisma schema sudah final
- [ ] Seed data sudah jalan (optional)

---

## 🚀 Quick Deploy Command

Setelah everything ready:

```bash
# 1. Push ke GitHub (jika ada perubahan)
git add .
git commit -m "Ready for Vercel deployment"
git push origin main

# 2. Deploy ke Vercel (auto dari GitHub)
# Atau: vercel --prod

# 3. Check status di Vercel Dashboard
# URL akan terlihat: https://backend-portfolio-xxx.vercel.app
```

---

## 📚 Useful Commands

```bash
# Login ke Vercel
vercel login

# Deploy (development)
vercel

# Deploy production
vercel --prod

# List environments
vercel env list

# Add environment variable
vercel env add DATABASE_URL "postgresql://..."

# View logs
vercel logs [project-name] --tail

# Remove deployment
vercel remove [url]

# List all deployments
vercel list
```

---

## 📊 URLs Setelah Deploy

Setelah deploy, Anda akan dapat:

```
Frontend Base URL:
https://your-project-name.vercel.app

API Base URL:
https://your-project-name.vercel.app/api

API Endpoints:
GET  https://your-project-name.vercel.app/api/profile
GET  https://your-project-name.vercel.app/api/projects
GET  https://your-project-name.vercel.app/api/technologies
POST https://your-project-name.vercel.app/api/auth/login
... dan seterusnya
```

Gunakan URLs ini di frontend untuk API calls.

---

## ⚡ Performance Tips

### 1. Enable Caching
Di Vercel Dashboard → Project Settings → Caching

### 2. Use Edge Functions (Optional)
Untuk latency yang lebih rendah, bisa setup Edge Functions

### 3. Monitor Usage
- Dashboard → Usage tab
- Monitor bandwidth dan API calls

---

## 🔐 Security Checklist

- [ ] Environment variables tidak visible di code
- [ ] `.env` ada di `.gitignore`
- [ ] Database password tidak di-hardcode
- [ ] JWT_SECRET adalah string yang kuat
- [ ] API endpoints yang sensitive require authentication
- [ ] CORS diset dengan benar (jika ada frontend)

---

## 🎯 Ringkasan Deployment Flow

```
1. Push code ke GitHub
    ↓
2. Go to Vercel Dashboard
    ↓
3. Import project dari GitHub
    ↓
4. Set environment variables
    ↓
5. Click "Deploy"
    ↓
6. Wait for build & deployment
    ↓
7. Get Vercel URL
    ↓
8. Test API endpoints
    ↓
9. Update frontend API_URL
    ↓
10. Done! 🎉
```

---

## 📞 Next Steps

1. **Prepare database** (Vercel PostgreSQL atau yang sudah ada)
2. **Gather all environment variables** (DATABASE_URL, JWT_SECRET, etc)
3. **Create GitHub repo** (jika belum ada)
4. **Push code ke GitHub**
5. **Go to Vercel** dan import project
6. **Add environment variables**
7. **Deploy!**

---

**Vercel URL nanti akan seperti:**
```
https://backend-portfolio-YOUR_NAME.vercel.app
```

Gunakan URL ini untuk fetch dari frontend! 🚀
