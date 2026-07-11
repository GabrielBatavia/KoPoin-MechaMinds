# Guided Demo Wizard untuk Dewan Juri

Tanggal: 2026-07-11
Status: Disetujui untuk diturunkan ke implementation plan

## 1. Tujuan

Mengubah pembuka aplikasi Kopoin dari onboarding tiga slide menjadi **Guided Demo Mode** yang membawa dewan juri melalui cerita produk secara berurutan. Juri harus memahami:

1. masalah aktivasi anggota muda yang ingin diselesaikan;
2. posisi Kopoin sebagai lapisan aktivasi untuk ekosistem SIMKOPDES;
3. cara kerja core loop Kopoin;
4. bukti bahwa satu aksi anggota berdampak pada individu, tim, komunitas, dan pengurus koperasi.

Wizard boleh panjang. Prioritasnya adalah kejelasan narasi, aksi demo yang deterministik, dan transisi visual yang halus.

## 2. Konteks aplikasi saat ini

Implementasi saat ini sudah memiliki:

- `JudgeWizardScreen` dengan tiga slide pembuka;
- state root di `mobile/App.tsx` melalui `showWizard`, `showAuth`, `activeTab`, dan `DemoState`;
- core loop lokal/remote untuk bergabung tim, submit QR atau kode demo, voting, reset, dan sinkronisasi state;
- data demo deterministik: Gabriel, Koperasi Merah Putih Sukamaju, Tim Pemuda Sukamaju, misi Beli Produk Lokal, kode `KOPI-SUKAMAJU-001`, `+120 Kopoin`, progres `73/100 -> 74/100`, dan rank `#3 -> #2`;
- komponen `TeamWrapScreen` dan `CampaignConsoleDashboardScreen` yang dapat dipakai sebagai bukti akhir.

Masalah utama saat ini: wizard selesai sebelum core loop dimulai, tombol `Lewati` memungkinkan narasi dilewati, dan juri masuk ke flow autentikasi sebelum memahami konteks demo.

## 3. Keputusan desain

### 3.1 Pendekatan

Gunakan wizard linear berbasis checkpoint. Setiap checkpoint memiliki:

- tujuan narasi;
- satu area fokus atau satu aksi utama;
- penjelasan singkat mengapa fitur itu penting;
- tombol CTA yang menjelaskan aksi berikutnya;
- validasi state sebelum checkpoint berikutnya dibuka.

Wizard tetap berada di dalam aplikasi, bukan presentasi terpisah. Screen asli tetap menjadi sumber kebenaran sehingga perubahan state dapat dilihat langsung.

### 3.2 Kontrol akses

- First run tidak menampilkan tombol `Lewati`.
- Juri tidak diarahkan ke login/register panjang; sediakan entry point `Masuk ke Demo Juri` yang memakai state demo yang sudah ada.
- Tombol `Kembali` tersedia selama tidak merusak state yang sudah diselesaikan.
- Tap pada area yang bukan target tidak memajukan wizard.
- Eksplorasi bebas baru dibuka setelah seluruh checkpoint selesai.
- Profil tetap dapat memulai ulang demo terpandu dan mereset state demo untuk rehearsal.

### 3.3 Struktur progress

Gunakan label tahap yang bermakna, bukan hanya angka:

`Masalah` → `Solusi` → `Misi` → `Bukti` → `Dampak`.

Indikator detail tetap boleh menampilkan `Langkah 4 dari 12`, tetapi label tahap harus lebih dominan agar juri memahami posisi mereka dalam cerita.

## 4. Perjalanan juri

### Checkpoint 0 — Masalah koperasi

Copy utama:

> Koperasi sudah semakin digital. Tantangannya sekarang: bagaimana membuat anggota muda mau kembali, berkontribusi, dan merasa memiliki?

Tampilkan tiga masalah: anggota muda hanya terdaftar, kontribusi belum terlihat, dan manfaat berkoperasi belum terasa dalam keseharian.

CTA: `Lihat bagaimana Kopoin bekerja`.

### Checkpoint 1 — Posisi Kopoin

Jelaskan bahwa Kopoin adalah lapisan aktivasi anggota muda untuk ekosistem SIMKOPDES. Tegaskan bahwa Kopoin bukan pengganti SIMKOPDES dan tidak menyimpan dana pengguna. Untuk MVP hackathon, koneksi SIMKOPDES ditunjukkan melalui mock API dan mock data.

Visual utama berupa diagram sederhana:

`SIMKOPDES → Kopoin → Anggota Muda → Koperasi`.

CTA: `Mulai perjalanan anggota`.

### Checkpoint 2 — Masuk sebagai anggota demo

Tampilkan identitas Gabriel, Koperasi Merah Putih Sukamaju, dan status awal anggota. Narasi menjelaskan bahwa juri akan mengikuti satu perjalanan anggota dari aksi sampai dampaknya terbaca oleh koperasi.

CTA: `Masuk ke Demo Juri`.

### Checkpoint 3 — Bergabung dengan tim

Fokuskan spotlight pada `Gabung Tim Pemuda Sukamaju`.

Narasi: anggota tidak berjalan sendiri. Mereka membangun identitas sosial melalui tim berdasarkan desa, kampus, sekolah, organisasi, atau komunitas.

Setelah aksi berhasil:

- tombol berubah menjadi status sudah bergabung;
- kartu tim mendapat pulse lembut;
- feedback: `Kontribusimu sekarang ikut menggerakkan progres tim.`

### Checkpoint 4 — Memilih misi

Navigasikan ke tab Misi dan fokuskan campaign `7 Hari Dukung Produk Koperasi Sukamaju` serta misi `Beli Produk Lokal`.

Narasi: Kopoin mengubah ajakan untuk aktif menjadi misi yang jelas, terukur, dan mudah diselesaikan. Sorot target, poin, progres campaign, dan reward yang sedang dikejar.

CTA: `Lanjut ke verifikasi kontribusi`.

### Checkpoint 5 — Verifikasi dengan QR atau kode

Fokuskan CTA utama pada `Scan Kode Demo`. Kamera asli tetap dapat tersedia sebagai opsi sekunder, tetapi demo juri tidak boleh bergantung pada izin kamera atau koneksi perangkat.

Narasi: kontribusi tidak hanya diklaim. QR atau kode transaksi membuat aktivitas dapat diverifikasi dan dicatat.

Gunakan kode deterministik `KOPI-SUKAMAJU-001`. Setelah sukses, tampilkan success state dan baru buka tombol berikutnya setelah animasi selesai.

### Checkpoint 6 — Perubahan individu dan tim

Tampilkan perubahan yang dihasilkan oleh satu aksi:

- saldo `1.730 → 1.850`;
- progres `73/100 → 74/100`;
- achievement `Anak Lokal, Selera Global`;
- rank `#3 → #2`.

Narasi utama:

> Satu aksi tidak berhenti sebagai poin pribadi. Aksi yang sama mengubah progres tim, posisi komunitas, dan catatan dampak produk lokal.

Berikan jeda visual 1–2 detik sebelum CTA berikutnya agar angka dapat dibaca.

### Checkpoint 7 — Leaderboard komunitas

Navigasikan ke tampilan komunitas dan fokuskan Tim Pemuda Sukamaju pada leaderboard. Jelaskan bahwa leaderboard membuat kontribusi terlihat dan membangun kebanggaan tim; skor tidak boleh dipresentasikan sebagai kompetisi nominal semata.

Sorot rank, skor, progres reward bersama, dan jumlah aksi yang masih dibutuhkan.

### Checkpoint 8 — Voting reward

Fokuskan kartu voting reward. Juri memilih satu opsi untuk melihat state pilihan dan perubahan persentase.

Narasi: anggota tidak hanya menerima program dari atas, tetapi ikut memilih reward atau campaign berikutnya. Tegaskan bahwa voting ini adalah untuk campaign/reward komunitas, bukan pengganti keputusan resmi koperasi seperti RAT.

Setelah sukses tampilkan:

- pilihan aktif dengan label `Pilihan kamu`;
- persentase yang diperbarui;
- feedback `Pilihan kamu tersimpan`;
- state yang dapat dibaca Campaign Console.

### Checkpoint 9 — Reward bersama

Fokuskan milestone reward dan progress bar. Gunakan data `26 aksi lagi` dari state demo bila masih relevan.

Narasi: ketika target tercapai, manfaat dibuka untuk seluruh tim. Kontribusi satu anggota membantu membuka manfaat bersama.

### Checkpoint 10 — Bukti untuk pengurus

Buka Campaign Console sebagai checkpoint akhir kelembagaan. Tampilkan KPI, progress campaign, performa tim, activity ledger, QR verification log, dan hasil voting dari state yang sama.

Narasi:

> Kopoin bukan hanya menarik untuk anggota. Aktivitas penting juga berubah menjadi data yang dapat dipantau pengurus.

Catatan teknis: route atau wrapper untuk Campaign Console perlu dipastikan terlihat dari Guided Demo Mode walaupun panel ini tidak menjadi tab utama user-facing.

### Checkpoint 11 — Penutup core loop

Tampilkan kembali loop:

`Gabung Tim → Jalankan Misi → Verifikasi → Progres → Reward → Voting → Dampak Terbaca`.

Copy penutup:

> Kopoin membuat anggota muda tidak hanya terdaftar di koperasi, tetapi punya alasan untuk kembali, berkontribusi, dan mengajak anggota lain.

CTA akhir:

- `Ulangi demo terpandu`;
- `Buka eksplorasi aplikasi`.

## 5. Sistem spotlight dan navigasi

Wizard membutuhkan controller terpusat di `App.tsx` atau hook khusus yang menyimpan:

- checkpoint aktif;
- status checkpoint yang sudah selesai;
- target tab/screen;
- target aksi yang harus dilakukan;
- apakah juri boleh menekan CTA bebas atau harus melakukan aksi target;
- apakah mode guided sudah selesai.

Screen yang sudah memiliki aksi tetap menjadi pelaksana aksi. `App.tsx` mengorkestrasi perpindahan tab dan memberi sinyal completion berdasarkan state, bukan berdasarkan timer.

Target highlight dapat menggunakan pendekatan bertahap:

1. untuk komponen yang stabil, gunakan `ref` dan pengukuran layout;
2. untuk target yang berpindah screen, tampilkan guided card pada posisi konsisten dan gunakan highlight internal di screen;
3. bila pengukuran target gagal, fallback ke card instruksi tanpa membuat wizard macet.

Tidak perlu menambah library besar hanya untuk spotlight. Gunakan `Animated`, overlay transparan, dan komponen lokal yang konsisten dengan React Native saat ini.

## 6. Motion dan feedback

### Transisi umum

- konten masuk dengan fade dan translateY 12–16 px;
- screen berpindah dengan crossfade singkat;
- durasi konten sekitar 300–400 ms;
- jeda antar elemen 100–180 ms;
- easing ease-out atau cubic-bezier setara.

### Highlight

- pulse lembut dua kali;
- overlay gelap tidak menghilangkan keterbacaan target;
- target memiliki border/glow teal atau gold;
- hindari kedipan cepat atau animasi berulang tanpa tujuan.

### Perubahan state

- saldo dan poin memakai counting animation;
- progress bar bergerak 500–700 ms;
- success icon memakai scale 0.85 → 1.0 dan opacity;
- reward unlock memakai lift kecil dan glow teal/gold;
- confetti boleh dipakai sekali saat kontribusi terverifikasi, tidak pada setiap langkah.

### Aksesibilitas

- dukung `Reduce Motion` dengan opacity-only transition atau durasi yang lebih singkat;
- semua CTA tetap dapat diakses tanpa bergantung pada animasi;
- teks tidak boleh hilang sebelum selesai dibaca;
- area tap target minimal nyaman untuk perangkat mobile.

## 7. Error handling dan recovery

- Jika backend gagal, gunakan local demo state yang sudah menjadi fallback saat ini.
- Jika kamera ditolak, CTA `Scan Kode Demo` tetap menjadi jalur utama.
- Jika kode invalid atau duplikat, wizard tidak maju dan menjelaskan alasan secara singkat.
- Jika juri menekan kembali, checkpoint tetap menampilkan state terakhir dan menyediakan aksi aman untuk melanjutkan.
- Jika app reload setelah checkpoint tersimpan, Guided Demo Mode boleh kembali ke checkpoint terakhir atau menawarkan `Mulai ulang demo`; default harus deterministik untuk rehearsal.
- Jika target layout tidak dapat diukur, gunakan guided card statis dan jangan memblokir flow.

## 8. Non-goals

- Tidak membuat sistem presentasi video atau audio.
- Tidak menambahkan klaim integrasi SIMKOPDES produksi.
- Tidak mengubah model bisnis atau aturan poin.
- Tidak menghapus akses kamera, manual code, duplicate guard, voting, Team Wrap, atau Campaign Console.
- Tidak membuat dashboard pengurus menjadi bagian dari bottom navigation utama.

## 9. Acceptance criteria

### Narasi

- Juri melihat masalah sebelum fitur.
- Juri memahami Kopoin sebagai lapisan aktivasi, bukan penyimpan dana.
- Juri melihat hubungan antara aksi individu, progres tim, reward bersama, dan data pengurus.
- Juri tidak dapat menyelesaikan first-run demo hanya dengan melewati semua langkah.

### Interaksi

- Join team, scan demo, voting, dan navigasi checkpoint bekerja pada state demo yang sama.
- Kode `KOPI-SUKAMAJU-001` menghasilkan `+120 Kopoin`, progres `73/100 -> 74/100`, achievement, dan rank `#3 -> #2`.
- Duplicate guard tetap mencegah poin kedua.
- Setelah checkpoint akhir, eksplorasi bebas dapat dibuka.
- Wizard dapat diulang dan state dapat di-reset dari Profil.

### Visual

- Setiap checkpoint memiliki transition yang smooth dan tidak mengganggu pembacaan.
- Highlight target terlihat jelas pada layar kecil.
- Success, progress, rank, dan reward memiliki feedback visual yang terbaca.
- Mode Reduce Motion tidak memblokir demo.

### Verifikasi teknis

- `npm run typecheck` dari `mobile` lulus.
- `npm run rehearse -- 1`, `-- 2`, dan `-- 3` tetap lulus.
- Manual QA mencakup first run, kamera ditolak, kode invalid, kode duplikat, voting, reload, reset, dan guided demo sampai Campaign Console.

## 10. Urutan implementasi

1. Tambahkan model checkpoint dan state guided demo.
2. Ubah entry wizard agar memiliki pembuka narasi dan entry `Masuk ke Demo Juri`.
3. Tambahkan guided overlay/card dan mekanisme focus target.
4. Hubungkan checkpoint dengan join team, mission scan, voting, komunitas, Team Wrap, dan Campaign Console.
5. Tambahkan motion system lokal dan Reduce Motion fallback.
6. Tambahkan recovery/replay behavior.
7. Jalankan typecheck, rehearsal, dan manual QA.
