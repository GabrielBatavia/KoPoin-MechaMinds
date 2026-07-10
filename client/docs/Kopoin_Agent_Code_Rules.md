# Kopoin Agent Code Rules

**Nama dokumen:** Kopoin Agent Code Rules  
**Produk:** Kopoin - Setiap Aksi Punya Nilai  
**Tim:** MechaMinds  
**Versi:** v1.0  
**Tanggal dibuat:** 4 Juli 2026  
**Status:** Wajib dibaca oleh agent code sebelum mengerjakan prompt apa pun.

---

## 0. Aturan Paling Penting

Setiap agent code yang mengerjakan repository Kopoin wajib mengikuti dokumen ini sebelum membaca prompt user.

Urutan wajib setiap kali menerima prompt:

1. Baca dokumen ini terlebih dahulu.
2. Baca `Kopoin_MVP_Sprint_Plan.md` atau file sprint plan terbaru yang ditentukan tim.
3. Cocokkan prompt dengan scope MVP, backlog, user story, dan acceptance criteria.
4. Kerjakan hanya perubahan yang relevan dengan MVP.
5. Jalankan pengecekan yang masuk akal: build, lint, typecheck, test manual, atau minimal sanity check.
6. Catat semua perubahan ke audit file sebelum memberi ringkasan akhir.
7. Pastikan perubahan dapat dijelaskan sebagai commit bertahap yang logis, jujur, dan sesuai isi pekerjaan.

Agent tidak boleh mengerjakan fitur yang keluar dari MVP hanya karena terdengar keren. Kopoin harus menang karena core loop-nya tajam, bukan karena scope melebar.

---

## 1. Identitas Dasar Produk

Kopoin adalah **lapisan aktivasi, loyalitas, dan gamifikasi anggota muda** untuk ekosistem SIMKOPDES.

Kopoin bukan:

- pengganti SIMKOPDES;
- dompet digital;
- sistem pembayaran;
- marketplace baru;
- sistem RAT digital legal;
- aplikasi koperasi penuh dari nol;
- game kompleks seperti Duolingo;
- aplikasi AR/VR;
- sistem produksi pemerintah.

Kopoin adalah produk yang membuat anggota muda:

1. melihat koperasi sebagai sesuatu yang dekat dengan hidup sehari-hari;
2. punya alasan untuk aktif;
3. merasa menjadi bagian dari tim/komunitas;
4. mendapatkan manfaat nyata dari aksi kecil;
5. mendukung produk dan usaha lokal melalui mekanisme yang menyenangkan.

Kalimat positioning utama:

> Datang karena manfaat. Kembali karena tim. Bertahan karena merasa memiliki.

---

## 2. Prinsip Fundamental MVP

MVP Kopoin harus membuktikan satu loop utama:

> Anggota muda bergabung dalam tim, menjalankan misi koperasi, kontribusinya diverifikasi, poin dan progres tim bertambah, manfaat bersama semakin dekat, lalu pencapaian dapat dibagikan.

Semua perubahan code harus memperkuat loop tersebut.

### 2.1 Core Loop Wajib

Core loop demo wajib hidup dari awal sampai akhir:

1. User membuka Kopoin.
2. User melihat identitas anggota/koperasi simulasi.
3. User bergabung atau sudah berada dalam tim komunitas.
4. User melihat campaign/misi koperasi.
5. User membuka detail misi.
6. User melakukan scan QR simulasi atau fallback input kode manual.
7. Sistem memvalidasi kontribusi.
8. User mendapat Kopoin, streak, dan/atau achievement.
9. Progres tim bertambah.
10. Leaderboard berubah.
11. Voting/reward/share card tersedia sebagai bukti social loop.
12. Pengurus melihat aktivitas tersebut pada Campaign Console.

Jika prompt tidak memperkuat minimal salah satu langkah di atas, agent wajib menandainya sebagai scope creep.

---

## 3. Data Demo yang Tidak Boleh Sembarangan Diubah

Gunakan data demo standar kecuali user secara eksplisit mengubahnya.

| Entitas | Nilai Standar |
|---|---|
| Nama produk | Kopoin |
| Tagline | Setiap Aksi Punya Nilai |
| Koperasi demo | Koperasi Merah Putih Sukamaju |
| Campaign utama | 7 Hari Dukung Produk Koperasi Sukamaju |
| User demo | Gabriel |
| Tim user | Tim Pemuda Sukamaju |
| Produk utama | Kopi Sukamaju |
| Target misi | 100 transaksi produk lokal |
| Progres sebelum scan | 73/100 |
| Progres setelah scan | 74/100 |
| Poin transaksi | +120 Kopoin |
| Saldo setelah transaksi | 1.850 Kopoin |
| Penghematan simulasi | Rp37.500 bulan ini |
| Streak | 3 minggu dukung produk desa |
| Achievement | Anak Lokal, Selera Global |
| Leaderboard sebelum | Tim Pemuda Sukamaju peringkat 3 |
| Leaderboard setelah | Tim Pemuda Sukamaju peringkat 2 |
| Community unlock | 26 aksi lagi untuk kupon bersama |

Data ini penting untuk konsistensi pitch, demo, README, video, dan sprint plan.

---

## 4. Cara Membaca Sprint Plan agar Tidak Keluar Jalur

File sprint plan utama:

```text
Kopoin_MVP_Sprint_Plan.md
```

Sebelum coding, agent wajib mencari konteks dari bagian berikut:

| Bagian Sprint Plan | Fungsi |
|---|---|
| Ringkasan Eksekutif | Memahami posisi Kopoin dan loop utama. |
| Tujuan MVP | Menentukan kenapa fitur dibuat. |
| Prinsip Produk | Menjaga agar fitur tidak melebar. |
| Scope MVP | Memisahkan wajib, bagus jika selesai, dan jangan dipaksakan. |
| Demo Scenario Utama | Menjamin alur demo tetap hidup. |
| Struktur Tim | Memahami owner pekerjaan. |
| Sprint Timeline | Menentukan urutan pengerjaan. |
| Product Backlog | Menentukan prioritas P0/P1/P2. |
| Acceptance Criteria | Menentukan kapan task dianggap selesai. |
| QA/Test Plan | Menentukan validasi sebelum selesai. |
| Demo Script | Menjamin perubahan mendukung presentasi. |

### 4.1 Aturan Prioritas

Gunakan prioritas ini:

1. **P0:** harus selesai untuk demo end-to-end.
2. **P1:** meningkatkan kualitas pitch/demo, tetapi tidak boleh mengorbankan P0.
3. **P2:** hanya dikerjakan jika P0 dan P1 aman.
4. **Out of Scope:** jangan dikerjakan.

Jika user meminta fitur P2 sementara P0 belum stabil, agent wajib menjelaskan risikonya dan merekomendasikan alternatif P0.

### 4.2 Aturan Konflik

Jika prompt user bertentangan dengan sprint plan:

1. Utamakan MVP dan core loop.
2. Jangan langsung menghapus fondasi yang sudah benar.
3. Catat konflik di audit.
4. Jika perubahan tetap dikerjakan karena user eksplisit meminta, catat sebagai keputusan produk di `docs/audit/DECISION_LOG.md`.

---

## 5. Batas Scope yang Harus Dijaga

### 5.1 Wajib Dikerjakan untuk MVP

- Mobile-first demo flow.
- Mock data anggota/koperasi/campaign.
- Tim komunitas.
- Misi koperasi.
- QR scan simulasi atau fallback input kode.
- Reward Kopoin.
- Progress misi tim.
- Leaderboard komunitas.
- Voting sederhana.
- Share/Team Wrap sederhana.
- Campaign Console untuk pengurus.
- Audit log pengerjaan.
- Demo data yang konsisten.

### 5.2 Boleh Dikerjakan Jika P0 Stabil

- Animasi ringan pada success screen.
- Badge detail.
- Kupon/reward card.
- Empty state dan loading state.
- Responsive web polish.
- Export/share card visual.
- Seed data yang lebih lengkap.
- README setup yang lebih rapi.

### 5.3 Jangan Dikerjakan pada MVP Hackathon

- Integrasi SIMKOPDES produksi.
- Payment gateway.
- Dompet digital.
- Marketplace penuh.
- Login production-grade.
- KYC.
- RAT legal voting.
- WebAR/3D/VR.
- AI recommender kompleks.
- Push notification production.
- Analytics production.
- Multi-tenant production admin yang rumit.

Jika prompt meminta hal di atas, agent wajib menawarkan versi MVP yang aman dan sederhana.

---

## 6. Guidance Teknis untuk Agent Code

### 6.1 Prinsip Implementasi

Bangun secara vertikal, bukan horizontal.

Lebih baik satu flow demo berjalan penuh daripada sepuluh screen cantik tetapi tidak terhubung.

Urutan implementasi ideal:

1. data model/mock data;
2. app shell/navigation;
3. home/dashboard member;
4. mission list;
5. mission detail;
6. QR/manual verification;
7. reward success state;
8. team progress update;
9. leaderboard update;
10. voting/share card;
11. campaign console;
12. QA polish;
13. demo script alignment.

### 6.2 Mock API Lebih Diutamakan daripada Integrasi Palsu

Jika belum ada akses API produksi, gunakan mock API secara eksplisit.

Tidak boleh menulis copy seperti:

> Terhubung langsung dengan SIMKOPDES nasional.

Gunakan wording aman:

> MVP menggunakan mock API berstruktur SIMKOPDES untuk mensimulasikan integrasi data anggota, koperasi, campaign, dan aktivitas.

### 6.3 State Demo Harus Terlihat

Perubahan setelah aksi user harus terlihat jelas:

- poin bertambah;
- progress 73/100 menjadi 74/100;
- leaderboard berubah;
- achievement muncul;
- aktivitas masuk ke Campaign Console.

Jika agent membuat QR flow tapi state tidak berubah, task belum selesai.

### 6.4 Fallback Demo Wajib Ada

Fitur kamera/QR bisa gagal saat presentasi. Karena itu wajib ada fallback:

- tombol `Gunakan Kode Demo`;
- input kode manual seperti `KOPI-SUKAMAJU-001`;
- tombol `Simulasikan Scan Berhasil` untuk demo mode.

Fallback harus terlihat rapi, bukan debug kasar.

---

## 7. Standar UI/UX Kopoin

Kopoin harus terlihat:

- modern;
- clean;
- premium;
- Gen Z friendly;
- sosial;
- optimistis;
- dekat dengan koperasi desa;
- tidak terlalu corporate kaku;
- tidak terlalu game childish.

### 7.1 Warna Brand

Gunakan nuansa:

- teal;
- turquoise;
- light green;
- gold-yellow;
- cream;
- slate/dark gray;
- white space dominan.

### 7.2 Komponen Visual Utama

Prioritaskan komponen ini:

- kartu misi;
- progress bar;
- badge achievement;
- leaderboard card;
- team card;
- reward card;
- voting card;
- activity feed;
- share/team wrap card.

### 7.3 Copywriting UI

Gunakan bahasa Indonesia yang ringan tetapi tetap profesional.

Contoh copy yang sesuai:

- `Dukung Produk Lokal`
- `Tim Pemuda Sukamaju`
- `+120 Kopoin`
- `Misi Tim Bertambah!`
- `26 aksi lagi untuk buka reward bersama`
- `Pilih reward berikutnya`
- `Bagikan pencapaian tim`

Hindari copy yang terlalu formal seperti aplikasi administrasi pemerintah.

---

## 8. Audit Pengerjaan Wajib

Setiap prompt dan setiap perubahan harus dicatat.

Tujuan audit:

1. mengetahui siapa/agent mengerjakan apa;
2. menjaga pekerjaan tetap sesuai sprint;
3. memudahkan commit bertahap yang rapi;
4. memudahkan debugging saat demo;
5. menyediakan bukti riwayat kerja yang jujur dan konsisten;
6. mencegah perubahan besar tanpa catatan.

### 8.1 File Audit Wajib

Agent wajib membuat atau memperbarui file berikut jika belum ada:

```text
docs/audit/WORK_LOG.md
docs/audit/CHANGESET_INDEX.md
docs/audit/DECISION_LOG.md
docs/audit/DEMO_STATE_LOG.md
```

Jika project belum punya folder `docs/audit`, agent wajib membuatnya.

### 8.2 WORK_LOG.md

`WORK_LOG.md` mencatat pekerjaan per prompt.

Template:

```markdown
# Work Log Kopoin

Catatan pengerjaan aktual untuk menjaga traceability MVP Kopoin.

| Audit ID | Tanggal/Waktu | Prompt Ringkas | Prioritas | Area | File Diubah | Ringkasan Pekerjaan | Validasi | Status | Catatan Risiko |
|---|---|---|---|---|---|---|---|---|---|
| AUD-YYYYMMDD-001 | YYYY-MM-DD HH:mm | ... | P0/P1/P2 | mobile/api/docs | ... | ... | ... | Done/In Progress/Blocked | ... |
```

Aturan:

- Satu prompt minimal satu baris audit.
- Jika satu prompt mengubah banyak area, pecah menjadi beberapa Audit ID.
- Jangan menulis audit palsu.
- Jangan menghapus audit lama kecuali memperbaiki typo kecil.
- Jika ada kesalahan implementasi, catat sebagai perbaikan, jangan ditutupi.

### 8.3 CHANGESET_INDEX.md

`CHANGESET_INDEX.md` menghubungkan audit dengan commit/logical changeset.

Template:

```markdown
# Changeset Index Kopoin

| Changeset ID | Audit ID Terkait | Tipe | Scope | File Utama | Commit Message Disarankan | Status Commit | Catatan |
|---|---|---|---|---|---|---|---|
| CS-001 | AUD-YYYYMMDD-001 | docs | sprint/audit setup | docs/audit/* | docs(audit): initialize Kopoin work log | Not Committed | ... |
```

Tipe changeset yang disarankan:

- `docs`
- `feat`
- `fix`
- `refactor`
- `test`
- `chore`
- `style`
- `demo`

### 8.4 DECISION_LOG.md

`DECISION_LOG.md` mencatat keputusan produk/teknis yang memengaruhi arah MVP.

Template:

```markdown
# Decision Log Kopoin

| Decision ID | Tanggal | Keputusan | Alasan | Dampak | Alternatif yang Ditolak | Owner |
|---|---|---|---|---|---|---|
| DEC-YYYYMMDD-001 | YYYY-MM-DD | ... | ... | ... | ... | ... |
```

Contoh keputusan yang wajib dicatat:

- memilih mock API daripada integrasi produksi;
- menunda payment;
- mengubah struktur navigation;
- mengubah data demo utama;
- menghapus fitur dari P0;
- mengubah flow QR menjadi manual fallback;
- mengganti framework atau storage.

### 8.5 DEMO_STATE_LOG.md

`DEMO_STATE_LOG.md` mencatat state demo yang wajib konsisten.

Template:

```markdown
# Demo State Log Kopoin

| State ID | Area Demo | Sebelum | Sesudah | Trigger | File/Function Terkait | Status |
|---|---|---|---|---|---|---|
| STATE-001 | Mission Progress | 73/100 | 74/100 | QR Kopi Sukamaju berhasil | ... | Active |
```

State demo wajib:

- saldo Kopoin bertambah;
- progress misi bertambah;
- leaderboard berubah;
- achievement muncul;
- Campaign Console menerima activity;
- share card memakai data terbaru.

---

## 9. Aturan Commit Hygiene

Bagian ini penting.

Repo boleh disusun agar commit bertahap, rapi, dan mudah dinilai. Tetapi commit, audit, dan pesan commit harus tetap jujur terhadap pekerjaan yang benar-benar dilakukan.

Agent tidak boleh membantu:

- memalsukan waktu pengerjaan;
- membuat audit palsu;
- membuat commit message yang mengklaim pekerjaan berbeda dari isi commit;
- menyembunyikan pre-work agar terlihat seolah seluruh pekerjaan dibuat dari nol pada hari lomba;
- memanipulasi timestamp;
- menyusun riwayat git yang menipu juri atau panitia.

Yang boleh dan disarankan:

- memisahkan pekerjaan menjadi changeset kecil;
- membuat commit berdasarkan fitur yang logis;
- menjaga audit sesuai perubahan aktual;
- menandai mana yang berupa persiapan, dokumentasi, boilerplate, atau implementasi MVP;
- memastikan setiap commit bisa dijelaskan secara teknis;
- menggunakan branch yang jelas;
- menulis commit message sesuai isi file.

### 9.1 Format Commit Message

Gunakan format:

```text
<type>(<scope>): <ringkasan singkat>

Audit: <AUDIT_ID>
Changeset: <CHANGESET_ID>
```

Contoh:

```text
docs(audit): initialize Kopoin work tracking

Audit: AUD-20260704-001
Changeset: CS-001
```

```text
feat(mission): add QR success state for product mission

Audit: AUD-20260704-006
Changeset: CS-006
```

```text
feat(console): show campaign activity after mission completion

Audit: AUD-20260704-010
Changeset: CS-010
```

### 9.2 Urutan Commit yang Disarankan

Gunakan urutan ini jika sesuai dengan pekerjaan aktual:

| Urutan | Commit Scope | Isi Ideal |
|---|---|---|
| 1 | `docs(audit)` | aturan agent, work log, decision log, changeset index |
| 2 | `docs(product)` | MVP notes, demo script, sprint alignment |
| 3 | `chore(project)` | struktur folder, config, dependency dasar |
| 4 | `feat(data)` | mock data koperasi, user, campaign, mission |
| 5 | `feat(app-shell)` | navigation/shell/layout dasar |
| 6 | `feat(home)` | dashboard member dan kartu tim |
| 7 | `feat(mission)` | list/detail misi |
| 8 | `feat(qr)` | QR/manual verification flow |
| 9 | `feat(reward)` | success state, Kopoin, streak, achievement |
| 10 | `feat(leaderboard)` | update ranking tim |
| 11 | `feat(voting)` | voting reward/produk berikutnya |
| 12 | `feat(console)` | Campaign Console pengurus |
| 13 | `feat(share)` | Team Wrap/share card |
| 14 | `test/demo` | test, seed reset, fallback demo |
| 15 | `docs(readme)` | setup, demo guide, known limitations |
| 16 | `fix(polish)` | bug fix kecil dan UI polish |

Jangan membuat commit berisi campuran besar seperti `final update semua`. Itu sulit diaudit dan mencurigakan secara kualitas engineering.

### 9.3 Checklist Sebelum Commit

Sebelum commit, agent wajib memastikan:

- Audit ID sudah ada di `WORK_LOG.md`.
- Changeset ID sudah ada di `CHANGESET_INDEX.md`.
- File yang di-stage sesuai commit message.
- Tidak ada file rahasia seperti `.env`, credential, token, private key.
- Tidak ada data sensitif yang tidak perlu.
- Demo flow tidak rusak.
- Build/lint/test sudah dijalankan jika tersedia.
- Jika test tidak bisa dijalankan, alasan dicatat di audit.

---

## 10. Mapping File ke Commit agar Rapi

Gunakan pemisahan file agar commit tidak campur aduk.

Contoh mapping:

| Area | File/Folders | Commit Scope |
|---|---|---|
| Audit | `docs/audit/*` | `docs(audit)` |
| Product docs | `README.md`, `docs/product/*`, `docs/demo/*` | `docs(product)` |
| Mock data | `src/data/*`, `src/mocks/*`, `mock-api/*` | `feat(data)` |
| App shell | `src/app/*`, `src/navigation/*`, `src/layout/*` | `feat(app-shell)` |
| Home | `src/screens/Home*`, `src/components/member/*` | `feat(home)` |
| Mission | `src/screens/Mission*`, `src/components/mission/*` | `feat(mission)` |
| QR/manual verification | `src/screens/Scan*`, `src/components/qr/*` | `feat(qr)` |
| Reward | `src/components/reward/*`, `src/state/reward*` | `feat(reward)` |
| Leaderboard | `src/screens/Leaderboard*`, `src/components/leaderboard/*` | `feat(leaderboard)` |
| Voting | `src/screens/Voting*`, `src/components/voting/*` | `feat(voting)` |
| Console | `src/screens/Console*`, `src/components/console/*` | `feat(console)` |
| Share card | `src/screens/Share*`, `src/components/share/*` | `feat(share)` |
| Tests | `tests/*`, `__tests__/*` | `test(...)` |
| Config | `package.json`, `tsconfig.json`, config files | `chore(project)` |

Jika struktur repo berbeda, agent harus menyesuaikan mapping tanpa menghilangkan prinsip pemisahan changeset.

---

## 11. Format Respons Agent Setelah Mengerjakan Prompt

Setiap selesai prompt, agent code harus memberi ringkasan seperti ini:

```markdown
## Ringkasan Pengerjaan

- Audit ID: AUD-YYYYMMDD-XXX
- Changeset ID: CS-XXX
- Prioritas: P0/P1/P2
- Area: ...
- File diubah:
  - ...

## Yang Dikerjakan

- ...

## Validasi

- ...

## Catatan Risiko

- ...

## Commit yang Disarankan

`type(scope): message`
```

Jangan memberi ringkasan yang terlalu umum. Harus spesifik pada file dan efek perubahan.

---

## 12. Rules untuk Prompt User

Saat user memberi prompt baru, agent wajib mengklasifikasikan prompt menjadi salah satu:

| Kategori | Tindakan Agent |
|---|---|
| P0 core loop | Kerjakan langsung dengan prioritas tinggi. |
| P1 polish/demo | Kerjakan jika tidak merusak P0. |
| P2 nice-to-have | Tunda atau buat versi sangat ringan. |
| Out of scope | Jangan implementasi penuh; tawarkan versi MVP. |
| Bug fix | Perbaiki dan catat di audit. |
| Refactor | Boleh hanya jika mengurangi risiko demo. |
| Docs | Kerjakan jika memperjelas demo/setup/audit. |

### 12.1 Jika Prompt Terlalu Besar

Jangan mengerjakan semuanya sekaligus.

Pecah menjadi:

1. P0 minimal;
2. P1 tambahan;
3. P2 optional.

Kerjakan P0 dulu dan catat sisanya sebagai backlog.

### 12.2 Jika Prompt Tidak Jelas

Gunakan default MVP:

- pilih flow demo utama;
- gunakan data Sukamaju;
- gunakan mock API;
- prioritaskan state yang terlihat;
- jangan ubah narasi produk.

---

## 13. Definition of Done

Task dianggap selesai hanya jika memenuhi semua kriteria berikut:

- sesuai scope MVP;
- tidak merusak core loop demo;
- data demo tetap konsisten;
- UI tidak terlihat mentah/debug;
- ada fallback jika fitur rawan gagal;
- audit log diperbarui;
- changeset dicatat;
- validasi dicatat;
- commit message yang disarankan sesuai isi perubahan;
- tidak ada klaim integrasi palsu;
- tidak ada file rahasia ikut tersimpan.

Jika salah satu belum terpenuhi, status task adalah `In Progress`, bukan `Done`.

---

## 14. Quality Gate Demo

Sebelum demo, jalankan checklist ini:

```markdown
# Demo Readiness Checklist

- [ ] App bisa dibuka tanpa error.
- [ ] Home menampilkan Gabriel dan Koperasi Merah Putih Sukamaju.
- [ ] Tim Pemuda Sukamaju terlihat.
- [ ] Campaign 7 Hari Dukung Produk Koperasi Sukamaju terlihat.
- [ ] Mission detail terbuka.
- [ ] QR/manual verification berhasil.
- [ ] Success screen menampilkan +120 Kopoin.
- [ ] Progress berubah 73/100 ke 74/100.
- [ ] Leaderboard berubah dari rank 3 ke rank 2.
- [ ] Achievement Anak Lokal, Selera Global muncul.
- [ ] Voting page tersedia.
- [ ] Campaign Console menampilkan aktivitas terbaru.
- [ ] Share/Team Wrap dapat ditampilkan.
- [ ] Reset demo state tersedia.
- [ ] Tidak ada crash pada flow 3-5 menit.
- [ ] README setup jelas.
- [ ] Audit log lengkap.
```

---

## 15. Reset Demo State

Agent disarankan membuat mekanisme reset demo state.

Tujuan:

- demo bisa diulang berkali-kali;
- video bisa direkam ulang;
- juri bisa melihat before-after dengan jelas.

State awal:

```json
{
  "missionProgress": {
    "current": 73,
    "target": 100
  },
  "userKopoinBalance": 1730,
  "teamRank": 3,
  "achievementUnlocked": false,
  "latestActivity": null
}
```

State setelah scan berhasil:

```json
{
  "missionProgress": {
    "current": 74,
    "target": 100
  },
  "userKopoinBalance": 1850,
  "teamRank": 2,
  "achievementUnlocked": true,
  "latestActivity": "Gabriel mendukung produk Kopi Sukamaju dan mendapat +120 Kopoin"
}
```

---

## 16. Red Flag yang Harus Dicegah

Agent harus berhenti atau memberi peringatan jika melihat hal berikut:

- fitur baru menghapus core loop;
- UI terlalu banyak tetapi tidak ada state berjalan;
- QR flow tidak punya fallback;
- leaderboard tidak berubah setelah aksi;
- Campaign Console tidak menerima activity;
- copy mengklaim integrasi produksi;
- code menyimpan credential;
- commit message tidak sesuai isi file;
- audit tidak diperbarui;
- perubahan besar masuk dalam satu commit tanpa alasan;
- pekerjaan pre-event diklaim sebagai pekerjaan event tanpa penjelasan.

---

## 17. Instruksi Khusus untuk Hari Lomba

Pada hari lomba, agent harus membantu tim bekerja cepat tetapi tetap rapi.

Aturan hari lomba:

1. Setiap task kecil harus punya Audit ID.
2. Setiap commit harus punya Changeset ID.
3. Jangan campur fitur besar dalam satu commit.
4. Jangan refactor besar jika demo belum stabil.
5. Jangan mengejar P2 sebelum P0 selesai.
6. Prioritaskan flow yang bisa ditunjukkan ke juri.
7. Dokumentasikan error dan fix secara jujur.
8. Gunakan branch jika eksperimen berisiko.
9. Simpan demo script dan reset state.
10. Jangan memalsukan riwayat pengerjaan.

---

## 18. Template Awal File Audit

Jika file audit belum ada, agent boleh membuat isi awal berikut.

### 18.1 `docs/audit/WORK_LOG.md`

```markdown
# Work Log Kopoin

Catatan pengerjaan aktual untuk menjaga traceability MVP Kopoin.

| Audit ID | Tanggal/Waktu | Prompt Ringkas | Prioritas | Area | File Diubah | Ringkasan Pekerjaan | Validasi | Status | Catatan Risiko |
|---|---|---|---|---|---|---|---|---|---|
```

### 18.2 `docs/audit/CHANGESET_INDEX.md`

```markdown
# Changeset Index Kopoin

| Changeset ID | Audit ID Terkait | Tipe | Scope | File Utama | Commit Message Disarankan | Status Commit | Catatan |
|---|---|---|---|---|---|---|---|
```

### 18.3 `docs/audit/DECISION_LOG.md`

```markdown
# Decision Log Kopoin

| Decision ID | Tanggal | Keputusan | Alasan | Dampak | Alternatif yang Ditolak | Owner |
|---|---|---|---|---|---|---|
```

### 18.4 `docs/audit/DEMO_STATE_LOG.md`

```markdown
# Demo State Log Kopoin

| State ID | Area Demo | Sebelum | Sesudah | Trigger | File/Function Terkait | Status |
|---|---|---|---|---|---|---|
| STATE-001 | Mission Progress | 73/100 | 74/100 | QR Kopi Sukamaju berhasil | TBD | Planned |
| STATE-002 | Kopoin Balance | 1.730 | 1.850 | QR Kopi Sukamaju berhasil | TBD | Planned |
| STATE-003 | Team Rank | Rank 3 | Rank 2 | Mission progress bertambah | TBD | Planned |
| STATE-004 | Achievement | Locked | Anak Lokal, Selera Global unlocked | QR Kopi Sukamaju berhasil | TBD | Planned |
| STATE-005 | Console Activity | Tidak ada aktivitas terbaru | Aktivitas Gabriel masuk | QR Kopi Sukamaju berhasil | TBD | Planned |
```

---

## 19. Rule Jika Ada Perubahan Strategi dari Gabriel

Jika Gabriel memberi perubahan strategi, agent harus:

1. catat prompt ringkas di `WORK_LOG.md`;
2. catat keputusan di `DECISION_LOG.md` jika berdampak pada arah MVP;
3. update sprint/backlog jika diperlukan;
4. pastikan perubahan tidak merusak core loop;
5. jelaskan risiko secara langsung.

Contoh perubahan yang wajib masuk decision log:

- mengganti campaign utama;
- mengganti data demo;
- mengganti teknologi utama;
- menghapus Campaign Console;
- menghapus QR flow;
- mengganti leaderboard menjadi mekanisme lain;
- menambah fitur besar di luar MVP.

---

## 20. Prinsip Akhir

Kopoin harus terasa seperti MVP yang tajam, bukan prototype yang kebanyakan ide.

Prioritas tertinggi:

1. core loop berjalan;
2. demo meyakinkan;
3. narasi kuat;
4. audit rapi;
5. commit bertahap dan jujur;
6. tidak ada klaim palsu;
7. tidak keluar dari sprint plan.

Agent code harus menjaga produk tetap fokus pada satu janji:

> Kopoin membuat anggota muda tidak hanya terdaftar di koperasi, tetapi aktif, bangga, dan merasa punya peran dalam ekonomi lokal.
