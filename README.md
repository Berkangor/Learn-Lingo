# LearnLingo (React + Vite + Firebase)

LearnLingo; öğretmenleri listeleyebildiğin, filtreleyebildiğin ve giriş yaptıktan sonra öğretmenleri favoriye ekleyebildiğin bir React uygulamasıdır.  
Proje; **React Router**, **Firebase Auth + Realtime Database**, **Formik/Yup** ve **CSS Modules** ile geliştirilmiştir.

---

## Özellikler

- ✅ **Sayfalar (Route)**
  - `/` Home
  - `/teachers` Öğretmen listesi + filtreleme + “Load more”
  - `/favorites` **Korumalı sayfa (PrivateRoute)** – sadece giriş yapan kullanıcı görür

- ✅ **Öğretmen listeleme**
  - Firebase Realtime Database’den öğretmenleri çeker
  - Listeyi sayfalama mantığıyla parça parça gösterir (Load more)

- ✅ **Filtreleme**
  - Dil (Language)
  - Seviye (Level)
  - Maksimum fiyat (Price)

- ✅ **Favoriler**
  - Giriş yapan kullanıcı için Firebase’e kaydedilir:
    - `users/{uid}/favorites/{teacherId}: true`

- ✅ **Authentication**
  - Firebase Email/Password ile kayıt ol & giriş yap
  - Header üzerinden Login / Registration / Logout modalları

- ✅ **UI**
  - Route-level loader (Suspense fallback)
  - Toast bildirimleri (react-hot-toast)
  - Theme seçimi ve localStorage ile kalıcılık

---

## Kullanılan Teknolojiler

- React + Vite
- React Router DOM
- Firebase (Auth + Realtime Database)
- Formik + Yup (form & validation)
- react-hot-toast
- CSS Modules
- modern-normalize

---

## Kurulum

### 1) Projeyi çalıştırma

```bash
npm install
npm run dev
