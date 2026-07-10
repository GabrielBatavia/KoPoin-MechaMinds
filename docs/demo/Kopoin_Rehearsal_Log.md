# Kopoin Rehearsal Log

Log ini mencatat hasil rehearsal demo sebelum perekaman. Rehearsal otomatis memvalidasi state transition core loop, duplicate guard, invalid code, voting, Team Wrap, Campaign Console, dan reset demo.

## REHEARSAL-001 - Sprint 3 Hardening Pass 1

Tanggal: 2026-07-04

Command:

```bash
npm run rehearse -- 1
```

Hasil: PASS

Yang tervalidasi:
- Initial state: progress 73/100, saldo 1.730, rank #3.
- Join team berhasil.
- Kode valid `KOPI-SUKAMAJU-001` menghasilkan +120 Kopoin, progress 74/100, saldo 1.850, achievement unlock, leaderboard rank #2.
- Duplicate guard memblokir submit kedua tanpa menambah poin/progress.
- Kode invalid `KOPI-SUKAMAJU-999` menghasilkan verification log `rejected`.
- Voting `reward_kopi` tersimpan dan KPI admin berubah.
- Team Wrap membaca rank #2, progress 74/100, dan vote user.
- Reset demo kembali ke progress 73/100, saldo 1.730, rank #3, dan vote kosong.

Catatan: Lulus.

## REHEARSAL-002 - Sprint 3 Hardening Pass 2

Tanggal: 2026-07-04

Command:

```bash
npm run rehearse -- 2
```

Hasil: PASS

Yang tervalidasi:
- Flow state sama dengan REHEARSAL-001.
- Reset demo deterministik.
- Tidak ada mismatch angka demo.

Catatan: Lulus.

## REHEARSAL-003 - Sprint 3 Hardening Pass 3

Tanggal: 2026-07-04

Command:

```bash
npm run rehearse -- 3
```

Hasil: PASS

Yang tervalidasi:
- Flow state sama dengan REHEARSAL-001.
- Duplicate guard tetap tidak menambah poin/progress.
- Admin KPI, Team Wrap, dan reset tetap konsisten.

Catatan: Lulus.

## BUILD-CHECK-001 - Typecheck dan Web Export

Tanggal: 2026-07-04

Command:

```bash
npm run typecheck
npx expo export --platform web --output-dir dist --clear
```

Hasil: PASS

Catatan:
- Typecheck lulus tanpa error.
- Web export berhasil ke `apps/mobile/dist`.
- Percobaan export pertama ke folder temp di luar project gagal karena Expo mewajibkan output berada di dalam project directory; setelah diganti ke `dist`, export berhasil.

## Batasan Rehearsal

- Rehearsal otomatis ini bukan pengganti klik manual di browser/device.
- Manual visual QA tetap perlu dilakukan untuk memastikan spacing, scroll, readability, dan screenshot Team Wrap aman di device target.
