# Changeset Index Kopoin

Catatan changeset logis agar perubahan MVP mudah dipisah menjadi commit bertahap.

## CHANGESET-001 - Foundation Audit dan App Shell Expo

Audit ID: AUDIT-001

Kategori: chore/foundation

File terkait:
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

Isi perubahan:
- Inisialisasi audit trail proyek.
- Scaffold Expo TypeScript di `apps/mobile`.
- Seed data dan service demo state untuk core loop Kopoin.
- App shell mobile-first yang menampilkan member card, team join, misi, QR fallback, success state, progress, leaderboard, voting/reward/share preview, dan admin activity preview.

Saran commit message:
`chore(foundation): initialize Kopoin MVP audit and Expo app shell`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Validasi dependency/typecheck dicatat di `WORK_LOG.md` setelah dijalankan.

## CHANGESET-002 - Sprint 1 P0 Screen Component Split

Audit ID: AUDIT-002

Kategori: refactor/mobile-core-loop

File terkait:
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

Isi perubahan:
- `App.tsx` diperkecil menjadi orchestrator state dan komposisi screen.
- Screen P0 dipisah untuk member card, team home, mission detail, QR fallback, success state, dan leaderboard.
- Komponen UI reusable dibuat untuk hero, section, metric, dan progress bar.
- P1 preview social loop dan admin console tetap tersedia tanpa mengubah scope interaktif P0.

Saran commit message:
`refactor(mobile): split Sprint 1 core loop screens`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Validasi `npm run typecheck` berhasil.

## CHANGESET-009 - Rehearsal Script dan Demo Validation Log

Audit ID: AUDIT-009

Kategori: test/demo

File terkait:
- `apps/mobile/package.json`
- `apps/mobile/scripts/rehearsal-check.ts`
- `README.md`
- `docs/demo/Kopoin_Manual_Run_Checklist.md`
- `docs/demo/Kopoin_Rehearsal_Log.md`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Isi perubahan:
- Menambahkan script rehearsal untuk validasi core loop, duplicate guard, invalid code, voting, Team Wrap, Campaign Console, dan reset.
- Menambahkan npm script `rehearse`.
- Menambahkan rehearsal log dan memperbarui README/checklist demo.
- Mencatat tiga pass rehearsal dan build check web export.

Saran commit message:
`test(demo): add rehearsal validation script`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Rehearsal logic pass 1-3, typecheck, dan web export berhasil.

## CHANGESET-008 - Demo Runbook dan QR Sample Sheet

Audit ID: AUDIT-008

Kategori: docs/demo

File terkait:
- `README.md`
- `docs/demo/Kopoin_QR_Sample_Sheet.md`
- `docs/demo/Kopoin_Manual_Run_Checklist.md`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Isi perubahan:
- Menambahkan instruksi setup dan run MVP di README.
- Menambahkan alur demo 3-5 menit dan data demo penting.
- Menambahkan QR/manual code sample sheet untuk valid, invalid, duplicate, dan blocked scenario.
- Menambahkan manual run checklist untuk rehearsal dan readiness rekam.

Saran commit message:
`docs(demo): add runbook and QR sample sheet`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Validasi `npm run typecheck` berhasil.

## CHANGESET-007 - Team Wrap Screenshot-Ready

Audit ID: AUDIT-007

Kategori: feat/share

File terkait:
- `apps/mobile/App.tsx`
- `apps/mobile/src/services/teamWrap.ts`
- `apps/mobile/src/screens/TeamWrapScreen.tsx`
- `apps/mobile/src/screens/SocialLoopPreviewScreen.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Isi perubahan:
- Menambahkan selector Team Wrap dari `DemoState`.
- Menambahkan screen Team Wrap screenshot-ready dengan campaign, rank, score, progress, vote, badge, points, dan CTA.
- Memindahkan Team Wrap dari placeholder social loop menjadi section final tersendiri.

Saran commit message:
`feat(share): add screenshot-ready team wrap`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Validasi `npm run typecheck` berhasil.

## CHANGESET-006 - Voting Interaktif Reward Komunitas

Audit ID: AUDIT-006

Kategori: feat/voting

File terkait:
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/src/services/adminDashboard.ts`
- `apps/mobile/src/screens/SocialLoopPreviewScreen.tsx`
- `apps/mobile/App.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Isi perubahan:
- Menambahkan state dan service voting interaktif.
- Membuat opsi voting reward bisa ditekan dan persentasenya berubah.
- Menampilkan selected state dan feedback pilihan Gabriel.
- Menambahkan KPI partisipasi voting ke Campaign Console.

Saran commit message:
`feat(voting): add interactive reward poll`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Validasi `npm run typecheck` berhasil.

## CHANGESET-005 - Campaign Console Dashboard dari Demo State

Audit ID: AUDIT-005

Kategori: feat/console

File terkait:
- `apps/mobile/App.tsx`
- `apps/mobile/src/services/adminDashboard.ts`
- `apps/mobile/src/screens/CampaignConsoleDashboardScreen.tsx`
- `apps/mobile/src/screens/CampaignConsolePreviewScreen.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Isi perubahan:
- Menambahkan selector admin dashboard dari `DemoState`.
- Mengganti Campaign Console preview menjadi dashboard dengan KPI summary, campaign progress, team performance, mission performance, activity ledger, dan QR verification log.
- Memastikan angka admin berubah dari state yang sama dengan flow user.

Saran commit message:
`feat(console): add campaign dashboard from demo state`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Validasi `npm run typecheck` berhasil.

## CHANGESET-004 - Success Feedback dan Leaderboard Transition

Audit ID: AUDIT-004

Kategori: feat/mobile-core-loop

File terkait:
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/App.tsx`
- `apps/mobile/src/screens/SuccessStateScreen.tsx`
- `apps/mobile/src/screens/LeaderboardScreen.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Isi perubahan:
- Menambahkan completion summary sebagai dampak aksi terverifikasi.
- Menampilkan before/after saldo, progress, dan rank di success screen.
- Menambahkan banner transisi dan highlight row leaderboard setelah Tim Pemuda Sukamaju naik rank.
- Menambahkan animasi ringan berbasis React Native `Animated` untuk momen sukses dan leaderboard.

Saran commit message:
`feat(mobile): polish success feedback and leaderboard transition`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Validasi `npm run typecheck` berhasil.

## CHANGESET-003 - QR Verification Ledger dan Duplicate Guard

Audit ID: AUDIT-003

Kategori: feat/qr

File terkait:
- `apps/mobile/src/data/kopoinSeed.ts`
- `apps/mobile/src/services/demoState.ts`
- `apps/mobile/App.tsx`
- `apps/mobile/src/screens/QRFallbackScreen.tsx`
- `apps/mobile/src/screens/CampaignConsolePreviewScreen.tsx`
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`
- `docs/audit/DECISION_LOG.md`
- `docs/audit/DEMO_STATE_LOG.md`

Isi perubahan:
- Menambahkan ledger aksi dan log verifikasi QR/manual code ke mock demo state.
- Menambahkan duplicate guard berbasis used QR code.
- Menampilkan riwayat verifikasi di QR fallback dan Campaign Console preview.
- Menjaga submit sukses tetap mengubah poin, progress, achievement, leaderboard, dan admin activity dari satu source of truth.

Saran commit message:
`feat(qr): add verification ledger and duplicate guard`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Validasi `npm run typecheck` berhasil.

## CHANGESET-010 - Production-Lite Expo Go App Shell

Audit ID: AUDIT-010

Kategori: feat/production-lite

File terkait:
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
- `docs/audit/WORK_LOG.md`
- `docs/audit/CHANGESET_INDEX.md`

Isi perubahan:
- Menambahkan wizard pembuka untuk juri.
- Mengubah app dari single-scroll demo menjadi bottom-tab production-lite shell.
- Menambahkan persistence lokal via AsyncStorage.
- Menambahkan QR camera path via Expo Camera dengan fallback `Scan Kode Demo` dan manual code.
- Memisahkan Beranda, Misi, Komunitas, Console, dan Profil sebagai jalur eksplor juri.
- Memperbarui README dan checklist agar jalur utama Expo Go jelas.

Saran commit message:
`feat(mobile): add production-lite Expo Go shell`

Catatan:
- Belum dicommit otomatis sesuai instruksi user.
- Validasi `npm run typecheck`, `npm run rehearse -- 1`, `npx expo config --type public`, dan `npx expo export --platform web --output-dir dist --clear` berhasil.
