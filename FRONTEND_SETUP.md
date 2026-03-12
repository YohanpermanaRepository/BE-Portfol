# 🔐 CORS Configuration - Frontend ↔ Backend

Panduan minimal untuk frontend akses API dari domain berbeda.

---

## ⚙️ Backend CORS Setup

File: `server.js` (sudah benar ✅)

```javascript
const cors = require('cors');
app.use(cors()); // Ini allow semua origin sekarang
```

Untuk production, Anda bisa restrict ke domain tertentu:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: [
    'https://your-frontend.vercel.app',
    'https://your-domain.com',
    'http://localhost:3000' // development
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## 📡 Frontend API Call Setup

### Environment Variables (.env.local)

```
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

### React Fetch Example

```javascript
// src/services/api.js

const API_URL = process.env.REACT_APP_API_URL;

export const getProfile = async () => {
  const response = await fetch(`${API_URL}/profile`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export const getProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};

export const updateProject = async (id, projectData, token) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  if (!response.ok) throw new Error('Update failed');
  return response.json();
};
```

### Axios Example

```javascript
// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProfile = () => api.get('/profile');
export const getProjects = () => api.get('/projects');
export const loginUser = (username, password) =>
  api.post('/auth/login', { username, password });
export const updateProject = (id, data) =>
  api.put(`/projects/${id}`, data);

export default api;
```

---

## 🔑 Authentication Header (Important!)

Untuk protected endpoints, kirim token:

```javascript
// ✅ BENAR
const token = localStorage.getItem('token'); // dari login
const response = await fetch(`${API_URL}/profile`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// ❌ SALAH (akan error 401)
const response = await fetch(`${API_URL}/profile`);
```

---

## 🧪 Testing CORS

### Test dari Browser Console

```javascript
// Ganti URL dengan Vercel URL Anda
const response = await fetch('https://your-backend.vercel.app/api/profile');
const data = await response.json();
console.log(data);
```

### Test dari Command Line

```bash
curl -X GET https://your-backend.vercel.app/api/profile
# Harus return JSON

curl -X POST https://your-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
# Harus return: { token: "eyJ..." }
```

---

## 🔗 API URLs untuk Frontend

Setelah deploy, gunakan URLs ini:

```
Base URL:
https://YOUR-PROJECT-NAME.vercel.app/api

Get Profile:
GET /api/profile

Get All Projects:
GET /api/projects

Get Technologies:
GET /api/technologies

Login:
POST /api/auth/login
Body: { username, password }

Get Full Context (untuk chat):
GET /api/portfolio-context

... dan endpoint lain
```

---

## 📝 Environment Setup

### Frontend .env.local

```
REACT_APP_API_URL=https://your-backend-vercel-url.vercel.app/api
REACT_APP_ENV=production
```

### Frontend .env.development

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Development Workflow

```javascript
// src/config.js
const API_URL = process.env.REACT_APP_API_URL;

export default {
  API_URL
};
```

Gunakan di seluruh app:
```javascript
import config from './config';

const response = await fetch(`${config.API_URL}/profile`);
```

---

## 🚨 Common CORS Errors & Fixes

### Error: "Access to XMLHttpRequest blocked by CORS"

**Penyebab**: Backend tidak allow request dari frontend URL

**Fix**:
```javascript
// server.js - Update CORS config
const corsOptions = {
  origin: 'https://your-frontend.vercel.app',
  credentials: true
};
app.use(cors(corsOptions));
```

### Error: "401 Unauthorized"

**Penyebab**: Token tidak dikirim atau expired

**Fix**:
```javascript
const token = localStorage.getItem('token');
fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Error: "OPTIONS Method Not Allowed"

**Penyebab**: CORS preflight request ditolak

**Fix**: Pastikan backend handle OPTIONS requests
```javascript
// Automatic dengan app.use(cors())
```

---

## 📊 Request/Response Flow

```
Frontend
   ↓ (fetch dengan token)
Backend API
   ↓ (verify token)
Prisma Client
   ↓ (query)
PostgreSQL
   ↓ (data)
Backend API
   ↓ (return JSON)
Frontend
   ↓ (render)
User
```

---

## 💡 Best Practices

### 1. Store Token Securely
```javascript
// Login success - store token
localStorage.setItem('token', response.data.token);

// Before request - attach token
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`
};
```

### 2. Handle Errors
```javascript
try {
  const response = await fetch(`${API_URL}/profile`);
  if (!response.ok) {
    if (response.status === 401) {
      // Token expired - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly message
}
```

### 3. Loading & Retry
```javascript
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

---

## 🔧 Troubleshooting

### Frontend tidak bisa akses API

1. Check Vercel URL benar di `.env.local`
2. Test dengan curl: `curl https://your-backend.vercel.app/api/profile`
3. Check Vercel logs: Dashboard → Deployments → Logs
4. Verify environment variables di Vercel

### Token tidak bekerja

1. Pastikan token disimpan setelah login
2. Pastikan header format: `Authorization: Bearer TOKEN`
3. Check token tidak expired: `localStorage.getItem('token')`
4. API endpoint mungkin require protection - check controller

---

## 📚 Files to Update

Frontend files yang perlu update:

```
src/
├── .env.local              ← Add REACT_APP_API_URL
├── config/api.js           ← Create API config
└── services/api.js         ← Create API service layer
```

---

## ✅ Checklist

- [ ] Frontend `.env.local` punya `REACT_APP_API_URL`
- [ ] API URL point ke Vercel backend
- [ ] Backend CORS allow frontend domain
- [ ] Token disimpan setelah login
- [ ] Token dikirim ke protected endpoints
- [ ] Error handling implemented
- [ ] Test API calls dengan curl/Postman dulu
- [ ] Ready to connect!

---

Sekarang frontend dan backend bisa komunikasi! 🎉
