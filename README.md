<div align="center">

# 🛒 FANDM — Frontend
### Food Enterprise & Distribution Management

> Antarmuka modern untuk mengelola order, stok bahan baku, produksi, dan keuangan usaha makanan rumahan — dalam satu dashboard yang simpel dan dinamis.

![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-shadcn/ui-06B6D4?style=for-the-badge)
![Zustand](https://img.shields.io/badge/Zustand-State-black?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Phase_1-yellow?style=for-the-badge)

<br/>

Bagian dari proyek **FANDM** · Dikembangkan oleh **Tentic Studio**

</div>

---

## 🛠️ Tech Stack

Berdasarkan `package.json`, berikut adalah teknologi utama yang digunakan dalam proyek ini:

| Kategori | Teknologi |
| :--- | :--- |
| 🖼️ **Framework** | React 19 + TypeScript (via Vite) |
| 🎨 **Styling & UI** | Tailwind CSS v4, shadcn/ui, Lucide React |
| 🗃️ **State Management** | Zustand |
| 🔄 **Data Fetching & API** | TanStack Query v5 & Axios |
| 🧭 **Routing** | React Router Dom v6 |
| 🔍 **Form & Validasi** | React Hook Form & Zod |
| 📊 **Chart & Animasi** | Recharts, Framer Motion |

---

## 📦 Instalasi & Cara Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek secara lokal:

```bash
# 1. Clone repositori
git clone https://github.com/Tentic-Studio/TNC-fendm-fe.git
cd TNC-fendm-fe

# 2. Install semua dependensi
pnpm install

# 3. Jalankan development server
pnpm dev
```

> **Catatan**: Jika sudah ada API Backend, pastikan untuk membuat file `.env` dan menyesuaikan variabel environment seperti `VITE_API_URL` sesuai kebutuhan.

---

## 📂 Struktur Folder

```text
src/
├── assets/         # Gambar, logo, dan aset statis lainnya
├── components/     # Komponen UI yang dapat digunakan kembali (reusable)
│   ├── auth/       # Komponen khusus halaman Login
│   ├── common/     # Layout global (Sidebar, Topbar, dll)
│   ├── profile/    # Komponen profil dan form password
│   └── ui/         # Komponen dasar dari shadcn/ui (Button, Input, dll)
├── constants/      # Nilai konstan (misalnya routes.ts)
├── hooks/          # Custom hooks (misalnya useBreakpoint)
├── lib/            # Fungsi utility eksternal (misal: utils dari shadcn)
├── pages/          # Komponen halaman (Dashboard, Login, Profile, Docs, dll)
├── store/          # Konfigurasi global state menggunakan Zustand
├── App.tsx         # Entry point aplikasi & registrasi React Router
├── index.css       # Styling global, variabel CSS, dan konfigurasi Tailwind
└── main.tsx        # File inisialisasi React DOM
```

---

## 🗺️ Fitur Utama Halaman

- **Dashboard** — Ringkasan order terbaru, stok kritis, jadwal produksi yang hampir expired, dan grafik. Dilengkapi efek animasi mikro.
- **Order Management** — Kelola pesanan pelanggan dari status Pending hingga Selesai.
- **Stok Bahan Baku** — Pantau ketersediaan stok secara *real-time*.
- **Produk & Resep** — Manajemen produk, kategori, dan resep dasar (BOM).
- **Produksi** — Fitur pencatatan produksi *Made to Stock* yang otomatis memotong bahan baku.
- **Keuangan** — Catatan arus kas otomatis dan pengeluaran.
- **Dokumentasi** — Halaman panduan internal terintegrasi untuk pengguna (responsif *mobile-first*).
- **Manajemen Akun** — Halaman profil dan perubahan password, lengkap dengan informasi *Tenant*.

---

<div align="center">

**© 2026 Tentic Studio** · FANDM Dashboard Frontend

</div>