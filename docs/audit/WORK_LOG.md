# Work Log Kopoin

Catatan pengerjaan aktual untuk menjaga traceability MVP Kopoin.

## AUDIT-001 - Sprint 0 Foundation dan App Shell MVP

Tanggal: 2026-07-04

Prompt: Implementasi MVP Kopoin berdasarkan sprint plan, mulai dari foundation sampai fitur demo utama, dengan audit wajib.

Tujuan: Membuat fondasi proyek yang bisa dijalankan, audit trail awal, seed data demo Sukamaju, dan app shell minimal yang menjaga core loop MVP.

File yang dibaca:
- `docs/Kopoin_MVP_Sprint_Plan.md`
- `docs/Kopoin_Agent_Code_Rules.md`
- `docs/Kopoin_Documentation_Checklist.md`
- `docs/Kopoin_Rio_Admin_Dashboard_Guide_And_Sprint.md`
- `docs/Kopoin_Raul_Creative_Prompting_Guide.md`
- `README.md`
- `.gitignore`

File yang diubah:
- `.gitignore`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`
- `apps/mobile/package.json`
- `apps/mobile/package-lock.json`
- `apps/mobile/app.json`
- `apps/mobile/babel.config.js`
- `apps/mobile/tsconfig.json`
- `apps/mobile/App.tsx`
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/src/theme.ts`

Ringkasan perubahan:
- Membuat folder audit awal sesuai aturan Kopoin.
- Menyiapkan scaffold Expo TypeScript di `apps/mobile` agar tidak bentrok dengan `.gitignore` lama yang mengabaikan `mobile/`.
- Menambahkan seed data demo untuk Gabriel, Tim Pemuda Sukamaju, campaign Sukamaju, QR fallback, leaderboard, reward, voting preview, Team Wrap, dan admin activity.
- Menambahkan service state demo untuk join team, validasi QR/manual code, submit aksi misi, update poin/progress/leaderboard/activity, dan reset demo.
- Menambahkan satu app shell Expo yang menampilkan core loop MVP secara vertikal dari member card sampai admin console preview.
- Menginstal dependency Expo dan menghasilkan `apps/mobile/package-lock.json` untuk lock dependency awal.
- Mengubah pola `.gitignore` dari `mobile/` menjadi `/mobile/` agar hanya root `mobile/` yang diabaikan dan `apps/mobile` tetap terlacak.

Alasan perubahan:
- Sprint 0 membutuhkan repository convention, project setup, seed data, visual token, dan struktur screen awal.
- Core loop P0 perlu memakai mock/local state lebih dulu karena backend dan integrasi SIMKOPDES produksi belum tersedia.
- `apps/mobile` dipilih sebagai lokasi app, dan `.gitignore` disesuaikan menjadi `/mobile/` supaya source app tetap terlacak git tanpa membuka kembali folder root `mobile/` lama.

Status: Done

Risiko:
- UI masih single-screen shell, belum memakai navigation/routing produksi.
- `npm install` melaporkan 11 moderate vulnerabilities dari dependency tree Expo; belum dijalankan `npm audit fix` karena bisa mengubah dependency besar dan mengganggu foundation Sprint 0.

Validasi:
- `npm install --prefix apps/mobile` berhasil.
- `npm run typecheck` berhasil tanpa error.

Next step:
- Lanjut Sprint 1 dengan memecah screen/member/mission/leaderboard jika foundation sudah stabil.

## AUDIT-002 - Sprint 1 Component Split P0 Core Loop

Tanggal: 2026-07-04

Prompt: Lanjut Sprint 1 dengan memecah app shell menjadi screen/component P0 untuk MemberCard, TeamHome, MissionDetail, QRFallback, SuccessState, dan Leaderboard, sambil menjaga state demo tetap satu sumber.

Tujuan: Membuat struktur UI mobile lebih rapi dan siap dikembangkan per screen tanpa memecah source of truth demo state.

File yang dibaca:
- `apps/mobile/App.tsx`
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/src/theme.ts`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`

File yang diubah:
- `apps/mobile/App.tsx`
- `apps/mobile/src/theme.ts`
- `apps/mobile/src/utils/formatters.ts`
- `apps/mobile/src/components/ui/Section.tsx`
- `apps/mobile/src/components/ui/Metric.tsx`
- `apps/mobile/src/components/ui/ProgressBar.tsx`
- `apps/mobile/src/components/ui/HeroCard.tsx`
- `apps/mobile/src/screens/MemberCardScreen.tsx`
- `apps/mobile/src/screens/TeamHomeScreen.tsx`
- `apps/mobile/src/screens/MissionDetailScreen.tsx`
- `apps/mobile/src/screens/QRFallbackScreen.tsx`
- `apps/mobile/src/screens/SuccessStateScreen.tsx`
- `apps/mobile/src/screens/LeaderboardScreen.tsx`
- `apps/mobile/src/screens/SocialLoopPreviewScreen.tsx`
- `apps/mobile/src/screens/CampaignConsolePreviewScreen.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Ringkasan perubahan:
- Memecah UI besar di `App.tsx` menjadi komponen UI reusable dan screen mobile-first.
- Menambahkan screen P0: Member Card, Team Home, Mission Detail, QR Fallback, Success State, dan Leaderboard.
- Mempertahankan preview P1 untuk voting/reward/Team Wrap dan Campaign Console sebagai screen terpisah agar core loop tetap end-to-end.
- Menambahkan formatter angka/rupiah/kopoin agar copy angka demo konsisten.
- Menambahkan tone feedback pada QR fallback untuk membedakan info, sukses, dan error tanpa mengubah business logic.
- Menjaga state demo tetap terpusat di `App.tsx` dan mutasi core loop tetap lewat `demoState.ts`.

Alasan perubahan:
- Sprint 1 membutuhkan struktur screen yang bisa dikembangkan bertahap tanpa membuat `App.tsx` menjadi monolit.
- Pemisahan komponen memperjelas ownership changeset berikutnya untuk member card, misi, QR, success, dan leaderboard.
- Single source of truth mencegah progress, poin, leaderboard, dan admin activity tidak sinkron saat demo.

Status: Done

Risiko:
- Belum ada navigation antar screen; semua screen masih tersusun vertikal agar core loop tetap cepat didemokan.
- Belum ada test interaksi otomatis; validasi saat ini masih typecheck.
- Risiko dependency audit dari Sprint 0 masih ada.

Validasi:
- `npm run typecheck` berhasil tanpa error dari `apps/mobile`.

Next step:
- Lanjut Sprint 1 KOP-105/KOP-106: perkuat QR/manual verification dengan duplicate guard lebih eksplisit, state transition success, dan activity ledger/history yang bisa dipakai admin console.

## AUDIT-003 - KOP-105/KOP-106 QR Verification Ledger dan Duplicate Guard

Tanggal: 2026-07-04

Prompt: Lanjut KOP-105/KOP-106: perkuat QR/manual verification dengan activity ledger, duplicate guard yang jelas, dan riwayat aksi untuk Campaign Console.

Tujuan: Membuat QR/manual verification lebih aman untuk demo dengan log validasi, guard anti-duplikasi, dan activity history yang dapat ditampilkan di Campaign Console preview.

File yang dibaca:
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/App.tsx`
- `apps/mobile/src/screens/QRFallbackScreen.tsx`
- `apps/mobile/src/screens/CampaignConsolePreviewScreen.tsx`
- `docs/audit/WORK_LOG.md`

File yang diubah:
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/App.tsx`
- `apps/mobile/src/screens/QRFallbackScreen.tsx`
- `apps/mobile/src/screens/CampaignConsolePreviewScreen.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Ringkasan perubahan:
- Menambahkan `activityLedger`, `verificationLogs`, dan `usedQrCodes` ke `DemoState`.
- Menambahkan baseline activity ledger untuk Campaign Console sebelum Gabriel scan.
- Menambahkan `VerificationLog` dengan status `verified`, `rejected`, dan `blocked`.
- Mengubah submit QR/manual code agar invalid, belum join team, duplicate, dan misi sudah selesai masuk verification log tanpa mengubah poin/progress.
- Mengubah submit sukses agar membuat activity ledger entry Gabriel, menyimpan used QR code, menambah verification log, menaikkan progress, saldo, achievement, dan leaderboard.
- Menampilkan duplicate guard dan log verifikasi terbaru di `QRFallbackScreen`.
- Menampilkan activity ledger dan QR verification log di `CampaignConsolePreviewScreen`.

Alasan perubahan:
- KOP-105 butuh QR valid/invalid yang jelas dan fallback manual yang aman untuk demo.
- KOP-106 butuh aksi terverifikasi yang tercatat sebagai ledger dan memutakhirkan poin/progress/leaderboard.
- Campaign Console perlu riwayat aksi agar demo terlihat sebagai sistem monitoring, bukan hanya layar statis.

Status: Done

Risiko:
- Ledger masih local/mock state, belum persistent setelah reload app.
- Duplicate guard masih berbasis local `usedQrCodes`, belum anti-fraud produksi.
- Belum ada automated interaction test untuk sequence join -> submit -> duplicate.

Validasi:
- `npm run typecheck` berhasil tanpa error dari `apps/mobile`.

Next step:
- Lanjut Sprint 1 KOP-107/KOP-108: polish success feedback dan leaderboard transition agar perubahan poin/progress/rank lebih kuat untuk demo.

## AUDIT-004 - KOP-107/KOP-108 Success Feedback dan Leaderboard Transition

Tanggal: 2026-07-04

Prompt: Lanjut KOP-107/KOP-108: polish success feedback dan leaderboard transition supaya perubahan poin/progress/rank lebih kuat untuk demo.

Tujuan: Membuat momen setelah QR/manual code berhasil lebih kuat secara visual dan lebih mudah dijelaskan saat demo, tanpa menambah scope di luar core loop.

File yang dibaca:
- `apps/mobile/src/screens/SuccessStateScreen.tsx`
- `apps/mobile/src/screens/LeaderboardScreen.tsx`
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/App.tsx`
- `docs/audit/WORK_LOG.md`

File yang diubah:
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/App.tsx`
- `apps/mobile/src/screens/SuccessStateScreen.tsx`
- `apps/mobile/src/screens/LeaderboardScreen.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Ringkasan perubahan:
- Menambahkan `CompletionSummary` dan `latestCompletion` ke demo state.
- Mengisi completion summary saat kode QR/manual berhasil diverifikasi.
- Memoles `SuccessStateScreen` dengan kartu sukses, before/after saldo, progress campaign, rank tim, dan animasi masuk ringan.
- Memoles `LeaderboardScreen` dengan banner transisi rank, score delta, highlight row Tim Pemuda Sukamaju, dan animasi scale ringan saat scan berhasil.
- Menjaga angka demo tetap mengikuti sprint plan: +120 Kopoin, saldo 1.730 ke 1.850, progress 73/100 ke 74/100, rank 3 ke 2.

Alasan perubahan:
- KOP-107 membutuhkan feedback sukses yang jelas setelah aksi terverifikasi.
- KOP-108 membutuhkan leaderboard yang terlihat berubah, bukan hanya angka diam.
- Completion summary dibuat di state agar success dan leaderboard memakai data dampak yang sama.

Status: Done

Risiko:
- Animasi masih berbasis React Native `Animated` sederhana, belum diuji manual di device/emulator.
- Completion summary masih local mock state dan hilang setelah reload/reset.
- Belum ada automated interaction test untuk memverifikasi visual transition.

Validasi:
- `npm run typecheck` berhasil tanpa error dari `apps/mobile`.

Next step:
- Lanjut Sprint 2 P0: mulai Campaign Console dashboard lebih lengkap memakai `activityLedger`, `verificationLogs`, KPI summary, campaign progress, dan team performance dari state yang sama.

## AUDIT-005 - Sprint 2 P0 Campaign Console Dashboard

Tanggal: 2026-07-04

Prompt: Lanjut Sprint 2 P0: buat Campaign Console dashboard lebih lengkap memakai activityLedger, verificationLogs, KPI summary, campaign progress, dan team performance dari state yang sama.

Tujuan: Mengubah preview admin menjadi Campaign Console yang lebih layak demo dengan KPI, progress, performa tim, kinerja misi, activity ledger, dan verification log yang semuanya dihitung dari `DemoState`.

File yang dibaca:
- `apps/mobile/src/screens/CampaignConsolePreviewScreen.tsx`
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/App.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DEMO_STATE_LOG.md`

File yang diubah:
- `apps/mobile/App.tsx`
- `apps/mobile/src/services/adminDashboard.ts`
- `apps/mobile/src/screens/CampaignConsoleDashboardScreen.tsx`
- `apps/mobile/src/screens/CampaignConsolePreviewScreen.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Ringkasan perubahan:
- Menambahkan selector `createAdminDashboard()` untuk menghitung KPI admin dari `DemoState`.
- Mengganti `CampaignConsolePreviewScreen` menjadi `CampaignConsoleDashboardScreen`.
- Menambahkan KPI cards: anggota aktif, misi selesai, Kopoin dibagikan, progress campaign, log valid, dan guard aktif.
- Menambahkan panel progress reward bersama dengan progress bar.
- Menambahkan panel performa tim berbasis leaderboard yang sama dengan mobile user.
- Menambahkan panel kinerja misi berbasis `activityLedger`.
- Mempertahankan activity ledger dan QR verification log, tetapi sekarang sebagai bagian dashboard admin yang lebih lengkap.

Alasan perubahan:
- Sprint 2 P0 mewajibkan Campaign Console menampilkan ringkasan campaign, activity feed, team performance, dan sinkronisasi demo state.
- Selector admin mencegah angka dashboard berbeda dari flow anggota.
- Mengganti preview menjadi dashboard memperkuat narasi bahwa Kopoin juga berguna untuk pengurus koperasi.

Status: Done

Risiko:
- Campaign Console masih berada di scroll app yang sama, belum route `/admin` terpisah.
- KPI masih berbasis mock/local state, bukan analytics produksi.
- Belum ada manual QA visual di layar laptop/web.

Validasi:
- `npm run typecheck` berhasil tanpa error dari `apps/mobile`.

Next step:
- Lanjut Sprint 2 P1 terkontrol: buat voting interaktif atau Team Wrap final, pilih yang paling mendukung demo utama tanpa mengganggu P0.

## AUDIT-006 - Sprint 2 P1 Voting Interaktif

Tanggal: 2026-07-04

Prompt: Lanjut Sprint 2 P1 terkontrol: buat voting interaktif atau Team Wrap final. Rekomendasi: voting interaktif dulu karena memperkuat ownership loop sebelum share card.

Tujuan: Membuat voting reward komunitas menjadi interaktif dengan state lokal yang sinkron ke Campaign Console tanpa mengganggu core loop P0.

File yang dibaca:
- `apps/mobile/src/screens/SocialLoopPreviewScreen.tsx`
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/src/services/adminDashboard.ts`
- `apps/mobile/App.tsx`
- `docs/audit/WORK_LOG.md`

File yang diubah:
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/src/services/adminDashboard.ts`
- `apps/mobile/src/screens/SocialLoopPreviewScreen.tsx`
- `apps/mobile/App.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Ringkasan perubahan:
- Menambahkan `votes` pada `VoteOption` dan `userVote` pada `DemoState`.
- Menambahkan service `submitVote()` untuk menyimpan pilihan Gabriel dan menghitung ulang persentase voting.
- Membuat voting card interaktif dengan CTA per opsi, selected state, vote count, dan feedback hasil vote.
- Menghubungkan reset demo agar voting kembali ke state awal.
- Menambahkan KPI `Partisipasi Voting` di Campaign Console dari state yang sama.

Alasan perubahan:
- Voting P1 memperkuat ownership loop tanpa menambah backend atau fitur besar.
- Persentase berubah setelah user vote memenuhi acceptance criteria P1.
- Campaign Console perlu memperlihatkan bahwa partisipasi voting user bisa dipantau oleh pengurus.

Status: Done

Risiko:
- Voting masih local/mock state dan tidak persistent setelah reload.
- Persentase voting memakai vote count demo sederhana, bukan real-time multi-user.
- Belum ada test interaksi otomatis untuk switching pilihan voting.

Validasi:
- `npm run typecheck` berhasil tanpa error dari `apps/mobile`.

Next step:
- Lanjut Sprint 2 P1: buat Team Wrap final/screenshot-ready memakai data terbaru dari team, campaign, completion summary, vote, dan leaderboard.

## AUDIT-007 - Sprint 2 P1 Team Wrap Screenshot-Ready

Tanggal: 2026-07-04

Prompt: Lanjut Sprint 2 P1: buat Team Wrap final/screenshot-ready memakai data terbaru dari team, campaign, completion summary, vote, dan leaderboard.

Tujuan: Membuat Team Wrap final yang bisa ditampilkan dan di-screenshot untuk demo/social loop tanpa menambah native share.

File yang dibaca:
- `apps/mobile/src/screens/SocialLoopPreviewScreen.tsx`
- `apps/mobile/App.tsx`
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/adminDashboard.ts`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`

File yang diubah:
- `apps/mobile/App.tsx`
- `apps/mobile/src/services/teamWrap.ts`
- `apps/mobile/src/screens/TeamWrapScreen.tsx`
- `apps/mobile/src/screens/SocialLoopPreviewScreen.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Ringkasan perubahan:
- Menambahkan selector `createTeamWrap()` untuk membuat data wrap dari `DemoState`.
- Menambahkan `TeamWrapScreen` dengan card visual screenshot-ready.
- Team Wrap memakai data terbaru: team, campaign progress, completion summary, vote user, leaderboard rank, score, badge, dan CTA share.
- Menghapus placeholder Team Wrap sederhana dari `SocialLoopPreviewScreen` agar Team Wrap final menjadi section tersendiri.
- Menghubungkan Team Wrap ke `App.tsx` setelah voting dan sebelum Campaign Console.

Alasan perubahan:
- Sprint 2 P1 membutuhkan Team Wrap/share card yang dapat ditampilkan walaupun belum memakai native share.
- Selector menjaga Team Wrap tetap sinkron dengan hasil scan QR, progress campaign, voting, dan leaderboard.
- Card screenshot-ready mendukung demo akhir: user bisa menunjukkan pencapaian tim setelah core loop selesai.

Status: Done

Risiko:
- Team Wrap belum memakai native share/screenshot API.
- Belum diuji manual di device kecil untuk memastikan seluruh card mudah di-screenshot tanpa scroll berlebihan.
- Visual masih berbasis komponen React Native, belum memakai asset maskot/ilustrasi final.

Validasi:
- `npm run typecheck` berhasil tanpa error dari `apps/mobile`.

Next step:
- Lanjut Sprint 3 P0: hardening demo dengan README setup/demo flow, QR sample sheet, dan checklist manual run supaya MVP siap direkam.

## AUDIT-008 - Sprint 3 P0 Demo Hardening Docs

Tanggal: 2026-07-04

Prompt: Lanjut Sprint 3 P0: hardening demo dengan README setup/demo flow, QR sample sheet, dan checklist manual run supaya MVP siap direkam.

Tujuan: Menyiapkan dokumentasi operasional agar MVP bisa dijalankan, direhearsal, direkam, dan dijelaskan tanpa keluar dari scope demo.

File yang dibaca:
- `README.md`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DEMO_STATE_LOG.md`

File yang diubah:
- `README.md`
- `docs/demo/Kopoin_QR_Sample_Sheet.md`
- `docs/demo/Kopoin_Manual_Run_Checklist.md`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Ringkasan perubahan:
- Menambahkan section `Demo dan Dokumentasi` di README.
- Menambahkan setup command untuk `apps/mobile`.
- Menambahkan alur demo 3-5 menit, data demo penting, dan link dokumen demo.
- Menambahkan QR sample sheet berisi kode valid, invalid, duplicate guard, dan expected result.
- Menambahkan manual run checklist untuk setup, core loop, fallback, voting, Team Wrap, Campaign Console, dan readiness rekam.

Alasan perubahan:
- Sprint 3 P0 membutuhkan demo hardening, README setup, QR sample, dan checklist rehearsal.
- Dokumentasi ini mengurangi risiko demo gagal karena lupa command, lupa kode fallback, atau state demo tidak konsisten.
- README menegaskan integrasi SIMKOPDES masih mock/local state agar tidak ada klaim produksi.

Status: Done

Risiko:
- Manual run checklist belum dieksekusi di emulator/device secara end-to-end dalam sesi ini.
- README menjalankan `npm run web` sebagai opsi utama, tetapi environment demo bisa memilih `npm start`, Android, atau iOS sesuai device.

Validasi:
- `npm run typecheck` berhasil tanpa error dari `apps/mobile`.

Next step:
- Jalankan manual rehearsal 3 kali memakai checklist, lalu perbaiki bug UI/flow yang muncul sebelum rekam video demo.

## AUDIT-009 - Sprint 3 P0 Rehearsal 3 Pass dan Build Check

Tanggal: 2026-07-04

Prompt: Jalankan manual rehearsal 3 kali memakai `docs/demo/Kopoin_Manual_Run_Checklist.md`, lalu perbaiki bug UI/flow yang muncul sebelum rekam video demo.

Tujuan: Memastikan flow demo stabil melalui tiga pass rehearsal teknis, memperbaiki issue yang ditemukan, dan menyiapkan log rehearsal yang bisa dipakai ulang sebelum rekam video.

File yang dibaca:
- `docs/demo/Kopoin_Manual_Run_Checklist.md`
- `apps/mobile/package.json`
- `apps/mobile/App.tsx`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/src/services/adminDashboard.ts`
- `apps/mobile/src/services/teamWrap.ts`

File yang diubah:
- `apps/mobile/package.json`
- `apps/mobile/scripts/rehearsal-check.ts`
- `README.md`
- `docs/demo/Kopoin_Manual_Run_Checklist.md`
- `docs/demo/Kopoin_Rehearsal_Log.md`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Ringkasan perubahan:
- Menambahkan script `apps/mobile/scripts/rehearsal-check.ts` untuk validasi rehearsal state transition.
- Menambahkan npm script `npm run rehearse -- <pass>`.
- Menambahkan log rehearsal di `docs/demo/Kopoin_Rehearsal_Log.md`.
- Mengupdate checklist manual agar menyertakan sanity rehearsal otomatis dan web export.
- Mengupdate README agar mencantumkan command rehearsal dan link rehearsal log.
- Menjalankan rehearsal pass 1, 2, dan 3.
- Menjalankan `npm run typecheck`.
- Menjalankan `npx expo export --platform web --output-dir dist --clear`.

Alasan perubahan:
- Tool ini tidak menyediakan browser automation untuk klik UI manual penuh, sehingga rehearsal teknis dibuat agar state core loop dapat divalidasi konsisten tiga kali.
- Script rehearsal menangkap risiko state mismatch sebelum demo: QR valid, duplicate guard, invalid code, voting, Team Wrap, Campaign Console, dan reset.
- Web export memastikan bundle Expo web tidak gagal sebelum rekam/demo laptop.

Status: Done

Risiko:
- Rehearsal otomatis bukan pengganti klik manual di browser/device untuk visual QA, scroll, spacing, dan screenshot Team Wrap.
- Expo export pertama ke folder temp di luar project gagal karena batasan Expo; sudah diperbaiki dengan output `dist` di dalam project.

Validasi:
- `npm run rehearse -- 1` berhasil.
- `npx --yes tsx scripts/rehearsal-check.ts 2` berhasil.
- `npx --yes tsx scripts/rehearsal-check.ts 3` berhasil.
- `npm run typecheck` berhasil tanpa error.
- `npx expo export --platform web --output-dir dist --clear` berhasil.

Next step:
- Buka app via `npm run web`, jalankan klik manual di browser/device memakai checklist, lalu ambil screenshot/video final jika visual QA aman.

## AUDIT-010 - Production-Lite Expo Go Shell dan Wizard Juri

Tanggal: 2026-07-08

Prompt: MVP tidak hanya video; juri akan memakai app langsung. User memilih arah Production Lite dan meminta wizard pembuka yang menjelaskan masalah, alasan solusi, dan dampak agar juri memahami Kopoin.

Tujuan: Mengubah MVP dari single-scroll demo menjadi app Expo Go yang lebih nyata, dapat dieksplor juri, punya wizard onboarding, visual mengikuti aset Kopoin, camera QR path, fallback aman, persistence lokal, dan tab console/profil.

File yang dibaca:
- `README.md`
- `apps/mobile/App.tsx`
- `apps/mobile/package.json`
- `apps/mobile/app.json`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/src/services/adminDashboard.ts`
- `apps/mobile/src/services/teamWrap.ts`
- `assets/kopoin-leaderboard.png`
- `assets/kopoin-hero.png`
- `assets/kopoin-feature-strip.png`

File yang diubah:
- `apps/mobile/package.json`
- `apps/mobile/package-lock.json`
- `apps/mobile/app.json`
- `apps/mobile/App.tsx`
- `apps/mobile/src/theme.ts`
- `apps/mobile/src/screens/JudgeWizardScreen.tsx`
- `apps/mobile/src/screens/HomeDashboardScreen.tsx`
- `apps/mobile/src/screens/MissionHubScreen.tsx`
- `apps/mobile/src/screens/ProductionQRScreen.tsx`
- `apps/mobile/src/screens/CommunityHubScreen.tsx`
- `apps/mobile/src/screens/ProfileControlScreen.tsx`
- `README.md`
- `docs/demo/Kopoin_Manual_Run_Checklist.md`
- `docs/demo/Kopoin_QR_Sample_Sheet.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/WORK_LOG.md`

Ringkasan perubahan:
- Menambahkan dependency `expo-camera` dan `@react-native-async-storage/async-storage` dengan versi kompatibel Expo SDK 53.
- Menambahkan permission kamera di `app.json` dan mematikan `recordAudioAndroid` agar tidak meminta izin audio.
- Menambahkan wizard juri yang menjelaskan masalah, solusi, dampak, dan cara mencoba MVP.
- Mengubah `App.tsx` menjadi orchestrator dengan hydration/persistence AsyncStorage, bottom nav, dan routing tab.
- Menambahkan Beranda, Misi, Komunitas, Console, dan Profil sebagai app shell production-lite.
- Menambahkan QR camera path melalui `CameraView`, tombol `Scan Kode Demo`, dan fallback manual code.
- Memindahkan reset dan ulang wizard ke Profil.
- Memperbarui README, QR sample sheet, dan manual checklist agar sesuai jalur Expo Go.

Alasan perubahan:
- Juri akan memakai app langsung, sehingga app harus memberi konteks sendiri tanpa presenter.
- Visual single-scroll lama belum cukup premium dibanding aset leaderboard Kopoin.
- Camera QR meningkatkan kredibilitas production-lite, tetapi fallback tetap menjaga demo aman.
- AsyncStorage menjaga pengalaman juri saat berpindah tab atau reload ringan.

Status: Done

Risiko:
- Manual QA di device Expo Go belum dilakukan dalam sesi ini.
- Camera behavior tetap perlu diuji pada HP target karena permission/device bisa berbeda.
- App icon/splash final belum dipoles.

Validasi:
- `npm run typecheck` berhasil.
- `npm run rehearse -- 1` berhasil.
- `npx expo config --type public` berhasil dan permission Android hanya kamera.
- `npx expo export --platform web --output-dir dist --clear` berhasil.

Next step:
- Jalankan `npm start`, scan dengan Expo Go di device target, lakukan manual checklist, lalu ambil screenshot/video final setelah visual QA aman.
