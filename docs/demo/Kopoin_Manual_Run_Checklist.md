# Kopoin Manual Run Checklist

Checklist ini dipakai sebelum rekam video demo, rehearsal pitch, atau handoff ke anggota tim lain.

## Setup

- [ ] Buka terminal di root repository.
- [ ] Masuk ke folder app: `cd apps/mobile`.
- [ ] Install dependency jika belum: `npm install`.
- [ ] Jalankan typecheck: `npm run typecheck`.
- [ ] Jalankan sanity rehearsal: `npm run rehearse -- 1`.
- [ ] Jalankan app: `npm start`.
- [ ] Scan QR terminal dengan Expo Go di perangkat target.
- [ ] Pastikan tidak ada error blocking di terminal.

## Sanity Rehearsal Otomatis

- [ ] Jalankan `npm run rehearse -- 1`.
- [ ] Jalankan `npm run rehearse -- 2`.
- [ ] Jalankan `npm run rehearse -- 3`.
- [ ] Pastikan ketiganya menampilkan status `PASS`.
- [ ] Jalankan web export jika perlu cek bundle: `npx expo export --platform web --output-dir dist --clear`.
- [ ] Catat hasilnya di rehearsal log.

## Demo Core Loop

- [ ] App terbuka di Beranda normal dan tooltip Simulasi Terpandu tampil di atasnya.
- [ ] Spotlight meredupkan latar, menyorot fitur asli, dan caret tooltip mengarah ke target.
- [ ] Tutup tooltip lalu pastikan Beranda dan seluruh fungsi tetap dapat dipakai normal.
- [ ] Dari Profil, tekan `Ulangi Simulasi Terpandu` untuk kembali ke langkah pertama.
- [ ] Selesaikan alur 12 langkah sampai Campaign Console.
- [ ] Pada langkah aksi wajib, tombol lanjut terkunci sampai target asli ditekan.
- [ ] Kartu anggota Gabriel tampil.
- [ ] Koperasi Merah Putih Sukamaju tampil.
- [ ] Tekan `Gabung Tim Pemuda Sukamaju`.
- [ ] App berpindah ke tab `Misi`.
- [ ] Misi menampilkan campaign `7 Hari Dukung Produk Koperasi Sukamaju`.
- [ ] Progress awal terlihat `73/100`.
- [ ] Jika kamera tersedia, tekan `Izinkan Kamera` lalu `Buka Kamera`.
- [ ] Jika kamera tidak dipakai, tekan `Scan Kode Demo`.
- [ ] Success feedback menampilkan `+120 Kopoin`.
- [ ] Saldo berubah `1.730 -> 1.850`.
- [ ] Progress berubah `73/100 -> 74/100`.
- [ ] Achievement `Anak Lokal, Selera Global` terbuka.
- [ ] Buka tab `Komunitas`.
- [ ] Leaderboard menampilkan Tim Pemuda Sukamaju rank #2.
- [ ] Buka tab `Console`.
- [ ] Campaign Console activity ledger menampilkan Gabriel.

## Fallback dan Guard

- [ ] Submit ulang `KOPI-SUKAMAJU-001` setelah sukses.
- [ ] Duplicate guard tampil dan poin/progress tidak bertambah lagi.
- [ ] Masukkan `KOPI-SUKAMAJU-999` setelah reset/join jika ingin cek invalid code.
- [ ] Verification log menampilkan `rejected` untuk kode invalid.
- [ ] Buka tab `Profil`.
- [ ] Tekan `Reset Demo` dan pastikan state kembali ke progress `73/100`, saldo `1.730`, rank #3.

## Voting dan Team Wrap

- [ ] Pilih salah satu reward voting.
- [ ] Opsi terpilih menampilkan label `Pilihan kamu`.
- [ ] Persentase voting berubah.
- [ ] Buka tab `Console`.
- [ ] Campaign Console KPI `Partisipasi Voting` berubah menjadi `1`.
- [ ] Team Wrap tampil screenshot-ready.
- [ ] Team Wrap menampilkan rank, score, progress, badge, vote, dan CTA.

## Campaign Console

- [ ] KPI cards tampil rapi.
- [ ] Progress reward bersama tampil.
- [ ] Performa tim menyorot Tim Pemuda Sukamaju.
- [ ] Kinerja misi membaca activity ledger.
- [ ] QR verification log menampilkan `verified`, `blocked`, atau `rejected` sesuai skenario.
- [ ] Sync note menjelaskan aksi Gabriel sudah sinkron ke KPI dan leaderboard.

## Catatan Risiko Demo

- [ ] Jika app reload, state terakhir tetap tersedia karena AsyncStorage aktif.
- [ ] Jika kamera QR tidak tersedia, gunakan fallback manual code.
- [ ] Jika native share belum tersedia, tampilkan Team Wrap sebagai screenshot-ready card.
- [ ] Jika dashboard admin perlu ditunjukkan, buka tab `Console`.

## Status Siap Rekam

- [ ] Flow utama selesai tanpa crash minimal 3 kali.
- [ ] Copy utama terbaca jelas.
- [ ] Data demo konsisten: Sukamaju, Gabriel, Tim Pemuda Sukamaju, Kopi Sukamaju.
- [ ] Tidak ada klaim integrasi SIMKOPDES produksi.
- [ ] Audit log sudah diperbarui.
