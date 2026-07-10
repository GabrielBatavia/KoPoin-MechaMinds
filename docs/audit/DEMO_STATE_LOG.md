# Demo State Log Kopoin

Catatan kondisi demo yang wajib konsisten selama MVP.

## DEMO-STATE-001 - Core Loop Sukamaju Before/After QR

Flow yang sudah bisa dijalankan:
- Gabriel membuka Kopoin dan melihat member card.
- Gabriel menekan CTA gabung ke Tim Pemuda Sukamaju.
- Gabriel melihat misi `Beli Produk Lokal` untuk campaign `7 Hari Dukung Produk Koperasi Sukamaju`.
- Gabriel memakai fallback kode demo `KOPI-SUKAMAJU-001` atau `KOPI-SUKAMAJU-QR-001`.
- Sistem memberi feedback sukses, menambah Kopoin, menaikkan progress tim, mengubah leaderboard, dan menampilkan activity admin.
- Demo state bisa di-reset ke kondisi awal.

Data demo yang dipakai:
- User: Gabriel
- Koperasi: Koperasi Merah Putih Sukamaju
- Tim: Tim Pemuda Sukamaju
- Produk: Kopi Sukamaju
- Campaign: 7 Hari Dukung Produk Koperasi Sukamaju
- Progress sebelum scan: 73/100
- Progress setelah scan: 74/100
- Saldo sebelum scan: 1.730 Kopoin
- Saldo setelah scan: 1.850 Kopoin
- Poin scan: +120 Kopoin
- Rank sebelum scan: 3
- Rank setelah scan: 2
- Achievement: Anak Lokal, Selera Global
- Community unlock setelah scan: 26 aksi lagi

Fitur yang masih mock:
- Mock API SIMKOPDES/local store.
- QR scanner kamera; saat ini fallback manual code.
- Voting dan Team Wrap masih preview display.
- Admin Campaign Console masih preview dalam app shell, belum route/dashboard terpisah.

Fitur yang belum selesai:
- Navigation/screen terpisah.
- Campaign Console full dashboard.
- Voting interaktif.
- Team Wrap/share card final.
- QR sample sheet.
- README setup/runbook.

Bug/risiko demo:
- Dependency Expo perlu di-install sebelum app bisa dijalankan.
- Belum ada test otomatis selain typecheck.
- UI masih single-screen dan perlu polish Sprint 1/Sprint 2.

## DEMO-STATE-002 - Core Loop Setelah Split Screen Sprint 1

Flow yang sudah bisa dijalankan:
- Gabriel melihat member card dari `MemberCardScreen`.
- Gabriel gabung Tim Pemuda Sukamaju dari `TeamHomeScreen`.
- Gabriel melihat campaign progress dan misi Beli Produk Lokal dari `MissionDetailScreen`.
- Gabriel validasi kode `KOPI-SUKAMAJU-001` dari `QRFallbackScreen`.
- `SuccessStateScreen` menampilkan +120 Kopoin dan badge `Anak Lokal, Selera Global` terbuka setelah validasi.
- `LeaderboardScreen` menampilkan Tim Pemuda Sukamaju berubah dari rank 3 ke rank 2 setelah scan.
- Preview voting/reward/Team Wrap dan Campaign Console masih tampil dari state yang sama.

Data demo yang dipakai:
- Tetap memakai data DEMO-STATE-001: Gabriel, KMP Sukamaju, Tim Pemuda Sukamaju, Kopi Sukamaju, progress 73/100 ke 74/100, saldo 1.730 ke 1.850, +120 Kopoin, rank 3 ke rank 2.

Fitur yang masih mock:
- QR scanner kamera.
- Voting interaktif.
- Team Wrap/share native.
- Campaign Console full dashboard.

Fitur yang belum selesai:
- Navigation antar screen.
- Activity ledger/history lengkap.
- Duplicate guard yang tampil sebagai status khusus, bukan hanya error feedback.
- Manual test checklist per screen.

Bug/risiko demo:
- Flow masih scroll vertikal panjang, bukan route terpisah.
- Validasi interaksi belum otomatis; `npm run typecheck` sudah lulus.

## DEMO-STATE-003 - QR Ledger dan Duplicate Guard

Flow yang sudah bisa dijalankan:
- Gabriel gabung Tim Pemuda Sukamaju.
- Gabriel submit kode valid `KOPI-SUKAMAJU-001`.
- Sistem mencatat verification log `verified`, membuat ledger aksi Gabriel, menambah used QR code, menaikkan progress ke 74/100, saldo ke 1.850, achievement unlocked, dan leaderboard rank #2.
- Jika Gabriel submit kode yang sama lagi, sistem menolak dengan feedback duplicate guard dan menambah verification log `blocked` tanpa menambah poin/progress.
- Jika Gabriel submit kode invalid, sistem menambah verification log `rejected` tanpa mengubah poin/progress.
- Campaign Console preview menampilkan activity ledger dan QR verification log.

Data demo yang dipakai:
- Kode valid utama: `KOPI-SUKAMAJU-001`
- Kode valid alias: `KOPI-SUKAMAJU-QR-001`
- Used QR setelah sukses: `KOPI-SUKAMAJU-001`
- Verification status: `verified`, `rejected`, `blocked`
- Baseline activity sebelum Gabriel: Nadia dan Bima sebagai aktivitas mock admin.

Fitur yang masih mock:
- Ledger dan used QR code masih local state.
- Tidak ada persistence setelah reload.
- Belum ada kamera QR asli.

Fitur yang belum selesai:
- Activity ledger screen/table penuh.
- QR sample sheet.
- Automated interaction test untuk duplicate guard.

Bug/risiko demo:
- Jika app reload, ledger kembali ke seed awal; gunakan flow dari awal atau reset demo.
- Duplicate guard tidak mewakili anti-fraud produksi, hanya demo guard untuk mencegah poin dihitung dua kali.

## DEMO-STATE-004 - Success Impact dan Leaderboard Transition

Flow yang sudah bisa dijalankan:
- Setelah QR/manual code valid, `latestCompletion` terisi dengan dampak aksi Gabriel.
- Success screen menampilkan +120 Kopoin, saldo 1.730 ke 1.850, progress 73/100 ke 74/100, rank #3 ke #2, dan achievement `Anak Lokal, Selera Global`.
- Leaderboard menampilkan banner `Tim Pemuda Sukamaju naik peringkat` dan score delta +120.
- Row Tim Pemuda Sukamaju mendapat highlight dan animasi scale ringan saat scan berhasil.

Data demo yang dipakai:
- Points earned: 120
- Balance before/after: 1.730 -> 1.850
- Progress before/after: 73/100 -> 74/100
- Rank before/after: #3 -> #2
- Score before/after: 7.810 -> 7.930
- Achievement: Anak Lokal, Selera Global

Fitur yang masih mock:
- Animasi visual tidak memakai real event tracking.
- Completion summary masih local state.
- Leaderboard score delta memakai seed demo stabil.

Fitur yang belum selesai:
- Manual QA di emulator/device.
- Screenshot/video final untuk success dan leaderboard moment.
- Unit/integration test untuk completion summary.

Bug/risiko demo:
- Jika device lambat, animasi ringan masih aman karena hanya opacity/transform, tetapi belum diuji di emulator.

## DEMO-STATE-005 - Campaign Console Dashboard Sync

Flow yang sudah bisa dijalankan:
- Campaign Console menampilkan campaign aktif `7 Hari Dukung Produk Koperasi Sukamaju`.
- KPI admin dihitung dari state yang sama: anggota aktif, misi selesai, Kopoin dibagikan, progress campaign, log valid, dan guard aktif.
- Progress reward bersama membaca `campaign.currentValue` dan berubah dari 73/100 ke 74/100 setelah aksi Gabriel.
- Performa tim membaca leaderboard yang sama dan menyorot Tim Pemuda Sukamaju.
- Kinerja misi membaca `activityLedger` dan menampilkan misi yang punya aksi verified.
- Activity ledger dan QR verification log menampilkan Gabriel setelah kode valid, serta rejected/blocked jika invalid atau duplicate.

Data demo yang dipakai:
- Sumber data: `DemoState`
- Selector: `createAdminDashboard(state)`
- Campaign progress: 73/100 sebelum scan, 74/100 setelah scan
- Activity baseline: Nadia dan Bima
- Activity setelah scan: Gabriel di posisi teratas
- Verification log: kosong sebelum percobaan QR, lalu `verified`, `rejected`, atau `blocked` sesuai input

Fitur yang masih mock:
- KPI bukan analytics produksi.
- Campaign Console belum menjadi route `/admin` terpisah.
- Data belum persistent setelah reload.

Fitur yang belum selesai:
- Admin route/web dashboard terpisah jika dibutuhkan untuk demo laptop.
- Export/report dummy.
- Manual QA visual di web/laptop.

Bug/risiko demo:
- Karena console masih inline di mobile scroll, presenter perlu scroll ke bagian bawah untuk menunjukkan admin console.

## DEMO-STATE-006 - Voting Reward Interaktif

Flow yang sudah bisa dijalankan:
- User melihat poll `Pilih reward komunitas berikutnya`.
- User memilih salah satu opsi reward.
- Opsi terpilih mendapat label `Pilihan kamu`.
- Vote count dan persentase poll dihitung ulang.
- Feedback voting menjelaskan pilihan Gabriel tersimpan.
- Campaign Console menampilkan KPI `Partisipasi Voting` dari `userVote`.

Data demo yang dipakai:
- Poll: `poll_reward_berikutnya`
- Opsi awal: Kupon Kopi Sukamaju 48%, Paket Sembako Lokal 32%, Merch Tim Pemuda 20%
- State vote user: `userVote` null sebelum memilih, berisi optionId/label setelah memilih
- Timestamp vote demo: `2026-07-04 14:24`

Fitur yang masih mock:
- Vote count dan persentase masih local state.
- Tidak ada real-time multi-user atau backend voting.
- Voting tetap untuk campaign/reward komunitas, bukan RAT formal.

Fitur yang belum selesai:
- Team Wrap final/screenshot-ready.
- Admin voting summary panel khusus di luar KPI.
- Automated interaction test untuk switching pilihan.

Bug/risiko demo:
- Setelah reload app, vote kembali ke seed awal karena belum ada persistence.

## DEMO-STATE-007 - Team Wrap Screenshot-Ready

Flow yang sudah bisa dijalankan:
- Team Wrap tampil setelah voting section dan sebelum Campaign Console.
- Card membaca data dari `createTeamWrap(state)`.
- Setelah QR valid, Team Wrap menampilkan headline tim naik rank, rank #2, score 7.930, +120 Kopoin, badge `Anak Lokal, Selera Global`, progress 74/100, dan sisa 26 aksi.
- Setelah voting, Team Wrap menampilkan pilihan reward Gabriel.
- Card memiliki CTA `Ayo ikut dukung produk koperasi lokal!` dan branding `Kopoin · Setiap Aksi Punya Nilai`.

Data demo yang dipakai:
- Team: Tim Pemuda Sukamaju
- Campaign: 7 Hari Dukung Produk Koperasi Sukamaju
- Product: Kopi Sukamaju
- Rank: #3 sebelum scan, #2 setelah scan
- Progress: 73/100 sebelum scan, 74/100 setelah scan
- Vote label: dari `userVote.optionLabel` jika sudah memilih
- Generated label: timestamp completion jika sudah scan, fallback `Siap dibuat setelah aksi pertama`

Fitur yang masih mock:
- Card belum memakai native share.
- Card belum diekspor menjadi gambar.
- Belum memakai asset maskot final.

Fitur yang belum selesai:
- Manual QA screenshot di emulator/device.
- Native share P2 jika waktu cukup.
- Screenshot final untuk submission.

Bug/risiko demo:
- Card berada dalam scroll app; presenter perlu memastikan posisi screenshot tepat saat rekam/demo.

## DEMO-STATE-008 - Demo Hardening dan Rehearsal Docs

Flow yang sudah bisa dijalankan:
- README menjelaskan cara menjalankan MVP dari `apps/mobile`.
- README menjelaskan alur demo 3-5 menit dari member card sampai Campaign Console.
- QR sample sheet mendokumentasikan kode valid, invalid, blocked, dan duplicate guard.
- Manual run checklist mendokumentasikan setup, core loop, fallback, voting, Team Wrap, Campaign Console, dan status siap rekam.

Data demo yang dipakai:
- Kode valid utama: `KOPI-SUKAMAJU-001`
- Kode valid alias: `KOPI-SUKAMAJU-QR-001`
- Kode invalid: `KOPI-SUKAMAJU-999`
- Progress: 73/100 ke 74/100
- Saldo: 1.730 ke 1.850
- Rank: #3 ke #2

Fitur yang masih mock:
- SIMKOPDES masih mock/local state.
- QR camera belum wajib, fallback manual dipakai untuk demo.
- Native share belum tersedia, Team Wrap ditampilkan sebagai screenshot-ready card.

Fitur yang belum selesai:
- Manual rehearsal 3 kali belum dicatat sebagai selesai.
- Video demo belum direkam.
- Screenshot final belum diambil.

Bug/risiko demo:
- Checklist harus dijalankan di device/emulator target untuk menemukan isu layout nyata.

## DEMO-STATE-009 - Rehearsal 3 Pass dan Web Export

Flow yang sudah bisa dijalankan:
- Rehearsal pass 1, 2, dan 3 memvalidasi state transition core loop.
- Rehearsal memvalidasi submit sebelum join diblokir.
- Rehearsal memvalidasi QR valid `KOPI-SUKAMAJU-001`.
- Rehearsal memvalidasi duplicate guard.
- Rehearsal memvalidasi invalid code `KOPI-SUKAMAJU-999`.
- Rehearsal memvalidasi voting reward.
- Rehearsal memvalidasi Campaign Console KPI/activity.
- Rehearsal memvalidasi Team Wrap.
- Rehearsal memvalidasi reset demo.
- Web export berhasil dibuat ke `apps/mobile/dist`.

Data demo yang dipakai:
- Progress awal/akhir: 73/100 ke 74/100
- Saldo awal/akhir: 1.730 ke 1.850
- Rank awal/akhir: #3 ke #2
- Voting: `reward_kopi`
- Invalid code: `KOPI-SUKAMAJU-999`

Fitur yang masih mock:
- Rehearsal otomatis hanya memvalidasi service/state, bukan UI klik manual.
- Web export memastikan bundle, bukan visual QA final.

Fitur yang belum selesai:
- Klik manual di browser/device memakai checklist.
- Screenshot final.
- Video demo final.

Bug/risiko demo:
- Tidak ada bug core flow ditemukan dari rehearsal otomatis.
- Visual QA tetap wajib karena layout aktual bisa berbeda di device target.

## DEMO-STATE-010 - Production-Lite Expo Go Shell dan Wizard Juri

Flow yang sudah bisa dijalankan:
- First run membuka wizard juri yang menjelaskan masalah, solusi, dampak koperasi, dan cara mencoba MVP.
- Setelah wizard, juri masuk ke app dengan bottom navigation: Beranda, Misi, Komunitas, Console, dan Profil.
- Beranda memandu juri untuk gabung Tim Pemuda Sukamaju dan mulai misi produk lokal.
- Tab Misi menyediakan jalur kamera QR melalui Expo Camera, tombol `Scan Kode Demo`, dan fallback manual code.
- Tab Komunitas menampilkan leaderboard bergaya premium, reward progress, voting, dan Team Wrap.
- Tab Console menampilkan Campaign Console dari state yang sama.
- Tab Profil menyediakan reset demo, ulangi wizard, dan batasan MVP yang jujur.
- Demo state disimpan lokal memakai AsyncStorage agar berpindah tab/reload ringan tidak langsung menghapus progress.

Data demo yang dipakai:
- Kode valid utama: `KOPI-SUKAMAJU-001`
- Progress: 73/100 ke 74/100
- Saldo: 1.730 ke 1.850
- Rank: #3 ke #2
- Voting reward: pilihan tersimpan dan masuk KPI Campaign Console

Fitur yang masih mock:
- SIMKOPDES masih local mock service, belum endpoint produksi.
- Persistence masih AsyncStorage lokal, bukan backend multi-user.
- Camera QR tersedia melalui Expo Camera, tetapi fallback tetap disediakan untuk stabilitas demo.

Fitur yang belum selesai:
- Manual QA di Expo Go device target belum dicatat selesai.
- Screenshot final dan video demo final belum ditambahkan ke repo.
- App icon/splash final belum dipoles.

Bug/risiko demo:
- Perlu uji langsung di HP Expo Go untuk memastikan izin kamera dan layout bottom nav aman di device target.
