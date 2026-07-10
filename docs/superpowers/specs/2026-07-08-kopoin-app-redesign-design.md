# Kopoin App Redesign Design Spec

Tanggal: 2026-07-08
Status: Draft untuk review
Scope: Redesign aplikasi anggota Kopoin berbasis tab utama
Platform saat ini: Expo / React Native di `apps/mobile`

---

## 1. Ringkasan Keputusan

Redesign Kopoin diarahkan menjadi aplikasi anggota yang terasa lengkap dan natural dipakai sehari-hari, bukan hanya prototype demo linear. Demo tetap bisa diarahkan melalui wizard, tetapi struktur aplikasi utama harus berdiri sebagai produk mobile biasa.

Keputusan final dari diskusi:

| Area | Keputusan |
|---|---|
| Fokus utama | App lengkap berbasis tab, bukan demo flow linear |
| Target pengalaman | Anggota muda merasa punya tim, misi, progres, reward, voting, dan dampak |
| Bottom nav | `Beranda`, `Misi`, `Komunitas`, `Notifikasi`, `Profil` |
| Panel pengurus | Tidak diurus dulu dalam redesign ini |
| Visual direction | Mirip referensi: clean, rounded, teal, white cards, soft shadow, aksen gold |
| Ilustrasi | Disiapkan sebagai slot asset agar mudah diganti dengan ilustrasi final nanti |
| Interaksi live | Core interaction saja: gabung tim, verifikasi QR/manual, progress naik, Kopoin bertambah, leaderboard berubah, voting tersimpan, achievement/reward muncul |
| Fitur lain | Tetap tampil sebagai bagian produk, tetapi tidak semuanya harus punya aksi detail dulu |

Tujuan redesign ini adalah membuat Kopoin terlihat seperti aplikasi consumer yang matang: bukan dashboard teknis, bukan pitch deck, dan bukan loyalty app biasa. Kopoin harus langsung terasa sebagai aplikasi komunitas koperasi untuk Gen Z.

---

## 2. Latar Belakang Produk

Kopoin ingin mengubah anggota muda dari sekadar terdaftar menjadi benar-benar aktif. Selama ini koperasi sering dipakai hanya ketika orang butuh pinjaman, belanja tertentu, atau layanan administratif. Kopoin membuat koperasi terasa lebih dekat dengan kebiasaan Gen Z: ada tim, target, progres, reward, kompetisi, voting, streak, achievement, dan sesuatu yang bisa dibanggakan bersama.

Core loop produk:

```text
Gabung tim -> pilih misi -> kerjakan bersama -> aktivitas diverifikasi -> progres naik -> reward terbuka -> hasil bisa dibagikan
```

Yang dijual Kopoin bukan hanya poin. Yang dijual adalah rasa:

- Aku punya tim.
- Kontribusiku terlihat.
- Timku punya target.
- Tindakanku membantu koperasi.
- Suaraku ikut menentukan.
- Hasilnya bisa kami nikmati bersama.

Redesign harus membuat rasa tersebut muncul dari layar pertama, bukan hanya dari teks penjelasan.

---

## 3. Prinsip Desain Produk

### 3.1 App first, demo second

Aplikasi utama harus terasa seperti produk sungguhan. Wizard demo boleh mengarahkan juri atau user ke momen penting, tetapi layar utama tidak boleh terasa seperti urutan slide demo.

Implikasi:

- Bottom nav mengikuti pola aplikasi mobile umum.
- Setiap tab punya tujuan jelas.
- Pengguna bisa membuka tab dalam urutan bebas tanpa merusak narasi.
- State demo tetap disinkronkan agar perubahan terlihat di semua tab.

### 3.2 Social before solo

Kopoin bukan aplikasi saldo poin pribadi saja. Hampir semua layar perlu menunjukkan konteks tim, komunitas, atau kontribusi bersama.

Implikasi:

- `Tim Pemuda Sukamaju` harus sering muncul sebagai identitas pengguna.
- Poin pribadi selalu dikaitkan dengan progres tim.
- Reward utama ditampilkan sebagai reward bersama, bukan hanya voucher individual.
- Leaderboard dan voting bukan fitur tambahan, tetapi bagian dari pengalaman utama.

### 3.3 Utility must be concrete

Gen Z perlu melihat manfaat konkret. Angka seperti `Rp40.000 hemat bulan ini`, `6 hari lagi`, `34 anggota ikut`, dan `74% target Kopi Sukamaju` lebih mudah dipahami daripada narasi panjang.

Implikasi:

- Kupon aktif dan penghematan harus tampil di Beranda atau Profil.
- Reward milestone harus jelas: apa yang sudah terbuka, apa yang hampir terbuka.
- Catatan dampak harus berbasis data yang tersedia, tidak hiperbolis.

### 3.4 Verified contribution

Gamifikasi hanya berarti jika aktivitas dipercaya. QR, kode manual, check-in, validasi pengurus, atau integrasi data perlu ditampilkan sebagai bagian produk.

Implikasi:

- Layar Misi harus punya bagian verifikasi aktivitas.
- Feedback validasi harus jelas: sukses, duplikat, invalid, atau belum gabung tim.
- Duplicate guard tetap dipertahankan untuk narasi anti-curang.

### 3.5 Warm, premium, not corporate

Kopoin untuk anggota muda harus terasa ramah dan membanggakan, bukan sistem administrasi koperasi.

Implikasi visual:

- Background terang/off-white, bukan dark dashboard.
- Card putih rounded dengan soft border/shadow.
- Teal sebagai identitas utama.
- Gold untuk reward, badge, dan milestone.
- Copywriting pendek, aktif, dan mudah dibaca.
- Ilustrasi besar ditempatkan sebagai slot visual yang playful.

---

## 4. Scope Redesign

### 4.1 Masuk Scope

Redesign mencakup app anggota dengan 5 tab utama:

| Tab | Fungsi utama |
|---|---|
| Beranda | Ringkasan status anggota, tim, misi aktif, Kopoin, streak, kupon, impact, CTA utama |
| Misi | Daftar misi, progress campaign, verifikasi QR/manual, reward bersama, dampak tim |
| Komunitas | Tim komunitas, leaderboard, voting komunitas, community unlock, share/team wrap |
| Notifikasi | Feed update aktivitas, reward, voting, kupon, validasi, streak |
| Profil | Data anggota, tim, achievement, streak, referral aktif, kupon/penghematan, kontrol demo ringan |

Interaksi live yang wajib dijaga:

- User bisa bergabung dengan `Tim Pemuda Sukamaju`.
- User bisa menjalankan misi produk lokal melalui QR/manual code.
- Validasi berhasil menambah Kopoin.
- Validasi berhasil menaikkan progress campaign.
- Validasi berhasil mengubah posisi leaderboard.
- Validasi berhasil membuka achievement.
- Voting bisa dipilih dan persentase berubah.
- Perubahan state terlihat konsisten di Beranda, Misi, Komunitas, Notifikasi, dan Profil.

Fitur wajib yang harus tampak di UI:

- Tim Komunitas.
- Misi Bersama.
- Verifikasi Aktivitas.
- Kopoin dan Reward.
- Leaderboard Komunitas.
- Referral berbasis anggota aktif.
- Streak.
- Achievement.
- Voting Komunitas.
- Reward Bersama / Community Unlock.
- Catatan Dampak.
- Kupon dan Catatan Penghematan.

### 4.2 Keluar Scope Sekarang

Bagian ini sengaja tidak menjadi fokus redesign saat ini:

- Panel Pengurus redesign.
- Marketplace lengkap.
- Sistem pembayaran.
- Dompet digital.
- SHU atau penyimpanan uang pengguna.
- AR photobooth.
- Sticker karakter.
- Collectible kompleks.
- AI recommendation.
- Group buying.
- Campaign figur pemerintah sebagai fondasi utama.

Panel Pengurus boleh tetap ada di codebase sebagai screen existing, tetapi tidak perlu masuk bottom nav dan tidak perlu dipoles dalam fase redesign ini.

---

## 5. Referensi Visual

Referensi gambar yang diberikan menunjukkan tiga arah layar utama:

1. `Misi & Reward Bersama`
2. `Voting Komunitas`
3. `Leaderboard Komunitas`

Karakter visual yang perlu diadopsi:

| Elemen | Arah desain |
|---|---|
| Header | Logo Kopoin kiri, judul screen tengah/kiri, bell kanan |
| Background | Putih hangat atau off-white dengan nuansa soft |
| Card | Rounded besar, putih, border tipis, shadow lembut |
| Primary color | Teal / turquoise |
| Accent | Gold/yellow untuk reward, badge, progress milestone |
| Typography | Bold untuk headline, readable untuk body, angka dibuat menonjol |
| Layout | Mobile-first, vertical scroll, section cards yang jelas |
| Bottom nav | Floating, putih, icon outline, tab aktif diberi teal capsule |
| Illustration | Visual besar di hero card, bisa diganti asset final nanti |

Yang tidak perlu ditiru secara literal:

- Semua ikon harus sama persis.
- Semua ilustrasi harus final sejak awal.
- Semua ukuran harus identik dengan image.
- Komposisi tablet/desktop tidak perlu menjadi prioritas.

Yang harus terasa sama:

- Bersih, terang, ramah.
- Banyak kartu informatif.
- Fokus pada misi, komunitas, reward, dan progres.
- Teal sebagai warna brand yang dominan.
- App terasa seperti consumer mobile, bukan internal dashboard.

---

## 6. Information Architecture

### 6.1 Bottom Navigation

```text
Beranda | Misi | Komunitas | Notifikasi | Profil
```

Tab behavior:

- Tab aktif memakai capsule teal/mint seperti referensi.
- Tab nonaktif memakai icon outline dan label abu gelap.
- Bottom nav floating di atas safe area bawah.
- Tidak ada tab `Console` dalam redesign user-facing.
- `Panel Pengurus` tidak diprioritaskan.

### 6.2 Top Header Pattern

Setiap tab memakai header konsisten:

```text
[kopoin logo] [screen title] [bell/status icon]
```

Variasi:

- `Beranda`: title bisa berupa greeting atau kosong dengan headline di hero.
- `Misi`: title `Misi & Reward Bersama`.
- `Komunitas`: title bisa berubah antara `Komunitas`, `Voting Komunitas`, atau `Leaderboard Komunitas` tergantung section prioritas.
- `Notifikasi`: title `Notifikasi`.
- `Profil`: title `Profil Anggota`.

### 6.3 Data State Global

State yang sekarang ada di `DemoState` tetap menjadi pusat sinkronisasi:

- `hasJoinedTeam`
- `scanCompleted`
- `user`
- `team`
- `campaign`
- `missions`
- `leaderboard`
- `activityLedger`
- `latestActivity`
- `latestCompletion`
- `usedQrCodes`
- `userVote`
- `verificationLogs`
- `votePoll`

Redesign boleh menambah data seed presentational untuk:

- Kupon aktif.
- Achievement list.
- Streak detail.
- Referral progress.
- Notification feed.
- Reward milestones.
- Mission task progress.
- Impact metrics.

Penambahan data harus mock-consistent, bukan klaim integrasi produksi.

---

## 7. Screen Design Detail

## 7.1 Beranda

### Tujuan

Beranda menjadi ringkasan harian pengguna: apa statusku, timku sedang mengejar apa, apa aksi terbaik berikutnya, dan manfaat apa yang sudah terasa.

Beranda harus menjawab dalam 5 detik:

- Gabriel anggota tim apa?
- Misi aktif apa yang paling penting?
- Berapa Kopoin dan penghematan yang ia punya?
- Tim sedang seberapa dekat ke reward bersama?
- Apa tindakan berikutnya?

### Layout

Urutan section:

1. Header brand.
2. Greeting + member/team summary.
3. Hero card misi aktif.
4. Quick stats: Kopoin, streak, hemat bulan ini, rank tim.
5. Team card: `Tim Pemuda Sukamaju`.
6. Kupon/penghematan card.
7. Impact receipt singkat.
8. Voting teaser atau achievement teaser.

### Hero Card Beranda

Konten:

- Badge: `Misi Aktif`.
- Title: `Gerakan Belanja Lokal` atau nama campaign aktif.
- Body: `Bersama dukung UMKM lokal dan bangun ekonomi yang lebih kuat.`
- Progress: `74 / 100 aksi` atau `73 / 100 aksi` sesuai state.
- CTA sebelum join: `Gabung Tim`.
- CTA setelah join: `Ikut Misi`.
- CTA setelah scan: `Bagikan Progress` atau `Lihat Dampak`.
- Slot ilustrasi: toko UMKM/produk lokal.

State behavior:

| State | Tampilan |
|---|---|
| Belum gabung tim | CTA utama `Gabung Tim Pemuda Sukamaju`; progress tetap terlihat sebagai target komunitas |
| Sudah gabung, belum scan | CTA utama `Ikut Misi`; tampilkan misi produk lokal |
| Sudah scan | CTA utama `Bagikan Progress`; tampilkan `+120 Kopoin`, achievement, dan impact |

### Quick Stats

Stat yang ditampilkan:

- `1.730` atau `1.850 Kopoin`.
- `3 minggu streak`.
- `Rp37.500 hemat bulan ini`.
- `Rank #3` atau `Rank #2`.

Quick stats harus berbentuk card kecil 2x2, bukan tabel.

### Kupon dan Penghematan

Konten:

- `Kupon aktif`: contoh `Voucher Kopi Sukamaju 10%`.
- `Hampir kedaluwarsa`: contoh `2 hari lagi`.
- `Total hemat bulan ini`: `Rp37.500`.
- `Total hemat sejak bergabung`: seed presentational, contoh `Rp184.000`.

Catatan:

- Kopoin tidak disebut SHU.
- Tidak ada saldo uang pengguna.
- Penghematan adalah manfaat reward/kupon, bukan rekening.

### Impact Receipt Singkat

Contoh copy:

- Sebelum scan: `Aksi berikutnya akan membantu target Kopi Sukamaju mendekati 100 transaksi.`
- Setelah scan: `Pembelianmu membantu target Kopi Sukamaju mencapai 74%. Tim kamu mendukung 2 UMKM lokal.`

Impact harus jujur berdasarkan state yang ada.

---

## 7.2 Misi

### Tujuan

Tab Misi adalah pusat core loop. Di sinilah pengguna melihat misi tim, menyelesaikan aksi, memverifikasi aktivitas, melihat progress naik, dan memahami reward bersama.

Layar ini paling dekat dengan referensi `Misi & Reward Bersama`.

### Layout

Urutan section:

1. Header `Misi & Reward Bersama`.
2. Hero campaign card.
3. Task list `Tugas Misi`.
4. Verification card QR/manual.
5. Reward bersama milestone.
6. Dampak tim.
7. Share progress row.

### Hero Campaign Card

Konten:

- Badge: `Misi Aktif`.
- Title: `Gerakan Belanja Lokal`.
- Description: `Bersama dukung UMKM lokal dan bangun ekonomi yang lebih kuat.`
- Progress: contoh `73 / 100 aksi` sebelum scan, `74 / 100 aksi` setelah scan.
- Percentage: `73%` atau `74%`.
- Deadline: `6 hari lagi` atau menggunakan `campaign.deadlineLabel` yang dibuat ringkas.
- Members: `34 anggota ikut` atau seed sesuai state.
- CTA: `Ikut Misi`, `Validasi Sekarang`, atau `Sudah Diverifikasi`.
- Slot ilustrasi: toko UMKM lokal.

### Tugas Misi

Daftar task harus memberi kesan banyak cara berpartisipasi, bukan hanya belanja.

Task minimal:

| Task | Deskripsi | Progress | Reward |
|---|---|---:|---:|
| Beli produk lokal | Dukung produk UMKM anggota | `8/10` | `+120 poin` |
| Ajak anggota aktif | Undang teman ke komunitas | `3/5` | `+80 poin` |
| Check-in ke koperasi | Check-in mingguan di aplikasi | `5/7` | `+60 poin` |
| Selesaikan pembelajaran | Tuntaskan modul edukasi | `2/4` | `+70 poin` |

Catatan:

- Progress task boleh presentational.
- Task `Beli produk lokal` terhubung ke QR/manual verification live.
- Task lain tampil sebagai fitur wajib tetapi tidak harus interaktif penuh dulu.

### Verification Card

Fungsi:

- Membuktikan bahwa aktivitas tidak asal klaim.
- Menjaga duplicate guard.
- Memberi fallback demo yang stabil.

Konten:

- Status pill: `Ready`, `Verified`, `Blocked`, atau `Invalid`.
- Kamera QR jika permission tersedia.
- Fallback code input.
- Button `Scan Kode Demo`.
- Button `Validasi Kode Manual`.
- Feedback message.
- Duplicate guard summary.
- Verification log ringkas.

State behavior:

| Kondisi | Feedback |
|---|---|
| Belum gabung tim | `Gabung tim dulu sebelum validasi.` |
| Code invalid | `Kode tidak terdaftar pada campaign Sukamaju.` |
| Code valid pertama | `Kontribusi berhasil diverifikasi. +120 Kopoin masuk.` |
| Code duplikat | `Kode ini sudah tercatat. Duplicate guard aktif.` |
| Sudah selesai | `Aksi demo sudah tercatat. Reset demo untuk mengulang before-after.` |

### Reward Bersama

Milestone reward mengikuti referensi:

| Milestone | Reward | State |
|---:|---|---|
| `5.000 poin` | Voucher Belanja | Terbuka |
| `8.000 poin` | Badge Tim | Dalam progress |
| `10.000 poin` | Diskon UMKM Lokal | Terkunci |

Progress text:

- `6.250 poin terkumpul dari 10.000 poin` untuk visual referensi.
- Atau `74/100 aksi menuju Kupon Bersama Produk Lokal` bila mengikuti data campaign.

Keputusan implementasi nanti bisa memilih satu bentuk utama, tetapi UI harus mengomunikasikan reward bersama, bukan hanya reward personal.

### Dampak Tim

Metrics minimal:

- `34 anggota sudah berkontribusi`.
- `Rp2.400.000 dukungan ke produk lokal`.
- `2 UMKM terbantu`.

Setelah scan, card dampak boleh menyorot kontribusi Gabriel:

- `Pembelianmu membantu target Kopi Sukamaju mencapai 74%.`
- `Tim kamu naik ke #2.`

---

## 7.3 Komunitas

### Tujuan

Tab Komunitas memperlihatkan rasa bersama: tim, ranking, voting, community unlock, dan share achievement. Ini adalah tab sosial utama Kopoin.

Tab ini menggabungkan referensi `Voting Komunitas` dan `Leaderboard Komunitas`, tetapi tidak perlu membuat dua tab terpisah.

### Layout

Urutan section:

1. Header `Komunitas`.
2. Team identity card.
3. Segmented control: `Leaderboard`, `Voting`, `Tim` atau section stacked dalam satu scroll.
4. Leaderboard podium.
5. My team rank card.
6. Voting komunitas.
7. Reward komunitas progress.
8. Team Wrap / Share achievement.

Untuk MVP visual, section stacked lebih sederhana dan aman. Segmented control bisa dibuat presentational jika terlalu banyak interaksi.

### Team Identity Card

Konten:

- `Tim Pemuda Sukamaju`.
- Tipe: `Desa` atau `Komunitas`.
- `34 anggota aktif`.
- `Target minggu ini: Dukung produk lokal`.
- Status: `Kamu sudah bergabung` atau CTA `Gabung Tim`.

### Leaderboard

Leaderboard harus menilai kontribusi, bukan hanya nominal belanja.

Faktor skor yang perlu dikomunikasikan:

- Anggota aktif.
- Misi selesai.
- Referral berhasil.
- Konsistensi.
- Dukungan produk lokal.
- Partisipasi voting/pembelajaran.

Podium top 3:

- Rank 1: tim unggulan.
- Rank 2: bisa menjadi `Tim Pemuda Sukamaju` setelah scan.
- Rank 3: tim lain.

My team card:

- Nama tim.
- Rank saat ini.
- Total Kopoin/skor.
- Anggota aktif.
- Referral sukses.
- Copy: `450 Kopoin lagi menuju peringkat berikutnya` atau update sesuai state.

State behavior:

| State | Tampilan |
|---|---|
| Sebelum scan | Tim berada di rank #3, CTA `Naikkan Peringkat` |
| Setelah scan | Tim naik ke rank #2, highlight `Aksi Gabriel masuk ke skor tim` |

### Voting Komunitas

Voting harus menunjukkan bahwa anggota punya suara.

Kategori voting yang perlu tampil:

- `Misi Berikutnya`.
- `Produk Lokal`.
- `Reward Bersama`.

Untuk interaksi live MVP, satu poll saja yang aktif memakai state `votePoll`. Poll lain bisa tampil sebagai card ringkas atau tab presentational.

Konten poll utama:

- Title: `Pilih reward komunitas berikutnya` atau `Misi Komunitas Bulan Depan`.
- Options dengan progress bar dan persentase.
- Jumlah suara.
- Deadline: `Selesai 2 hari lagi`.
- CTA: `Pilih Sekarang`.
- Setelah dipilih: `Voting tersimpan` dan persentase berubah.

Catatan narasi:

- Voting ini untuk campaign/reward komunitas.
- Bukan keputusan formal RAT.
- Tidak menggantikan tata kelola legal koperasi.

### Community Unlock

Konten:

- Reward bersama yang sedang dikejar.
- Progress bar.
- Target berikutnya.
- Label level, contoh `Level 3`.
- Copy: `Kumpulkan Kopoin bersama untuk membuka hadiah berikutnya.`

### Share Achievement / Team Wrap

Konten:

- `Kopoin Team Wrap`.
- Headline setelah scan: `Tim Pemuda Sukamaju naik ke #2`.
- Stats: rank, skor, Kopoin, voting.
- CTA: `Bagikan Progress`.

Untuk fase ini, CTA share boleh belum memanggil native share. Yang penting card shareable sudah ada dan bisa ditunjukkan.

---

## 7.4 Notifikasi

### Tujuan

Tab Notifikasi membuat app terasa hidup dan memberi alasan untuk kembali. Feed ini mengikat misi, reward, voting, kupon, dan streak.

### Layout

Urutan section:

1. Header `Notifikasi`.
2. Summary cards: `2 voting aktif`, `1 kupon hampir kedaluwarsa`, `streak aman minggu ini`.
3. Notification feed.

### Notification Types

Jenis notifikasi yang perlu tampil:

| Tipe | Contoh copy |
|---|---|
| Misi | `Misi Gerakan Belanja Lokal tinggal 26 aksi lagi.` |
| Verifikasi | `Transaksi Kopi Sukamaju berhasil diverifikasi. +120 Kopoin.` |
| Reward | `Voucher Bersama makin dekat terbuka untuk timmu.` |
| Voting | `Voting reward komunitas masih aktif 2 hari lagi.` |
| Kupon | `Kupon Kopi Sukamaju kedaluwarsa dalam 2 hari.` |
| Streak | `Streak 3 minggu aman. Ikut voting untuk menjaga konsistensi.` |
| Leaderboard | `Tim Pemuda Sukamaju naik ke peringkat #2.` |
| Referral | `Nadia hampir menjadi anggota aktif. Reward referral terbuka setelah onboarding selesai.` |

### State Behavior

Sebelum scan:

- Feed menampilkan misi aktif, voting aktif, kupon aktif, dan ajakan validasi.

Setelah scan:

- Feed menampilkan verified activity, Kopoin bertambah, leaderboard naik, achievement terbuka.

Setelah voting:

- Feed menampilkan pilihan voting tersimpan.

Notification feed boleh dibuat dari kombinasi seed statis dan state dinamis.

---

## 7.5 Profil

### Tujuan

Profil menampilkan identitas anggota, status tim, achievement, streak, referral, kupon, dan kontrol demo ringan. Profil bukan tempat utama misi, tetapi memperkuat rasa pencapaian personal.

### Layout

Urutan section:

1. Header `Profil Anggota`.
2. Member card.
3. Kopoin balance + savings summary.
4. Team membership card.
5. Achievement grid/list.
6. Streak card.
7. Referral aktif.
8. Coupon/history summary.
9. Demo controls: replay wizard, reset demo.

### Member Card

Konten:

- Nama: `Gabriel`.
- Status: `Anggota Aktif`.
- Member number: `KMP-SKM-0001`.
- Koperasi: `Koperasi Merah Putih Sukamaju`.
- Level: `Level 3`.
- Avatar initial atau visual badge.

### Achievement

Achievement yang perlu tampil:

| Nama | Kondisi | State |
|---|---|---|
| Anak Lokal, Selera Global | Mendukung produk desa | Terbuka setelah scan |
| Racun Positif | Membawa 3 anggota aktif | Progress |
| Tidak Cuma Wacana | Menyelesaikan 7 misi | Progress |
| Warga Paling Gercep | Peserta awal campaign | Terbuka/presentational |

Achievement harus terasa shareable. Minimal ada CTA `Bagikan Achievement` pada achievement yang terbuka.

### Streak

Streak tidak boleh memaksa belanja terus.

Sumber streak yang bisa ditampilkan:

- Menyelesaikan misi.
- Voting komunitas.
- Check-in koperasi.
- Mendukung produk lokal.
- Menyelesaikan pembelajaran.

Copy contoh:

- `3 minggu aktif dukung produk desa`.
- `Minggu ini streak bisa dijaga lewat voting atau belajar, tidak harus transaksi.`

### Referral Aktif

Referral harus berbasis anggota aktif.

Konten:

- `3 teman diajak`.
- `2 sudah onboarding`.
- `1 transaksi pertama menunggu`.
- Copy: `Reward referral baru terbuka setelah temanmu aktif.`

### Demo Controls

Karena app ini masih MVP hackathon, Profil boleh menyimpan kontrol:

- `Replay Wizard`.
- `Reset Demo`.

Kontrol ini sebaiknya dibuat kecil dan tidak mendominasi UI consumer.

---

## 8. Visual System

### 8.1 Color Tokens

Warna saat ini di `theme.ts` sudah dekat, tetapi perlu diarahkan ke tampilan terang.

Token yang direkomendasikan:

| Token | Fungsi | Contoh |
|---|---|---|
| `background` | App background terang | `#F8FBFA` atau `#FBFAF4` |
| `surface` | Card utama | `#FFFFFF` |
| `surfaceMint` | Card highlight lembut | `#EAFBF7` |
| `surfaceGold` | Reward highlight lembut | `#FFF6DA` |
| `ink` | Text utama | `#101828` atau existing ink yang lebih soft |
| `muted` | Text sekunder | `#667085` |
| `teal` | Primary brand | existing `#0F6B63` |
| `turquoise` | CTA/progress | existing `#19A88E` |
| `gold` | Reward/badge | existing `#F4B400` |
| `line` | Border halus | `#E6ECEA` |

Dark background existing tidak perlu menjadi dasar app utama. Bisa tetap dipakai untuk kamera QR atau aksen kecil.

### 8.2 Typography

Karena tidak ada font custom di dependency saat ini, gunakan font default React Native dengan weight yang konsisten.

Hierarchy:

| Level | Size | Weight | Fungsi |
|---|---:|---:|---|
| Display | 30-36 | 900 | Hero title |
| Title | 22-26 | 800/900 | Section title |
| Body | 14-16 | 500/600 | Copy utama |
| Meta | 11-13 | 700/800 | Label, badge, helper |
| Number | 24-32 | 900 | Kopoin, rank, progress |

Copy harus pendek. Hindari paragraf panjang di card mobile.

### 8.3 Card System

Jenis card:

| Card | Style |
|---|---|
| Hero card | Rounded 28-34, mint/white gradient feel, illustration slot |
| Section card | White, radius 22-28, shadow soft, border halus |
| Stat card | White/mint/gold soft, angka besar |
| Action card | Teal CTA, high contrast |
| Feed item | White, icon circle, timestamp, concise copy |

Shadow harus lembut dan tidak berlebihan. Android `elevation` tetap rendah.

### 8.4 Icon and Illustration Strategy

Fase ini tidak menambah library icon wajib.

Pilihan implementasi nanti:

- Gunakan icon text sederhana di circle visual.
- Gunakan shape illustration slot buatan StyleSheet.
- Siapkan `Image` slot untuk asset final saat tersedia.

Slot ilustrasi minimal:

- UMKM/toko lokal untuk hero misi.
- Komunitas/orang untuk voting/komunitas.
- Trophy/gift untuk leaderboard/reward.
- Member/profile visual untuk Profil.

Setiap slot harus punya ukuran tetap agar layout tidak berubah saat asset final masuk.

### 8.5 Mobile Responsiveness

Target utama mobile portrait.

Aturan:

- Semua screen harus scrollable.
- Bottom nav tidak menutup konten terakhir.
- Card tidak bergantung pada lebar fixed besar.
- Row 2 kolom harus bisa wrap pada layar sempit.
- Text panjang harus wrap aman.
- CTA utama mudah ditekan.

---

## 9. Interaction Model

### 9.1 Join Team

Trigger:

- CTA `Gabung Tim` di Beranda, Misi, atau Komunitas.

State update:

- `hasJoinedTeam = true`
- `user.teamId = team.id`

UI update:

- CTA berubah dari `Gabung Tim` ke `Ikut Misi`.
- Team card menampilkan status `Kamu sudah bergabung`.
- Misi verification tidak lagi diblokir karena belum gabung.

### 9.2 Submit Mission via QR/Manual

Trigger:

- QR camera scan.
- Button `Scan Kode Demo`.
- Button `Validasi Kode Manual`.

State sukses:

- `scanCompleted = true`
- `campaign.currentValue` naik dari 73 ke 74.
- `user.kopoinBalance` naik dari 1730 ke 1850.
- `user.achievementUnlocked = true`.
- `leaderboard` berubah ke versi after.
- `activityLedger` bertambah activity Gabriel.
- `latestActivity` terisi.
- `latestCompletion` terisi.
- `usedQrCodes` menyimpan code.
- `verificationLogs` menambah log verified.

UI update sukses:

- Misi menampilkan verified status.
- Beranda menampilkan balance baru dan impact receipt.
- Komunitas menampilkan rank baru.
- Notifikasi menampilkan verified activity.
- Profil membuka achievement `Anak Lokal, Selera Global`.

### 9.3 Duplicate and Invalid Guard

Code invalid:

- Tidak menambah Kopoin.
- Tidak mengubah progress.
- Menambah `verificationLogs` status rejected.
- Feedback merah/amber sesuai tone.

Code duplikat:

- Tidak menambah Kopoin kedua kali.
- Tidak mengubah progress kedua kali.
- Menambah `verificationLogs` status blocked.
- Feedback menjelaskan duplicate guard.

### 9.4 Voting

Trigger:

- User memilih option dalam poll komunitas.

State update:

- `userVote` terisi atau berubah.
- Vote count option lama dikurangi jika user mengganti pilihan.
- Vote count option baru bertambah.
- Percent recalculated.

UI update:

- Option selected diberi highlight teal.
- Feedback: `Voting tersimpan`.
- Notifikasi menampilkan voting tersimpan.
- Team Wrap menampilkan pilihan voting.

### 9.5 Achievement Share

Fase ini:

- Card achievement/shareable ditampilkan.
- CTA `Bagikan` boleh menjadi visual/action ringan.

Fase berikutnya:

- Bisa memakai native share, image capture, atau route share screen.

---

## 10. Data and Content Requirements

### 10.1 Existing Data yang Dipakai

Data existing yang sudah cukup untuk core loop:

- User Gabriel.
- Koperasi Merah Putih Sukamaju.
- Tim Pemuda Sukamaju.
- Campaign 7 Hari Dukung Produk Koperasi Sukamaju.
- Misi Beli Produk Lokal.
- QR/manual valid code.
- Leaderboard before/after.
- Activity ledger.
- Verification logs.
- Vote poll.
- Team wrap data.

### 10.2 Data Presentational yang Perlu Ditambah

Untuk app terasa lengkap, perlu seed presentational berikut:

#### Mission Tasks

```text
Beli produk lokal, Ajak anggota aktif, Check-in ke koperasi, Selesaikan pembelajaran
```

Fields:

- `id`
- `title`
- `description`
- `current`
- `target`
- `points`
- `type`
- `status`

#### Reward Milestones

Fields:

- `id`
- `pointsRequired`
- `title`
- `description`
- `status`: unlocked, current, locked

#### Coupons

Fields:

- `id`
- `title`
- `description`
- `savingValue`
- `expiresInLabel`
- `status`: active, expiring, used

#### Achievements

Fields:

- `id`
- `title`
- `description`
- `progressLabel`
- `status`: unlocked, progress, locked
- `shareable`

#### Referral Summary

Fields:

- `invitedCount`
- `onboardedCount`
- `activeCount`
- `pendingActivationCount`
- `rewardLabel`

#### Notifications

Fields:

- `id`
- `type`
- `title`
- `body`
- `timestampLabel`
- `tone`
- `sourceState`: static, afterScan, afterVote

#### Impact Metrics

Fields:

- `localSupportValue`
- `supportedUmkmCount`
- `activeContributorCount`
- `productTargetPercent`

### 10.3 Content Tone

Tone harus:

- Singkat.
- Optimistis.
- Komunitas-first.
- Tidak terlalu formal.
- Tidak menjanjikan benefit finansial yang tidak ada.
- Tidak menyebut Kopoin sebagai SHU.
- Tidak menyebut app menyimpan uang.

Contoh copy yang cocok:

- `Kontribusimu masuk ke progres tim.`
- `Tim kamu makin dekat membuka voucher bersama.`
- `Streak bisa dijaga lewat voting atau belajar, bukan belanja saja.`
- `Reward referral terbuka setelah temanmu aktif.`
- `Pembelianmu membantu target Kopi Sukamaju mencapai 74%.`

Contoh copy yang harus dihindari:

- `Saldo uang kamu bertambah.`
- `SHU kamu naik.`
- `Pasti dapat keuntungan.`
- `Belanja terus agar streak tidak putus.`
- `Voting menentukan keputusan resmi koperasi.`

---

## 11. Current Codebase Impact

### 11.1 Files Relevant Saat Ini

File penting di app:

| File | Peran saat ini |
|---|---|
| `apps/mobile/App.tsx` | State root, tab navigation, hydration, handlers |
| `src/theme.ts` | Color, radius, spacing, shadow tokens |
| `src/data/kopoinSeed.ts` | Types dan seed data utama |
| `src/services/demoState.ts` | Join team, submit mission, voting, reset |
| `src/services/teamWrap.ts` | Data share/team wrap |
| `src/services/adminDashboard.ts` | Data console pengurus existing |
| `src/screens/HomeDashboardScreen.tsx` | Beranda existing |
| `src/screens/MissionHubScreen.tsx` | Misi existing |
| `src/screens/CommunityHubScreen.tsx` | Komunitas existing |
| `src/screens/ProductionQRScreen.tsx` | QR/manual verification existing |
| `src/screens/ProfileControlScreen.tsx` | Profil/control existing |
| `src/screens/JudgeWizardScreen.tsx` | Wizard demo existing |

### 11.2 Recommended Architecture

Tetap minimal dan pragmatis:

- Pertahankan `App.tsx` sebagai root state untuk fase ini.
- Ubah `TabId` menjadi `home | mission | community | notifications | profile`.
- Jangan tampilkan `console` di bottom nav.
- Biarkan screen `CampaignConsoleDashboardScreen` ada, tetapi tidak menjadi bagian nav utama.
- Tambahkan `NotificationsScreen` baru.
- Redesign `HomeDashboardScreen`, `MissionHubScreen`, `CommunityHubScreen`, `ProfileControlScreen`.
- Pertahankan `ProductionQRScreen`, tetapi ubah style agar cocok dengan visual terang.
- Tambahkan component UI kecil bila benar-benar membantu konsistensi, seperti `AppHeader`, `BottomTabBar`, `StatCard`, `IllustrationSlot`, `RewardMilestone`, `NotificationItem`.

Aturan minimalisme:

- Jangan membuat design system besar.
- Jangan menambah dependency UI icon jika bisa dihindari.
- Jangan memecah komponen terlalu banyak jika hanya dipakai sekali.
- Gunakan component reusable hanya untuk pattern yang muncul di banyak screen.

### 11.3 State Compatibility

State existing cukup kuat untuk core interaction. Redesign sebaiknya tidak mengubah logic utama kecuali untuk menambah seed presentational.

Handlers existing yang tetap dipakai:

- `handleJoinTeam`
- `handleDemoScan`
- `handleScannedCode`
- `handleSubmitMission`
- `handleSubmitVote`
- `handleResetDemo`
- `handleFinishWizard`

Storage existing tetap:

- `kopoin-demo-state-v2`
- `kopoin-wizard-seen-v2`

Jika format `DemoState` berubah, storage key sebaiknya dinaikkan agar state lama tidak merusak app. Namun jika hanya menambah data optional/presentational di runtime, key bisa tetap.

---

## 12. Acceptance Criteria

### 12.1 Product Acceptance

Redesign dianggap berhasil jika:

- App terlihat seperti aplikasi anggota lengkap, bukan demo slide.
- Bottom nav berisi `Beranda`, `Misi`, `Komunitas`, `Notifikasi`, `Profil`.
- Visual terasa dekat dengan referensi: clean, white cards, teal/gold, rounded, soft.
- User bisa memahami core loop tanpa penjelasan panjang.
- Panel Pengurus tidak mengganggu experience user-facing.
- Semua fitur wajib tampak dalam UI, meskipun tidak semua interaktif penuh.
- Core interaction tetap live dan sinkron antar tab.

### 12.2 Flow Acceptance

Flow yang harus berjalan:

1. User membuka app.
2. User melihat Beranda dengan tim/misi/reward context.
3. User bergabung dengan tim.
4. User membuka Misi.
5. User validasi kode QR/manual.
6. User mendapat Kopoin.
7. Progress campaign naik.
8. Leaderboard berubah di Komunitas.
9. Achievement terbuka di Profil.
10. User memilih voting di Komunitas.
11. Notifikasi mencerminkan aktivitas penting.
12. User bisa reset/replay wizard dari Profil untuk kebutuhan demo.

### 12.3 Visual Acceptance

Kriteria visual:

- Tidak ada background gelap dominan pada app utama.
- Header dan bottom nav konsisten.
- CTA utama jelas dan kontras.
- Card tidak terasa padat seperti admin dashboard.
- Progress bar dan angka mudah dilihat.
- Semua layar nyaman discroll di mobile.
- Layout tidak pecah ketika text Indonesia cukup panjang.

### 12.4 Technical Acceptance

Kriteria teknis:

- TypeScript typecheck lolos.
- Tidak ada dependency baru tanpa kebutuhan kuat.
- Tidak ada error runtime saat membuka semua tab.
- QR/manual fallback tetap bekerja.
- Duplicate guard tetap bekerja.
- Voting tetap mengubah percent.
- AsyncStorage hydration tetap aman.
- Existing wizard tidak rusak.

---

## 13. Testing Plan

### 13.1 Manual Test Path

Test utama:

1. Start app.
2. Lewati atau selesaikan wizard.
3. Buka Beranda.
4. Tekan `Gabung Tim`.
5. Pastikan CTA berubah menjadi `Ikut Misi`.
6. Buka Misi.
7. Submit kode valid `KOPI-SUKAMAJU-001`.
8. Pastikan success feedback muncul.
9. Pastikan Kopoin naik dari `1.730` ke `1.850`.
10. Pastikan progress campaign naik dari `73` ke `74`.
11. Buka Komunitas.
12. Pastikan rank tim berubah dari `#3` ke `#2`.
13. Pilih voting.
14. Pastikan option selected dan percent berubah.
15. Buka Notifikasi.
16. Pastikan aktivitas verified/voting muncul.
17. Buka Profil.
18. Pastikan achievement terbuka.
19. Submit kode yang sama lagi.
20. Pastikan duplicate guard memblokir poin kedua.
21. Reset demo dari Profil.
22. Pastikan state kembali awal.

### 13.2 Edge Cases

Edge cases yang perlu dicek:

- Submit misi sebelum gabung tim.
- Submit kode kosong.
- Submit kode invalid.
- Submit kode valid dua kali.
- Ganti pilihan voting.
- App reload setelah state tersimpan.
- Permission kamera ditolak.
- Layar sempit dengan text panjang.

### 13.3 Commands

Verifikasi minimal:

```bash
npm run typecheck
```

Jika demo script masih dipakai:

```bash
npm run rehearse
```

Commands dijalankan dari `apps/mobile`.

---

## 14. Implementation Phasing Recommendation

Dokumen ini bukan implementation plan, tetapi fase pengerjaan yang disarankan adalah:

### Phase 1: Foundation Visual

- Update `theme.ts` ke light-first tokens.
- Update `App.tsx` bottom nav menjadi 5 tab user-facing.
- Buat header/nav visual konsisten.
- Pastikan safe area dan scroll spacing aman.

### Phase 2: Redesign Main Tabs

- Redesign Beranda.
- Redesign Misi.
- Redesign Komunitas.
- Tambahkan Notifikasi.
- Redesign Profil.

### Phase 3: Data Completeness

- Tambah seed presentational untuk coupons, achievements, referral, reward milestones, mission tasks, notifications.
- Pastikan state after scan dan after vote tercermin di semua screen.

### Phase 4: Polish and Verification

- Rapikan spacing, typography, shadows, empty states.
- Test manual flow.
- Run typecheck.
- Pastikan wizard tetap bisa dipakai sebagai demo guide.

Panel Pengurus tetap ditunda sampai ada keputusan baru.

---

## 15. Risks and Mitigations

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Scope melebar karena semua fitur ingin interaktif | Redesign lama selesai dan polish turun | Interaksi live dibatasi ke core loop |
| UI terlalu mirip dashboard teknis | Tidak cocok untuk Gen Z | Light theme, card consumer, copy pendek |
| Terlalu banyak text dalam card | Layar terasa berat | Gunakan angka, badge, dan CTA singkat |
| Ilustrasi belum final | UI terasa belum selesai | Pakai slot ilustrasi rapi dengan ukuran tetap |
| Panel pengurus terlupakan untuk pitch | Demo kelembagaan kurang kuat | Existing console tetap bisa dipakai nanti, tapi tidak masuk redesign user-facing sekarang |
| Voting disalahartikan sebagai keputusan legal | Risiko narasi koperasi | Copy jelas: voting untuk campaign/reward, bukan RAT |
| Streak dianggap memaksa belanja | Bertentangan dengan prinsip produk | Tampilkan streak bisa dijaga via voting, belajar, check-in |
| Leaderboard dianggap pay-to-win | Mengurangi nilai sosial | Tampilkan breakdown skor non-transaksi |

---

## 16. Final Product Narrative

Setelah redesign, Kopoin harus bisa diceritakan seperti ini:

Gabriel membuka Kopoin dan langsung melihat bahwa ia bagian dari Tim Pemuda Sukamaju. Timnya sedang menjalankan Gerakan Belanja Lokal. Ia melihat target tim, reward bersama, streak, kupon, dan dampak yang sudah berjalan.

Saat Gabriel membeli Kopi Sukamaju dan memverifikasi QR atau kode transaksi, app tidak hanya memberi poin. App menunjukkan bahwa Kopoin Gabriel bertambah, progress tim naik, leaderboard berubah, achievement terbuka, dan kontribusinya membantu target produk lokal.

Di tab Komunitas, Gabriel melihat posisi tim, voting yang sedang berjalan, dan reward bersama yang makin dekat. Di Profil, ia melihat pencapaian, streak, referral aktif, dan penghematan. Di Notifikasi, ia mendapat alasan untuk kembali: voting aktif, kupon hampir kedaluwarsa, reward hampir terbuka, dan timnya bergerak.

Dengan begitu, Kopoin terasa bukan sekadar loyalty app. Kopoin menjadi pengalaman koperasi yang sosial, aktif, bermanfaat, dan bisa dibanggakan bersama.

---

## 17. Design Lock for Current Redesign

Keputusan yang dikunci untuk fase ini:

- App utama adalah app anggota lengkap, bukan demo linear.
- Bottom nav final untuk fase ini: `Beranda`, `Misi`, `Komunitas`, `Notifikasi`, `Profil`.
- Panel Pengurus tidak dikerjakan dulu.
- Visual mengikuti referensi dengan light theme, teal/gold, rounded cards, floating bottom nav.
- Ilustrasi disiapkan sebagai slot asset.
- Core interaction live: join team, QR/manual verification, progress/Kopoin/leaderboard update, voting, achievement/reward state.
- Fitur wajib lain tampil sebagai section produk yang matang, walaupun belum semua punya aksi detail.

Dokumen ini menjadi dasar untuk implementation plan berikutnya setelah direview dan disetujui.
