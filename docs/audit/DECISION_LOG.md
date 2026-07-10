# Decision Log Kopoin

Catatan keputusan produk/teknis yang memengaruhi arah MVP.

## DECISION-001 - Gunakan Expo App di apps/mobile dengan Mock Local State

Konteks: Repository belum memiliki scaffold aplikasi, `package.json`, atau source code. Sprint plan merekomendasikan React Native, Expo, TypeScript, mock API/local store, dan QR fallback. Root `.gitignore` sudah mengabaikan folder bernama `mobile/`, yang juga dapat mengabaikan `apps/mobile/` jika tidak dibatasi ke root.

Keputusan: Scaffold MVP dibuat di `apps/mobile`, pola ignore lama diubah menjadi `/mobile/`, dan app memakai mock/local state TypeScript sebagai source of truth awal.

Alasan: `apps/mobile` memberi struktur workspace yang jelas, `/mobile/` tetap menjaga folder root lama tidak terlacak, dan setup ini memungkinkan demo core loop berjalan tanpa backend produksi. Mock/local state dipilih agar perubahan poin, progress, leaderboard, dan admin activity terlihat langsung.

Dampak ke MVP: Sprint 0 bisa berjalan cepat, core loop bisa diuji sejak awal, dan integrasi SIMKOPDES tetap jujur sebagai mock/demo simulation.

Alternatif yang ditolak: Membuat folder `mobile/` sambil mengubah total `.gitignore`; membuat backend/MySQL dulu; mengklaim integrasi SIMKOPDES produksi; membuat dashboard admin lengkap sebelum mobile core loop stabil.

## DECISION-002 - App Menjadi Orchestrator State, Screen Hanya Presentational

Konteks: Sprint 1 perlu memecah app shell menjadi screen P0, tetapi core loop demo tidak boleh rusak atau menghasilkan state yang berbeda antara poin, progress, leaderboard, dan admin activity.

Keputusan: `App.tsx` tetap memegang `demoState`, `manualCode`, dan feedback UI; mutasi state tetap melalui `src/services/demoState.ts`; screen seperti `MemberCardScreen`, `TeamHomeScreen`, `MissionDetailScreen`, `QRFallbackScreen`, `SuccessStateScreen`, dan `LeaderboardScreen` hanya menerima props/callback.

Alasan: Pola ini paling kecil dan aman untuk Sprint 1 karena belum membutuhkan navigation/state library, tetapi sudah membuat UI mudah dipisah menjadi changeset berikutnya.

Dampak ke MVP: Core loop tetap sinkron dan komponen P0 bisa dipoles atau diuji bertahap tanpa mengubah business logic utama.

Alternatif yang ditolak: Menambahkan state management library; membuat navigation penuh sebelum core loop stabil; menyimpan state lokal di masing-masing screen; memisah mock store menjadi backend sebelum QR/progress/leaderboard stabil.

## DECISION-003 - Ledger QR Tetap Local Mock State untuk Sprint 1

Konteks: KOP-105/KOP-106 membutuhkan QR/manual verification, duplicate guard, dan history untuk Campaign Console. Backend produksi dan persistence belum menjadi prioritas Sprint 1.

Keputusan: Ledger aksi, used QR code, dan verification log disimpan di `DemoState` lokal dan dimutasi melalui `src/services/demoState.ts`.

Alasan: Pendekatan ini menjaga demo offline, deterministik, dan cepat diuji tanpa menambah backend/state library sebelum core loop stabil.

Dampak ke MVP: Demo bisa menunjukkan valid, invalid, blocked, duplicate, activity ledger, dan admin console history dari satu source of truth. Batasannya jelas sebagai mock/local state, bukan anti-fraud produksi.

Alternatif yang ditolak: Membuat backend persistence sekarang; menyimpan ledger di masing-masing screen; memakai async storage sebelum kebutuhan reload persistence jelas; membuat anti-fraud kompleks di luar scope MVP.

## DECISION-004 - Simpan Completion Summary di Demo State

Konteks: KOP-107/KOP-108 membutuhkan success feedback dan leaderboard transition yang memakai angka before/after sama. Jika angka dibuat terpisah di tiap screen, risiko inkonsistensi demo meningkat.

Keputusan: Dampak aksi sukses disimpan sebagai `latestCompletion` di `DemoState` dan diisi oleh `submitProductMission()`.

Alasan: Success screen dan leaderboard bisa membaca sumber data yang sama untuk saldo, progress, rank, score delta, achievement, dan kode QR yang dipakai.

Dampak ke MVP: Demo lebih mudah dijelaskan karena satu aksi Gabriel menghasilkan satu summary dampak yang menyambung ke reward, progress tim, leaderboard, dan admin console.

Alternatif yang ditolak: Hardcode before/after di masing-masing screen; menghitung ulang dampak visual secara terpisah di UI; menambah analytics/event system sebelum core loop stabil.

## DECISION-005 - KPI Campaign Console Dihitung dari DemoState

Konteks: Sprint 2 P0 membutuhkan Campaign Console yang sinkron dengan aktivitas user. Jika KPI admin memakai seed terpisah, dashboard bisa terlihat tidak konsisten setelah Gabriel scan QR.

Keputusan: KPI admin, campaign progress, team performance, mission performance, activity feed, dan verification log dihitung lewat `createAdminDashboard(state)` dari `DemoState`.

Alasan: Satu selector membuat angka admin mengikuti state yang sama dengan user flow, tanpa backend atau analytics production yang belum dibutuhkan untuk MVP hackathon.

Dampak ke MVP: Setelah Gabriel submit kode valid, dashboard bisa menjelaskan bahwa aksi user memengaruhi KPI, ledger, verification log, campaign progress, dan leaderboard secara sinkron.

Alternatif yang ditolak: Hardcode KPI admin terpisah; membuat backend analytics sekarang; menyimpan KPI sebagai state kedua di screen admin; membangun dashboard multi-route sebelum core loop dan console inline stabil.

## DECISION-006 - Voting Interaktif Didahulukan Sebelum Team Wrap Final

Konteks: Setelah Campaign Console P0 selesai, Sprint 2 P1 bisa memilih voting interaktif atau Team Wrap final. Core loop sudah memiliki share preview, tetapi voting sebelumnya masih statis.

Keputusan: Mengerjakan voting interaktif terlebih dahulu dengan local state `userVote`, vote count demo, dan persentase yang berubah setelah Gabriel memilih opsi.

Alasan: Voting langsung memperkuat sense of ownership anggota muda dan juga bisa ditampilkan di Campaign Console sebagai partisipasi yang terukur.

Dampak ke MVP: Flow user sekarang tidak hanya melihat voting, tetapi bisa memilih reward komunitas berikutnya. Admin juga melihat KPI partisipasi voting dari state yang sama.

Alternatif yang ditolak: Membuat Team Wrap final dulu; membuat voting real-time/backend; membuat sistem RAT legal; menambah fitur reward manager.

## DECISION-007 - Team Wrap Dibuat Screenshot-Ready, Bukan Native Share

Konteks: Sprint plan menyebut Team Wrap/share card P1 dan native share P2. Core loop P0 sudah berjalan, tetapi native share bisa menambah risiko integrasi platform.

Keputusan: Team Wrap dibuat sebagai screen/card screenshot-ready dengan data terbaru dari `DemoState`, tanpa native share API.

Alasan: Screenshot-ready cukup untuk demo hackathon, video, dan pitch. Ini memenuhi social loop tanpa menambah scope native integration.

Dampak ke MVP: User dapat menampilkan pencapaian tim setelah scan/vote, sementara tim tetap bisa menunda native share sampai P0/P1 stabil.

Alternatif yang ditolak: Native share sekarang; generate image file; integrasi screenshot API; membuat desain share multi-format sebelum demo utama stabil.

## DECISION-008 - Demo Hardening Menggunakan README dan docs/demo

Konteks: Sprint 3 P0 membutuhkan setup guide, demo flow, QR sample, dan checklist manual. Repo sudah memiliki README sebagai dokumen publik dan audit docs sebagai traceability.

Keputusan: Instruksi setup dan alur demo ringkas ditempatkan di `README.md`, sedangkan QR sample sheet dan manual run checklist ditempatkan di `docs/demo/`.

Alasan: README memberi entry point cepat untuk juri/tim, sementara `docs/demo/` menyimpan artifact rehearsal yang lebih operasional tanpa membuat README terlalu panjang.

Dampak ke MVP: Demo lebih mudah direkam ulang, state yang harus dicek lebih eksplisit, dan fallback QR/manual code terdokumentasi.

Alternatif yang ditolak: Menyimpan semua runbook hanya di README; membuat tool otomatis rehearsal; membuat QR image asset sebelum fallback manual stabil; membuat dokumen demo di luar repo.

## DECISION-009 - Tambahkan Rehearsal Script untuk Validasi State

Konteks: User meminta rehearsal 3 kali memakai checklist. Tool eksekusi tidak menyediakan browser automation untuk klik UI manual, tetapi core loop state dapat divalidasi secara deterministik melalui service yang sama.

Keputusan: Tambahkan `apps/mobile/scripts/rehearsal-check.ts` dan npm script `rehearse` untuk menjalankan validasi state transition tiga kali.

Alasan: Script memberi coverage cepat terhadap alur yang paling rawan rusak: join team, QR valid, duplicate guard, invalid code, voting, Team Wrap, Campaign Console, dan reset.

Dampak ke MVP: Tim bisa menjalankan sanity check sebelum rekam demo tanpa harus menebak apakah mock state masih konsisten. Manual visual QA tetap diperlukan untuk layout dan interaksi nyata.

Alternatif yang ditolak: Mengklaim klik manual penuh sudah dilakukan tanpa browser/device; menambah framework test besar; membuat automation UI e2e sebelum MVP demo stabil.

## DECISION-010 - Production-Lite Expo Go dengan Wizard Juri

Konteks: MVP tidak cukup hanya aman untuk video. Juri akan membuka aplikasi sendiri melalui Expo Go, sehingga app harus terasa seperti produk mobile yang bisa dieksplor, bukan single-scroll demo.

Keputusan: App diubah menjadi production-lite shell dengan wizard pembuka untuk juri, bottom navigation, state persistence lokal, tab Campaign Console, tab Profil untuk reset, dan QR camera path melalui `expo-camera` dengan fallback kode demo.

Alasan: Wizard membantu juri memahami masalah, arah solusi, dan dampak sebelum mencoba fitur. Bottom navigation membuat app terasa seperti produk nyata. Persistence mencegah state hilang ketika berpindah tab/reload ringan. Kamera QR meningkatkan kredibilitas, sementara fallback menjaga demo tetap aman.

Dampak ke MVP: Juri dapat mencoba flow sendiri dari Beranda -> Misi -> Komunitas -> Console tanpa presenter. App tetap jujur bahwa SIMKOPDES masih mock/local service dan Kopoin bukan dompet digital.

Alternatif yang ditolak: Mempertahankan single-scroll app; hanya mempercantik UI lama; memaksa backend produksi/MySQL sebelum core judging flow stabil; menghapus fallback manual demi kamera QR penuh.
