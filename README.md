# FANDM (Food Management)

**FANDM** adalah aplikasi manajemen operasional yang dirancang khusus untuk sektor Food & Beverage (F&B). Fokus utama aplikasi ini adalah membantu pelaku usaha dalam mengelola inventaris, resep, dan produksi secara terintegrasi.

Proyek ini dicetuskan dan dikembangkan oleh **Tentic Studio**.

## 🚀 Fitur Utama

*   **Manajemen Bahan Baku**: Pelacakan stok bahan baku (raw materials) secara real-time.
*   **Sistem Produksi & Resep**: Otomatisasi pengurangan stok bahan baku berdasarkan resep saat proses produksi dilakukan.
*   **Dashboard Visual**: Visualisasi data stok dan grafik tren menggunakan Chart.js.
*   **Manajemen Form**: Validasi data yang kuat untuk input bahan baku dan produk.

## 🛠️ Tech Stack (Frontend)

Aplikasi ini dibangun menggunakan ekosistem teknologi modern berbasis React:

| Kategori | Teknologi |
| :--- | :--- |
| **Framework UI** | React 19 |
| **Styling & UI** | PrimeReact, PrimeFlex, PrimeIcons, Lucide React |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query (React Query) v5 & Axios |
| **Routing** | React Router Dom v7 |
| **Validation** | React Hook Form & Zod |
| **Visualisasi** | Chart.js |

## 📦 Instalasi

1. **Clone Repositori**
   ```bash
   git clone [https://github.com/username/fandm-fe.git](https://github.com/username/fandm-fe.git)
   cd fandm-fe

2. **Instal Dependensi**
   ```bash
   npm install

3. **Jalankan Aplikasi (Development)**
    ```bash
    npm run dev

## 📂 Struktur Folder

src/
├── api/            # Konfigurasi Axios & API Services
├── components/     # Komponen UI reusable
├── hooks/          # Custom hooks (termasuk query hooks)
├── pages/          # View utama aplikasi
├── store/          # Zustand store
├── utils/          # Skema validasi & fungsi pembantu
└── App.jsx         # Entry point & konfigurasi router

Dikembangkan oleh **Tentic Studio**