# Tooltip Simulasi Terpandu untuk Dewan Juri

Tanggal: 2026-07-11
Status: Diimplementasikan

## Tujuan

Simulasi Terpandu membantu dewan juri memahami kekuatan Kopoin sambil memakai aplikasi yang sebenarnya. Simulasi bukan menu, presentasi, atau versi aplikasi yang berbeda. Saat tooltip ditutup, seluruh layar, fungsi, navigasi, dan state tetap sama.

Pesan yang harus dipahami juri:

1. Kopoin adalah lapisan aktivasi anggota muda, bukan dompet atau pengganti SIMKOPDES.
2. Aksi anggota diubah menjadi misi yang jelas dan dapat diverifikasi.
3. Satu aksi memengaruhi poin pribadi, progres tim, reward bersama, dan leaderboard.
4. Voting memberi anggota peran dalam menentukan campaign atau reward komunitas.
5. State yang sama menjadi data dampak yang dapat dibaca pengurus koperasi.

## Prinsip interaksi

- Tooltip tampil di atas layar aplikasi yang asli.
- Latar diredupkan dan komponen asli diberi spotlight serta caret yang menunjuk ke target.
- Target yang disorot tetap dapat ditekan; area di luar target ditahan selama langkah aksi wajib.
- Menutup tooltip hanya mengakhiri penuntun, bukan mengubah atau mereset aplikasi.
- Tidak ada duplikasi fitur, route presentasi, atau handler khusus yang menghasilkan hasil palsu.
- Perpindahan layar dan scroll hanya membawa juri ke komponen asli yang hendak dijelaskan.
- Progress tooltip disimpan agar aman terhadap reload dan dapat diulang dari Profil.

## Alur 12 tooltip

| Langkah | Layar dan target asli | Pesan utama | Interaksi |
|---|---|---|---|
| 1 | Beranda | Kopoin menghubungkan aksi anggota, progres komunitas, reward, dan data koperasi. | Berikutnya |
| 2 | Saldo anggota | Manfaat dan identitas anggota terlihat dari satu beranda. | Berikutnya |
| 3 | Kartu gabung tim | Tim mengubah kontribusi pribadi menjadi gerakan bersama. | **Wajib tekan target** |
| 4 | Banner campaign di Misi | Misi memberi alasan yang jelas dan terukur untuk kembali aktif. | Berikutnya |
| 5 | Tombol `Scan Kode Demo` | QR/kode memverifikasi kontribusi dan duplicate guard mencegah hitungan ganda. | **Wajib tekan target** |
| 6 | Ringkasan dampak | Satu verifikasi menambah Kopoin, progres, achievement, dan rank. | Berikutnya |
| 7 | Milestone reward | Kontribusi individu mendekatkan manfaat untuk seluruh tim. | Berikutnya |
| 8 | Voting reward | Anggota ikut menentukan campaign atau reward komunitas berikutnya. | **Wajib pilih opsi** |
| 9 | Leaderboard | Kompetisi sehat membuat konsistensi dan kontribusi tim terlihat. | Berikutnya |
| 10 | Team Wrap | Pencapaian diubah menjadi identitas dan cerita komunitas. | Berikutnya |
| 11 | KPI Campaign Console | Pengurus membaca progres, anggota aktif, verifikasi, dan voting dari state yang sama. | Berikutnya |
| 12 | Activity ledger dan verification log | Core loop anggota berakhir sebagai bukti dampak yang dapat dipantau. | Selesai |

Tiga aksi wajib—bergabung tim, scan kode demo, dan voting—selesai berdasarkan perubahan `DemoState`, bukan timer. Tombol lanjut baru aktif setelah handler normal aplikasi berhasil mengubah state.

## Perilaku tooltip dan motion

- Card masuk dengan fade dan translate ringan sekitar 340 ms.
- Spotlight melakukan pulse lembut dua kali, lalu berhenti.
- Tooltip memakai caret yang mengarah ke pusat target dan berpindah ke atas/bawah agar target tetap terlihat.
- Perpindahan scroll dilakukan deterministik sebelum target diukur ulang.
- Jika `Reduce Motion` aktif, pulse dinonaktifkan dan transisi dipersingkat menjadi opacity sederhana.
- Jika pengukuran target gagal, instruksi tetap muncul tanpa membuat aplikasi macet.

## State dan recovery

- Simulasi membaca dan mengubah `DemoState` yang sama dengan aplikasi normal.
- Tombol tutup mempertahankan join, hasil scan, voting, poin, progres, dan log yang sudah terjadi.
- `Ulangi Simulasi Terpandu` memulai lagi penuntun dari langkah pertama tanpa mengubah data aplikasi.
- `Reset Demo State` mengembalikan data demo untuk rehearsal baru.
- Jalur scan demo tetap tersedia bila kamera atau jaringan tidak dapat digunakan.
- Integrasi SIMKOPDES pada MVP tetap mock/local dan tidak diklaim sebagai integrasi produksi.

## Acceptance criteria

- Tidak ada layar pembuka atau menu khusus untuk menjalankan fungsi tiruan.
- Aplikasi dapat dipakai bebas dengan hasil yang sama setelah tooltip ditutup atau selesai.
- Semua 12 tooltip menunjuk komponen aplikasi yang nyata.
- Join, scan, dan voting tidak dapat dilewati melalui tombol `Berikutnya` sebelum aksi selesai.
- Scan `KOPI-SUKAMAJU-001` menghasilkan `+120 Kopoin`, progres `73/100` menjadi `74/100`, achievement, dan rank `#3` menjadi `#2`.
- Duplicate guard tetap mencegah pemberian poin kedua.
- Team Wrap dan Campaign Console membaca hasil dari state yang sama.
- Typecheck, automated guided check, dan tiga rehearsal lulus.
