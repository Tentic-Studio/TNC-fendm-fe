import { useState } from 'react'
import { ChevronRight, BookOpen, Tag, Package, Archive, Factory, ShoppingCart, Banknote } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Section {
  id: number
  title: string
  icon: React.ReactNode
  color: string
  bg: string
  steps: { title: string; desc: string }[]
}

// ─── Sections Data ────────────────────────────────────────────────────────────
const sections: Section[] = [
  {
    id: 1,
    title: 'Cara Input Kategori',
    icon: <Tag size={16} strokeWidth={1.5} />,
    color: '#1565A0', bg: '#E3F2FB',
    steps: [
      { title: 'Buka menu Kategori', desc: 'Dari sidebar, klik Settings → Kategori. Halaman daftar kategori akan tampil.' },
      { title: 'Klik tombol Tambah Kategori', desc: 'Klik tombol "+ Tambah" di pojok kanan atas untuk membuka form kategori.' },
      { title: 'Isi nama kategori', desc: 'Masukkan nama kategori produk, misalnya: "Roti", "Kue Kering", "Minuman". Nama harus unik.' },
      { title: 'Simpan', desc: 'Klik tombol Simpan. Kategori baru akan langsung muncul di daftar dan siap digunakan saat input produk.' },
    ],
  },
  {
    id: 2,
    title: 'Cara Input Bahan Baku',
    icon: <Package size={16} strokeWidth={1.5} />,
    color: '#2E7D32', bg: '#E8F5E9',
    steps: [
      { title: 'Buka menu Stok Bahan Baku', desc: 'Dari sidebar, klik Stok Bahan Baku. Halaman daftar bahan baku akan tampil.' },
      { title: 'Klik tombol Tambah Bahan', desc: 'Klik "+ Tambah Bahan Baku" untuk membuka form input bahan.' },
      { title: 'Isi detail bahan baku', desc: 'Masukkan: nama bahan (mis. Tepung Terigu), satuan (kg, gram, liter), stok awal, dan batas minimum stok untuk notifikasi kritis.' },
      { title: 'Simpan bahan', desc: 'Klik Simpan. Bahan akan masuk ke inventori dan stoknya bisa diupdate setiap kali ada pembelian.' },
      { title: 'Update stok', desc: 'Untuk update stok, klik ikon edit pada bahan, ubah jumlah stok sesuai kondisi gudang, lalu simpan.' },
    ],
  },
  {
    id: 3,
    title: 'Produk & Resep',
    icon: <Archive size={16} strokeWidth={1.5} />,
    color: '#6A1B9A', bg: '#F3E5F5',
    steps: [
      { title: 'Buka menu Produk & Resep', desc: 'Klik Produk & Resep dari sidebar untuk melihat daftar semua produk.' },
      { title: 'Tambah produk baru', desc: 'Klik "+ Tambah Produk". Isi nama produk, kategori (yang sudah dibuat sebelumnya), harga jual, dan deskripsi singkat.' },
      { title: 'Tambah resep produk', desc: 'Setelah produk tersimpan, klik tab Resep. Tambahkan setiap bahan baku yang digunakan beserta jumlahnya per batch produksi.' },
      { title: 'Versi resep', desc: 'Sistem menyimpan versi resep otomatis. Jika resep diubah, versi lama tetap tersimpan untuk referensi produksi sebelumnya.' },
      { title: 'Harga pokok produksi', desc: 'Sistem akan menghitung otomatis HPP berdasarkan bahan baku yang digunakan dan harga belinya.' },
    ],
  },
  {
    id: 4,
    title: 'Produksi',
    icon: <Factory size={16} strokeWidth={1.5} />,
    color: '#E65100', bg: '#FFF8E1',
    steps: [
      { title: 'Buka menu Produksi', desc: 'Klik Produksi dari sidebar. Halaman ini menampilkan riwayat dan jadwal produksi.' },
      { title: 'Buat produksi baru', desc: 'Klik "+ Buat Produksi". Pilih produk yang akan diproduksi dan jumlah batch (porsi).' },
      { title: 'Verifikasi stok bahan', desc: 'Sistem akan otomatis menghitung kebutuhan bahan berdasarkan resep. Pastikan stok mencukupi sebelum lanjut.' },
      { title: 'Mulai produksi', desc: 'Klik Mulai Produksi. Status akan berubah menjadi "Proses". Stok bahan baku akan langsung terpotong otomatis.' },
      { title: 'Selesaikan produksi', desc: 'Setelah produksi selesai, klik Selesai dan masukkan jumlah aktual yang berhasil diproduksi. Sistem akan catat tanggal kedaluwarsa.' },
    ],
  },
  {
    id: 5,
    title: 'Order',
    icon: <ShoppingCart size={16} strokeWidth={1.5} />,
    color: '#1565A0', bg: '#E3F2FB',
    steps: [
      { title: 'Buka menu Order', desc: 'Klik Order dari sidebar. Daftar semua order aktif dan riwayat akan tampil.' },
      { title: 'Buat order baru', desc: 'Klik "+ Buat Order". Masukkan nama pelanggan, nomor kontak, dan tanggal pengiriman yang diinginkan.' },
      { title: 'Tambah item order', desc: 'Pilih produk dari dropdown, masukkan jumlah. Harga akan otomatis terisi dari data produk. Bisa tambah beberapa item sekaligus.' },
      { title: 'Konfirmasi & proses', desc: 'Setelah semua item ditambahkan, klik Konfirmasi. Status order berubah dari Pending → Proses.' },
      { title: 'Tandai selesai', desc: 'Saat order sudah disiapkan dan diserahkan ke pelanggan, klik Selesai. Data pemasukan akan tercatat otomatis ke modul Keuangan.' },
    ],
  },
  {
    id: 6,
    title: 'Keuangan',
    icon: <Banknote size={16} strokeWidth={1.5} />,
    color: '#2E7D32', bg: '#E8F5E9',
    steps: [
      { title: 'Buka menu Keuangan', desc: 'Klik Keuangan dari sidebar untuk melihat ringkasan pemasukan dan pengeluaran.' },
      { title: 'Pemasukan otomatis', desc: 'Setiap order yang diselesaikan akan otomatis tercatat sebagai pemasukan. Tidak perlu input manual.' },
      { title: 'Catat pengeluaran', desc: 'Untuk pengeluaran seperti pembelian bahan baku, klik "+ Tambah Pengeluaran". Masukkan nominal, kategori, dan deskripsi.' },
      { title: 'Laporan harian/bulanan', desc: 'Gunakan filter tanggal untuk melihat laporan per periode. Grafik akan menampilkan tren pemasukan vs pengeluaran.' },
      { title: 'Export laporan', desc: 'Klik Export untuk mengunduh laporan dalam format Excel atau PDF untuk keperluan pembukuan.' },
    ],
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<number>(1)
  const current = sections.find(s => s.id === activeSection)!

  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

      {/* ── Left nav ───────────────────────────────────────────────────── */}
      <div style={{
        width: 220, flexShrink: 0,
        background: 'white', border: '1px solid var(--fendm-border)',
        borderRadius: 10, padding: '12px 8px',
        position: 'sticky', top: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 12px', marginBottom: 4 }}>
          <BookOpen size={14} color="var(--fendm-primary)" />
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--fendm-text-dark)', letterSpacing: '0.3px' }}>
            Panduan FANDM
          </span>
        </div>

        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            style={{
              width: '100%', textAlign: 'left',
              padding: '9px 12px', border: 'none', borderRadius: 8,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              background: activeSection === sec.id ? sec.bg : 'transparent',
              color: activeSection === sec.id ? sec.color : 'var(--fendm-text-muted)',
              fontWeight: activeSection === sec.id ? 600 : 400,
              fontSize: 12, marginBottom: 2,
              transition: 'all 0.15s',
            }}
            onMouseOver={e => {
              if (activeSection !== sec.id) e.currentTarget.style.background = 'var(--fendm-bg-light)'
            }}
            onMouseOut={e => {
              if (activeSection !== sec.id) e.currentTarget.style.background = 'transparent'
            }}
          >
            <span style={{ flexShrink: 0 }}>{sec.icon}</span>
            <span>Section {sec.id}: {sec.title.split(' ').slice(2).join(' ') || sec.title}</span>
          </button>
        ))}
      </div>

      {/* ── Content area ───────────────────────────────────────────────── */}
      <div style={{ flex: 1 }}>
        {/* Section header */}
        <div style={{
          background: 'white', border: '1px solid var(--fendm-border)',
          borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: current.bg, color: current.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {current.icon}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--fendm-text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>
              Section {current.id}
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--fendm-text-dark)' }}>
              {current.title}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {current.steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: 'white', border: '1px solid var(--fendm-border)',
                borderRadius: 10, padding: '16px 20px',
                display: 'flex', gap: 16, alignItems: 'flex-start',
                transition: 'box-shadow 0.15s, transform 0.15s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Step number */}
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: current.bg, color: current.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fendm-text-dark)', marginBottom: 4 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--fendm-text-muted)', lineHeight: 1.6 }}>
                  {step.desc}
                </div>
              </div>
              <ChevronRight size={14} color={current.color} style={{ flexShrink: 0, opacity: 0.5, marginTop: 6 }} />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <button
            onClick={() => setActiveSection(s => Math.max(1, s - 1))}
            disabled={activeSection === 1}
            style={{
              padding: '9px 18px', borderRadius: 8, border: '1px solid var(--fendm-border)',
              background: 'white', cursor: activeSection === 1 ? 'not-allowed' : 'pointer',
              fontSize: 12, fontWeight: 500, color: 'var(--fendm-text-muted)',
              opacity: activeSection === 1 ? 0.4 : 1,
              transition: 'all 0.15s',
            }}
          >
            ← Section sebelumnya
          </button>
          <span style={{ fontSize: 12, color: 'var(--fendm-text-muted)', alignSelf: 'center' }}>
            {activeSection} / {sections.length}
          </span>
          <button
            onClick={() => setActiveSection(s => Math.min(sections.length, s + 1))}
            disabled={activeSection === sections.length}
            style={{
              padding: '9px 18px', borderRadius: 8, border: 'none',
              background: 'var(--fendm-primary)', cursor: activeSection === sections.length ? 'not-allowed' : 'pointer',
              fontSize: 12, fontWeight: 500, color: 'white',
              opacity: activeSection === sections.length ? 0.4 : 1,
              transition: 'all 0.15s',
            }}
          >
            Section berikutnya →
          </button>
        </div>
      </div>

    </div>
  )
}
