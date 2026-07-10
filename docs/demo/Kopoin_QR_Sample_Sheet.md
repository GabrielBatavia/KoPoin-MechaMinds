# Kopoin QR Sample Sheet

Dokumen ini dipakai untuk rehearsal dan perekaman demo MVP Kopoin. MVP sekarang memiliki jalur kamera QR melalui Expo Camera, tetapi kode di bawah tetap dipakai sebagai fallback manual yang stabil apabila permission/device juri bermasalah.

## Data Campaign

| Item | Nilai |
|---|---|
| User demo | Gabriel |
| Tim | Tim Pemuda Sukamaju |
| Koperasi | Koperasi Merah Putih Sukamaju |
| Campaign | 7 Hari Dukung Produk Koperasi Sukamaju |
| Misi utama | Beli Produk Lokal |
| Produk | Kopi Sukamaju |

## Kode Valid

| Label Demo | Kode | Expected Result |
|---|---|---|
| QR valid utama | `KOPI-SUKAMAJU-001` | Verifikasi sukses, +120 Kopoin, progress 73/100 ke 74/100, rank #3 ke #2. |
| QR valid alias | `KOPI-SUKAMAJU-QR-001` | Verifikasi sukses jika dipakai dari state awal/reset. |

## Kode Invalid dan Guard

| Skenario | Kode | Expected Result |
|---|---|---|
| Produk tidak terdaftar | `KOPI-SUKAMAJU-999` | Feedback error, verification log `rejected`, poin/progress tidak berubah. |
| Kode kosong | kosongkan input | Feedback error, verification log `rejected`, poin/progress tidak berubah. |
| Submit sebelum gabung tim | `KOPI-SUKAMAJU-001` sebelum tekan join | Feedback error, verification log `blocked`, poin/progress tidak berubah. |
| Duplicate setelah sukses | `KOPI-SUKAMAJU-001` kedua kali | Feedback duplicate guard, verification log `blocked`, poin/progress tidak bertambah dua kali. |

## Urutan Demo QR yang Disarankan

1. Tekan `Reset Demo`.
2. Tekan `Gabung Tim Pemuda Sukamaju`.
3. Buka tab `Misi`.
4. Tekan `Scan Kode Demo` atau pastikan input manual berisi `KOPI-SUKAMAJU-001` lalu tekan `Validasi Kode Manual`.
5. Tunjukkan success screen, leaderboard, Team Wrap, dan Campaign Console.
6. Jika ingin menunjukkan guard, tekan `Scan Kode Demo` lagi dengan kode yang sama.
7. Jika ingin rehearsal ulang, tekan `Reset Demo`.

## Catatan Narasi

Gunakan kalimat aman saat demo:

> Untuk hackathon ini, QR memakai kamera Expo jika tersedia dan fallback kode manual untuk stabilitas demo. Alurnya mensimulasikan verifikasi kontribusi yang nantinya dapat dihubungkan ke data transaksi atau verifikasi resmi SIMKOPDES ketika akses integrasi tersedia.
