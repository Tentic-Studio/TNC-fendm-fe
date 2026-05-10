<div align="center">

# 🛒 SOOM — Frontend
### Stock of Order Management

> Antarmuka modern untuk mengelola order, stok bahan baku, produksi, dan keuangan usaha makanan rumahan — dalam satu dashboard yang simpel.

![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PrimeReact](https://img.shields.io/badge/PrimeReact-UI_Library-6366F1?style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Status](https://img.shields.io/badge/Status-Phase_1-yellow?style=for-the-badge)

<br/>

Bagian dari proyek **SOOM** · Dikembangkan oleh **Tentic Studio**

</div>

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
| :--- | :--- |
| 🖼️ **Framework** | React + TypeScript |
| 🎨 **UI Components** | PrimeReact, PrimeFlex, PrimeIcons |
| 🗃️ **State Management** | Zustand |
| 🔄 **Data Fetching** | TanStack Query v5 & Axios |
| 🧭 **Routing** | React Router Dom |
| 🔍 **Validasi Form** | React Hook Form & Zod |

---

## 📦 Instalasi

```bash
# Clone repositori
git clone https://github.com/username/soom-fe.git
cd soom-fe

# Install dependensi
npm install

# Jalankan development server
npm run dev
```

> Pastikan backend SOOM sudah berjalan. Buat file `.env` dari `.env.example` dan sesuaikan `VITE_API_URL`.

---

## 📂 Struktur Folder

```
src/
├── api/            # Konfigurasi Axios & API services
├── components/     # Komponen UI reusable
├── hooks/          # Custom & query hooks
├── pages/          # Halaman utama aplikasi
├── store/          # Zustand global store
├── utils/          # Skema Zod & fungsi pembantu
└── App.tsx         # Entry point & konfigurasi router
```

---

## 🗺️ Halaman Utama

- **Dashboard** — Ringkasan order, stok kritis, dan grafik pemasukan
- **Order Management** — Kelola pesanan masuk dengan sistem DP & pelunasan
- **Stok Bahan Baku** — Pantau stok real-time dengan alert kritis otomatis
- **Produk & Resep** — Manajemen produk, versi resep, dan kalkulasi modal
- **Produksi** — Catat produksi *Made to Stock* dengan update stok otomatis
- **Cash Flow** — Laporan keuangan harian, bulanan, dan tahunan

---

<div align="center">

**© 2025 Tentic Studio** · [Backend Repo](https://github.com/username/soom-be)

</div>