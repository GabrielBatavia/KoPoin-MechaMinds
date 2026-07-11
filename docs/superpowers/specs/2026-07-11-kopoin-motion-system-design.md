# Kopoin Motion System Design Spec

Tanggal: 2026-07-11
Status: Disetujui untuk perencanaan implementasi
Scope: Motion system aplikasi anggota Kopoin
Platform: Expo 53 / React Native 0.79

---

## 1. Ringkasan Keputusan

Kopoin akan memakai perpaduan `Precision Motion` dan `Reactive Gamified Motion`. Gerakan dasar harus terasa clean dan premium, sedangkan efek gamified hanya muncul saat pengguna melakukan aksi penting atau mencapai sesuatu.

Motion tidak boleh menjadi dekorasi yang berjalan terus-menerus. Setiap animasi harus membantu pengguna memahami salah satu dari tiga hal:

- Elemen mana yang baru muncul atau aktif.
- Apakah tindakan pengguna berhasil atau gagal.
- Bagaimana kontribusi pengguna mengubah poin, misi, reward, atau posisi tim.

Target utama adalah perangkat Android kelas menengah. Android low-end tetap didukung melalui animasi yang disederhanakan dan dukungan Reduce Motion.

---

## 2. Tujuan

Motion system ini bertujuan untuk:

- Membuat Kopoin terasa modern, profesional, dan responsif.
- Memberi kepuasan pada momen QR berhasil, misi selesai, poin bertambah, reward terbuka, dan rank naik.
- Membuat guided demo lebih mudah diikuti tanpa terasa seperti slide presentasi.
- Menjaga bahasa gerak konsisten di semua layar.
- Mempertahankan scroll, navigasi, dan interaksi yang ringan pada Android kelas menengah.
- Menghormati preferensi aksesibilitas Reduce Motion.

---

## 3. Non-goals

Fase ini tidak mencakup:

- Confetti atau particle system layar penuh.
- Video background.
- Blur yang dianimasikan.
- Parallax kompleks.
- Ilustrasi 3D atau physics simulation.
- Penambahan Lottie, Reanimated, Moti, atau library animasi lain.
- Perubahan business logic, data, navigasi, atau alur fitur.
- Haptic feedback baru karena `expo-haptics` belum menjadi dependency aplikasi.
- Animasi dekoratif tanpa hubungan dengan state atau tindakan pengguna.

---

## 4. Prinsip Motion

### 4.1 Motion harus menjelaskan perubahan

Animasi berjalan sebagai konsekuensi perubahan state. Feedback sukses tidak boleh mendahului hasil aksi. Feedback gagal tidak boleh memakai bahasa visual reward.

### 4.2 Premium melalui presisi

Kesan premium berasal dari jarak gerak pendek, timing konsisten, easing lembut, dan urutan yang jelas. Gerakan tidak memakai bounce besar atau overshoot berlebihan.

### 4.3 Gamifikasi hanya pada momen bernilai

Efek gamified digunakan untuk:

- Poin bertambah.
- Misi selesai.
- QR berhasil diverifikasi.
- Reward terbuka.
- Rank tim naik.
- Achievement pertama kali terbuka.

Efek yang sama tidak diputar ulang hanya karena screen dirender ulang.

### 4.4 Satu fokus pada satu waktu

Dalam satu momen, maksimal ada satu animasi utama dan dua respons pendukung. Maksimal tiga elemen bergerak bersamaan agar perhatian dan performa tetap terjaga.

### 4.5 State tetap jelas tanpa animasi

Semua perubahan harus tetap bisa dipahami ketika Reduce Motion aktif atau animasi tidak sempat berjalan. Motion memperjelas state, bukan menjadi satu-satunya pembawa informasi.

---

## 5. Motion Tokens

Token berikut menjadi sumber nilai bersama. Nilai final boleh disesuaikan sedikit saat pengujian perangkat, tetapi tidak boleh dibuat berbeda-beda per screen tanpa alasan interaksi yang jelas.

| Token | Nilai awal | Penggunaan |
|---|---:|---|
| `duration.instant` | 90 ms | Press feedback |
| `duration.fast` | 160 ms | Icon, pill, selection |
| `duration.base` | 220 ms | Reveal dan transisi komponen |
| `duration.slow` | 360 ms | Progress dan perubahan state utama |
| `duration.celebration` | 700-900 ms | Reward, rank, achievement |
| `distance.reveal` | 8-12 px | Konten masuk |
| `scale.press` | 0.98 | Tombol dan kartu interaktif |
| `scale.emphasis` | 1.015-1.025 | Highlight pencapaian |
| `stagger.default` | 60 ms | Kelompok kecil |
| `stagger.maximumItems` | 5 item | Batas reveal berurutan |

Spring menggunakan damping/friction yang cukup tinggi agar tetap lembut dan tidak memantul seperti mainan. Timing animation menggunakan easing ease-out untuk masuk dan ease-in untuk keluar.

---

## 6. Arsitektur Motion

Implementasi tetap memakai React Native `Animated` yang sudah digunakan codebase. Tidak ada dependency runtime baru.

### 6.1 Motion tokens

Satu modul motion menyimpan duration, easing, spring, scale, distance, dan stagger. Screen tidak menulis angka timing acak secara langsung.

### 6.2 `MotionPressable`

Wrapper interaksi standar untuk tombol dan kartu:

- Scale ke `0.98` ketika ditekan.
- Kembali dengan spring ringan ketika dilepas.
- Tidak mengubah handler atau disabled state komponen.
- Reduce Motion mempertahankan feedback warna/opacity tanpa spring.

### 6.3 `Reveal`

Wrapper untuk kemunculan konten:

- Kombinasi opacity dan translate 8-12 px.
- Bisa menerima delay yang dibatasi oleh token stagger.
- Hanya berjalan saat elemen pertama kali menjadi relevan.
- Tidak dipakai untuk setiap item pada list panjang.

### 6.4 `AnimatedNumber`

Digunakan untuk saldo Kopoin, poin reward, skor, dan persentase:

- Hanya berjalan ketika nilai berubah.
- Durasi dibatasi agar tidak tertinggal dari state aktual.
- Menampilkan nilai final langsung ketika Reduce Motion aktif.
- Tidak dipakai untuk timestamp, nomor anggota, atau angka statis.

### 6.5 `RewardFeedback`

Komponen feedback bersama untuk momen pencapaian:

- Checkmark spring ringan.
- Badge `+Poin` naik singkat lalu menghilang.
- Glow teal atau gold satu kali.
- Varian untuk mission, reward, achievement, dan rank.
- Memerlukan event/state transition baru agar tidak terpicu ulang karena rerender.

### 6.6 Reduce Motion

Hook `useReduceMotion` yang sudah ada menjadi pengendali global. Saat aktif:

- Loop dimatikan.
- Stagger dihapus.
- Floating badge dan spring diganti perubahan instan atau fade sangat singkat.
- Informasi sukses, gagal, progress, dan rank tetap terlihat lengkap.

---

## 7. Pemetaan Motion per Area

| Area | Precision Motion | Reactive Gamified Motion |
|---|---|---|
| Onboarding | Logo fade-scale dan CTA reveal | Progress langkah bergerak halus |
| Guided demo | Pergantian instruksi 220 ms | Spotlight hanya pada target aktif |
| Beranda | Hero dan kartu utama reveal terukur | Saldo count-up ketika nilainya berubah |
| Mission Hub | Selection, card reveal, progress fill | Checkmark, `+Poin`, dan glow saat misi selesai |
| QR | Scanner aktif memakai satu loop transform | Frame hijau dan pulse sekali setelah berhasil |
| Leaderboard | Perubahan baris memakai translate/opacity | Highlight teal-gold dan badge rank baru |
| Redeem | Panel/section masuk dari bawah | Stamp reward dan perubahan saldo sekali |
| Riwayat | Item baru masuk dari atas | Badge baru memudar setelah dilihat |
| Profil | Pergantian section sederhana | Achievement shimmer sekali saat pertama terbuka |
| Bottom navigation | Icon aktif naik 2 px | Indikator aktif bergerak mengikuti tab |

---

## 8. Koreografi Momen Utama

### 8.1 QR berhasil dan misi selesai

Urutan:

1. Scanner berhenti.
2. Frame berubah ke warna sukses dalam 160 ms.
3. Checkmark muncul dengan spring ringan.
4. Progress misi bergerak ke nilai baru dalam 360 ms.
5. Badge `+Poin` naik dan menghilang.
6. Saldo menampilkan count-up ke nilai akhir.

Total koreografi maksimal 900 ms. State sukses harus sudah tercatat sebelum urutan dimulai.

### 8.2 Rank tim naik

Urutan:

1. Skor baru tampil.
2. Baris tim bergerak ke representasi posisi baru atau melakukan transisi translate/opacity yang setara.
3. Background mendapat highlight teal-gold maksimal 700 ms.
4. Badge `Naik ke #N` muncul dan menetap sebagai informasi state.

Jika true layout reordering tidak stabil di Android target, implementasi memakai cross-fade dan translate yang memberikan narasi perubahan tanpa animasi layout kompleks.

### 8.3 Reward atau achievement terbuka

Urutan:

1. State terkunci berubah ke terbuka.
2. Badge melakukan scale `0.98 -> 1.02 -> 1` dengan overshoot kecil.
3. Glow atau shimmer berjalan satu kali.
4. CTA share/redeem menjadi aktif.

Animasi tidak diulang ketika pengguna kembali ke screen yang sama.

### 8.4 Kegagalan dan duplikasi

- Pesan gagal muncul melalui fade 160 ms.
- Input atau card boleh melakukan shake horizontal pendek satu kali.
- Tidak ada count-up, glow gold, checkmark, atau floating points.
- Kode duplikat tidak mengubah saldo/progress dan tidak memutar ulang reward feedback.

---

## 9. Aturan Performa

### 9.1 Properti yang dianimasikan

Utamakan properti yang kompatibel dengan native driver:

- `opacity`
- `transform.translateX`
- `transform.translateY`
- `transform.scale`
- `transform.scaleX`

Progress bar menggunakan `scaleX` dari anchor kiri, bukan mengubah width setiap frame. Shadow, blur, border radius, dan layout besar tidak dianimasikan terus-menerus.

### 9.2 Batas concurrency

- Maksimal tiga elemen bergerak bersamaan.
- Stagger hanya untuk 4-5 item pertama.
- List panjang tampil langsung atau memakai satu reveal pada container.
- Satu screen tidak boleh menjalankan lebih dari satu loop dekoratif.

### 9.3 Lifecycle loop

Loop hanya boleh berjalan untuk status aktif seperti scanner atau indikator live. Loop harus dihentikan ketika:

- Screen tidak aktif.
- Modal menutup konteksnya.
- App masuk background.
- Reduce Motion aktif.
- Status aktif selesai.

Codebase saat ini sudah memiliki loop di onboarding, autentikasi, dan Mission Hub. Implementasi perlu memberi lifecycle yang jelas dan cleanup, bukan menambah loop baru di atas pola yang ada.

### 9.4 Target pengalaman

- Press feedback mulai terasa dalam 100 ms.
- Transisi screen/component utama selesai sekitar 220-240 ms.
- Feedback pencapaian selesai dalam 700-900 ms.
- Scroll dan touch tetap responsif selama animasi.
- Tidak ada animasi yang menunda navigasi atau update state.

---

## 10. State dan Data Flow

Motion dipicu dari transisi state, bukan dari render komponen semata.

Contoh event yang valid:

```text
mission pending -> mission verified
balance 1730 -> balance 1850
campaign progress 73 -> 74
rank 3 -> rank 2
achievement locked -> achievement unlocked
```

Komponen perlu membandingkan nilai sebelumnya dan nilai baru atau menerima event id yang unik. Setelah animasi selesai, event dianggap telah dikonsumsi sehingga rerender, hydration, atau kembali ke tab tidak memutarnya ulang.

Remote success dan fallback lokal menggunakan koreografi yang sama karena keduanya menghasilkan state akhir yang sama. Error backend tidak boleh memicu reward feedback sebelum fallback lokal benar-benar berhasil menghasilkan perubahan state.

---

## 11. Prioritas Implementasi

### Fase 1: Foundation

- Motion tokens.
- `MotionPressable`.
- `Reveal`.
- Integrasi `useReduceMotion`.
- Lifecycle dan cleanup loop existing.

### Fase 2: Core reward loop

- QR sukses/gagal.
- Misi selesai.
- Progress bergerak.
- Poin dan saldo count-up.
- Duplicate guard tanpa replay reward.

### Fase 3: Community feedback

- Leaderboard rank transition.
- Reward dan achievement unlock.
- Redeem feedback.

### Fase 4: Navigation polish

- Bottom navigation.
- Onboarding.
- Guided demo.
- Riwayat dan profil.

Urutan ini memprioritaskan momen yang paling menjelaskan nilai Kopoin sebelum dekorasi transisi umum.

---

## 12. Testing Strategy

### 12.1 Automated checks

Verifikasi minimal dari folder `mobile`:

```bash
npm run typecheck
npm run rehearse
npm run test:guided
```

Test helper atau service perlu memastikan:

- Reduce Motion mematikan loop, pulse, floating badge, dan stagger.
- Satu transaksi hanya menghasilkan satu reward event.
- Kode duplikat tidak menghasilkan event poin baru.
- Motion config menghasilkan token yang valid dan konsisten.

### 12.2 Manual flow

Pengujian manual mencakup:

1. Onboarding dan guided demo.
2. Gabung tim.
3. QR atau kode valid.
4. QR atau kode invalid.
5. Kode valid yang dikirim dua kali.
6. Progress dan saldo berubah.
7. Leaderboard naik dari rank sebelumnya.
8. Reward atau achievement terbuka.
9. Redeem reward.
10. App masuk background ketika loop aktif.
11. Semua flow dengan Reduce Motion aktif.

### 12.3 Perangkat target

- Android kelas menengah sebagai target kualitas utama.
- Android low-end atau emulator dengan resource terbatas untuk menguji mode sederhana.
- Expo web hanya untuk memastikan tidak ada runtime error; performa visual utama dinilai pada Android.

---

## 13. Acceptance Criteria

Motion system dianggap berhasil jika:

- Visual tetap clean dan premium saat tidak ada pencapaian aktif.
- QR sukses, misi selesai, poin bertambah, dan rank naik terasa berbeda serta memuaskan.
- Tidak ada perubahan fitur, data, atau business logic.
- Tidak ada dependency animasi baru.
- Tidak ada confetti penuh layar, blur bergerak, video background, atau particle system.
- Tidak ada loop yang tetap berjalan pada screen tidak aktif atau saat app berada di background.
- Daftar panjang tidak menjalankan animasi per item tanpa batas.
- Satu transaksi tidak dapat memicu reward feedback dua kali.
- Error dan duplicate state tidak memakai bahasa visual sukses.
- Reduce Motion mempertahankan seluruh informasi dan interaksi.
- Typecheck, rehearsal, dan guided demo checks tetap lulus.
- Scroll dan navigasi tetap responsif pada Android kelas menengah.

---

## 14. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Animasi tersebar dengan timing berbeda | App terasa tidak konsisten | Semua nilai berasal dari motion tokens |
| Loop tetap berjalan di background | Baterai dan frame rate menurun | Lifecycle cleanup dan batas satu loop per screen |
| Reward diputar ulang saat rerender | Poin terasa tidak dapat dipercaya | Trigger berdasarkan state transition/event id |
| Terlalu banyak elemen masuk berurutan | Screen terasa lambat | Stagger maksimal lima item |
| Layout animation tidak stabil di Android | Leaderboard terlihat patah | Fallback cross-fade dan translate |
| Reduce Motion menghilangkan informasi | State tidak dipahami pengguna | Selalu sediakan text, warna, icon, dan nilai final |
| Count-up tertinggal dari state | Saldo terlihat salah sementara | Durasi dibatasi dan selalu berakhir pada nilai final |

---

## 15. Design Lock

Keputusan yang dikunci untuk fase ini:

- Arah motion adalah clean-premium dengan reactive gamification berbasis event.
- React Native `Animated` menjadi fondasi tanpa dependency baru.
- Transform dan opacity menjadi properti animasi utama.
- Momen prioritas adalah QR, misi, poin, reward, achievement, dan leaderboard.
- Maksimal tiga elemen bergerak bersamaan.
- Loop hanya berjalan ketika status dan screen aktif.
- Reduce Motion didukung sebagai perilaku inti.
- Implementasi dilakukan bertahap mulai dari core reward loop.

Dokumen ini menjadi dasar implementation plan setelah direview oleh pengguna.
