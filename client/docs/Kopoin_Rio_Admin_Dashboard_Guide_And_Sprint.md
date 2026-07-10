# Kopoin - Rio Admin Dashboard Guide & Sprint Plan

**Owner utama:** Rio  
**Produk:** Kopoin - Setiap Aksi Punya Nilai  
**Komponen:** Admin Dashboard / Campaign Console  
**Versi:** v1.0  
**Tanggal:** 4 Juli 2026  
**Status:** Dokumen kerja untuk agent code dan pengerjaan Rio.

---

## 0. Aturan Wajib untuk Rio atau Agent Code

Sebelum mengerjakan dashboard admin, baca dokumen ini bersama:

1. `Kopoin_Agent_Code_Rules.md`
2. `Kopoin_MVP_Sprint_Plan.md`
3. `Kopoin_API_And_Mock_Data_Contract.md` jika sudah ada
4. `WORK_LOG.md` atau audit file terbaru

Admin dashboard tidak boleh berubah menjadi sistem ERP koperasi, sistem akuntansi, sistem legal RAT, atau CMS besar. Dashboard ini hanya bertugas membuktikan bahwa pengurus koperasi dapat memantau campaign Kopoin secara jelas, cepat, dan meyakinkan.

---

## 1. Tujuan Admin Dashboard

Admin dashboard Kopoin adalah layar monitoring untuk pengurus koperasi atau panitia campaign agar mereka dapat melihat:

1. campaign apa yang sedang berjalan;
2. berapa banyak anggota muda yang aktif;
3. misi mana yang paling banyak diselesaikan;
4. tim mana yang paling aktif;
5. kontribusi user yang masuk dari QR/misi;
6. reward bersama sudah seberapa dekat;
7. performa engagement Kopoin secara ringkas;
8. bukti bahwa Kopoin bukan sekadar gimmick, tetapi punya indikator kinerja yang bisa dipantau.

Dashboard ini harus memperkuat narasi:

> Kopoin membuat aktivitas koperasi yang sebelumnya pasif menjadi terukur, sosial, dan bisa dikelola.

---

## 2. Scope MVP Admin Dashboard

### 2.1 Scope Wajib / P0

Dashboard wajib memiliki:

| Kode | Fitur | Tujuan |
|---|---|---|
| ADM-P0-01 | Overview KPI Cards | Menampilkan ringkasan performa campaign. |
| ADM-P0-02 | Campaign Progress Panel | Menampilkan progres misi kolektif dan reward bersama. |
| ADM-P0-03 | Team Leaderboard | Menampilkan ranking tim berdasarkan Kopoin. |
| ADM-P0-04 | User Activity Table | Menampilkan aktivitas user terbaru. |
| ADM-P0-05 | Mission Performance | Menampilkan performa tiap misi. |
| ADM-P0-06 | QR Verification Log | Menampilkan log kontribusi hasil scan QR/mock verification. |
| ADM-P0-07 | Demo State Sync | Angka dashboard berubah atau terlihat selaras dengan flow user. |

### 2.2 Scope Bagus Kalau Sempat / P1

| Kode | Fitur | Tujuan |
|---|---|---|
| ADM-P1-01 | Filter Campaign | Filter campaign aktif/selesai. |
| ADM-P1-02 | Filter Tim | Melihat performa per tim. |
| ADM-P1-03 | Simple Chart | Grafik aktivitas harian atau kontribusi per misi. |
| ADM-P1-04 | Export Dummy Report | Tombol export visual/non-functional untuk presentasi. |
| ADM-P1-05 | Admin Notes | Catatan pengurus terhadap campaign. |

### 2.3 Jangan Dikerjakan / Out of Scope

Dashboard tidak perlu:

- login admin production;
- role-based access control kompleks;
- integrasi SIMKOPDES asli;
- database produksi;
- CRUD koperasi lengkap;
- pengelolaan stok barang;
- sistem pembayaran;
- validasi transaksi real;
- audit legal;
- manajemen anggota penuh;
- analytics kompleks multi-cabang;
- machine learning prediction;
- notifikasi real-time production.

---

## 3. Persona Admin

### 3.1 Persona Utama

**Nama:** Bu Rina  
**Role:** Pengurus Koperasi Desa Sukamaju  
**Kebutuhan:** Ingin tahu apakah anak muda benar-benar ikut campaign koperasi.  
**Masalah:** Selama ini susah membedakan anggota yang hanya terdaftar dengan anggota yang benar-benar aktif.  
**Harapan:** Ada dashboard sederhana untuk melihat aktivitas, progres, ranking tim, dan hasil campaign.

### 3.2 Jobs To Be Done

Ketika campaign koperasi berjalan, admin ingin:

1. melihat performa campaign dalam 30 detik;
2. tahu apakah target reward bersama sudah dekat;
3. tahu tim mana yang paling aktif;
4. melihat aktivitas user terbaru sebagai bukti partisipasi;
5. tahu misi mana yang efektif menarik anggota;
6. punya angka ringkas untuk dilaporkan ke pengurus atau juri.

---

## 4. Narasi Dashboard untuk Demo

Dashboard harus bisa dijelaskan dalam pitch seperti ini:

> Di sisi pengurus, Kopoin menyediakan Campaign Console. Pengurus tidak hanya melihat jumlah anggota, tetapi melihat anggota yang benar-benar aktif: siapa yang menyelesaikan misi, tim mana yang bergerak, progres reward bersama, dan misi mana yang paling efektif. Jadi Kopoin bukan hanya membuat Gen Z tertarik, tetapi juga membantu koperasi membaca kinerja partisipasi secara terukur.

---

## 5. KPI yang Harus Ditampilkan

### 5.1 KPI Utama / P0

| KPI | Definisi | Contoh Nilai Demo | Kenapa Penting |
|---|---|---:|---|
| Active Members | Jumlah anggota yang melakukan minimal satu aksi dalam campaign | 128 | Mengukur aktivasi, bukan sekadar anggota terdaftar. |
| Mission Completions | Total misi yang selesai | 342 | Mengukur volume partisipasi. |
| Total Kopoin Issued | Total poin yang diberikan | 18.450 | Mengukur nilai gamifikasi yang dibagikan. |
| Team Progress | Progres menuju reward bersama | 72% | Mengukur kedekatan komunitas terhadap target. |
| QR Verifications | Jumlah kontribusi terverifikasi via QR/mock QR | 96 | Mengukur aksi konkret, bukan sekadar klik. |
| Voting Participation | Jumlah user yang ikut voting | 84 | Mengukur sense of ownership. |
| Top Team | Tim dengan kontribusi tertinggi | Tim Pemuda Sukamaju | Menampilkan dinamika sosial. |
| Completion Rate | Persentase user aktif yang menyelesaikan minimal satu misi | 68% | Mengukur kualitas engagement. |

### 5.2 KPI Pendukung / P1

| KPI | Definisi | Contoh Nilai Demo |
|---|---|---:|
| Avg Missions per Active Member | Rata-rata misi per anggota aktif | 2,7 |
| Repeat Participation | User yang melakukan lebih dari satu aksi | 46% |
| Streak Users | User dengan streak aktif | 51 |
| Most Popular Mission | Misi dengan completion tertinggi | Beli Produk Lokal |
| Reward Readiness | Status kesiapan reward | On Track |

---

## 6. KPI Formula

Gunakan formula sederhana agar angka dapat dijelaskan ke juri.

```text
Active Members = count(unique user_id where activity_count > 0)
Mission Completions = count(activity where status = "verified")
Total Kopoin Issued = sum(points_awarded)
Team Progress % = min(total_team_points / reward_target_points * 100, 100)
QR Verifications = count(activity where verification_type = "qr")
Voting Participation = count(unique user_id where vote_submitted = true)
Completion Rate % = active_members_with_completed_mission / active_members * 100
Avg Missions per Active Member = mission_completions / active_members
Repeat Participation % = users_with_2_or_more_activities / active_members * 100
```

Untuk MVP, angka boleh berasal dari mock data selama konsisten dan berubah sesuai demo state.

---

## 7. Halaman Dashboard

### 7.1 Page 1 - Admin Overview

**Route disarankan:** `/admin` atau `/dashboard`

Tujuan: memberikan ringkasan performa campaign dalam satu layar.

Komponen wajib:

1. Header dashboard
2. Campaign selector atau campaign title
3. KPI cards
4. Campaign progress card
5. Team leaderboard mini
6. Recent activity list
7. Mission performance summary

Content utama:

```text
Campaign: 7 Hari Dukung Produk Koperasi Sukamaju
Status: Aktif
Hari: 4 dari 7
Target: 25.000 Kopoin untuk membuka Reward Bersama
Progress: 18.450 / 25.000 Kopoin
```

### 7.2 Page 2 - Campaign Detail

**Route disarankan:** `/admin/campaigns/sukamaju-7hari`

Tujuan: melihat performa campaign lebih rinci.

Komponen wajib:

1. Campaign detail header
2. Progress bar besar
3. KPI row
4. Mission cards
5. Team ranking table
6. QR verification log
7. Voting summary

### 7.3 Page 3 - User Activity

**Route disarankan:** `/admin/activities`

Tujuan: menampilkan bukti partisipasi user.

Komponen wajib:

1. Activity table
2. Filter status sederhana
3. Activity status badge
4. User name
5. Team
6. Mission
7. Points
8. Verification type
9. Timestamp

### 7.4 Page 4 - Mission Performance

**Route disarankan:** `/admin/missions`

Tujuan: membandingkan misi mana yang paling efektif.

Komponen wajib:

1. Mission list
2. Completion count
3. Total Kopoin generated
4. Active participants
5. Difficulty label
6. Impact label

Page ini P1. Jika waktu sempit, gabungkan ke Admin Overview.

---

## 8. Layout Dashboard yang Disarankan

### 8.1 Desktop Layout

```text
+---------------------------------------------------------------+
| Kopoin Admin Console                Campaign: Sukamaju 7 Hari |
+---------------+-----------------------------------------------+
| Sidebar       | KPI Cards                                     |
| - Overview    | [Active Members] [Completions] [Kopoin]       |
| - Campaign    | [Progress] [QR Verified] [Voting]             |
| - Activities  |                                               |
| - Missions    | Campaign Progress                             |
|               | [===========72%===========>        ]           |
|               |                                               |
|               | Team Leaderboard        Recent Activity       |
|               | Mission Performance     QR Verification Log   |
+---------------+-----------------------------------------------+
```

### 8.2 Mobile/Small Screen Layout

Admin dashboard tidak wajib mobile-perfect, tetapi harus tetap tidak hancur di layar laptop. Minimal responsive:

1. KPI cards turun menjadi 2 kolom atau 1 kolom.
2. Sidebar boleh berubah menjadi top nav.
3. Table boleh horizontal scroll.
4. Progress card tetap terlihat.

---

## 9. Visual Direction

Gunakan identitas Kopoin:

| Elemen | Arah Visual |
|---|---|
| Warna utama | Teal, turquoise, light green |
| Aksen | Gold-yellow untuk reward/progress penting |
| Background | Cream atau putih bersih |
| Text | Slate gray / dark gray |
| Card | Rounded, clean, soft shadow |
| Mood | Modern, koperasi muda, gamified, tetapi tetap credible untuk pengurus |

Dashboard harus terasa:

- profesional;
- ringan;
- bukan dashboard enterprise berat;
- tetap dekat dengan identitas Gen Z Kopoin;
- bisa dipercaya oleh juri dan pengurus koperasi.

---

## 10. Data Mock Admin Dashboard

Gunakan data default ini agar konsisten dengan demo mobile.

### 10.1 Campaign

```json
{
  "campaign_id": "cmp_sukamaju_7hari",
  "name": "7 Hari Dukung Produk Koperasi Sukamaju",
  "status": "active",
  "day_current": 4,
  "day_total": 7,
  "start_date": "2026-07-04",
  "end_date": "2026-07-10",
  "reward_name": "Voucher Produk Lokal Bersama",
  "reward_target_points": 25000,
  "current_points": 18450,
  "progress_percent": 73.8
}
```

### 10.2 KPI Summary

```json
{
  "active_members": 128,
  "mission_completions": 342,
  "total_kopoin_issued": 18450,
  "team_progress_percent": 73.8,
  "qr_verifications": 96,
  "voting_participation": 84,
  "completion_rate_percent": 68,
  "avg_missions_per_member": 2.7,
  "repeat_participation_percent": 46,
  "streak_users": 51
}
```

### 10.3 Team Leaderboard

```json
[
  {
    "rank": 1,
    "team_id": "team_pemuda_sukamaju",
    "team_name": "Tim Pemuda Sukamaju",
    "members": 24,
    "points": 7850,
    "missions_completed": 118,
    "trend": "+12%"
  },
  {
    "rank": 2,
    "team_id": "team_kreatif_desa",
    "team_name": "Tim Kreatif Desa",
    "members": 19,
    "points": 6240,
    "missions_completed": 91,
    "trend": "+8%"
  },
  {
    "rank": 3,
    "team_id": "team_koperasi_muda",
    "team_name": "Tim Koperasi Muda",
    "members": 21,
    "points": 4360,
    "missions_completed": 72,
    "trend": "+5%"
  }
]
```

### 10.4 Recent Activities

```json
[
  {
    "activity_id": "act_001",
    "user_name": "Gabriel",
    "team_name": "Tim Pemuda Sukamaju",
    "mission_name": "Beli Produk Lokal",
    "points_awarded": 150,
    "verification_type": "QR",
    "status": "verified",
    "timestamp": "2026-07-04 14:20"
  },
  {
    "activity_id": "act_002",
    "user_name": "Nadia",
    "team_name": "Tim Kreatif Desa",
    "mission_name": "Ajak Anggota Aktif",
    "points_awarded": 200,
    "verification_type": "manual",
    "status": "verified",
    "timestamp": "2026-07-04 14:12"
  },
  {
    "activity_id": "act_003",
    "user_name": "Bima",
    "team_name": "Tim Koperasi Muda",
    "mission_name": "Check-in Koperasi",
    "points_awarded": 100,
    "verification_type": "QR",
    "status": "verified",
    "timestamp": "2026-07-04 14:05"
  }
]
```

### 10.5 Mission Performance

```json
[
  {
    "mission_id": "mission_beli_produk_lokal",
    "mission_name": "Beli Produk Lokal",
    "completions": 132,
    "participants": 76,
    "points_generated": 9900,
    "impact_label": "Paling berdampak",
    "difficulty": "Mudah"
  },
  {
    "mission_id": "mission_ajak_anggota",
    "mission_name": "Ajak Anggota Aktif",
    "completions": 64,
    "participants": 39,
    "points_generated": 4800,
    "impact_label": "Akuisisi anggota",
    "difficulty": "Sedang"
  },
  {
    "mission_id": "mission_checkin",
    "mission_name": "Check-in ke Koperasi",
    "completions": 87,
    "participants": 58,
    "points_generated": 4350,
    "impact_label": "Kunjungan fisik",
    "difficulty": "Mudah"
  },
  {
    "mission_id": "mission_belajar",
    "mission_name": "Selesaikan Pembelajaran",
    "completions": 59,
    "participants": 44,
    "points_generated": 2950,
    "impact_label": "Literasi koperasi",
    "difficulty": "Mudah"
  }
]
```

---

## 11. Demo State Sync

Dashboard harus terasa terhubung dengan aplikasi user. Minimal ada satu perubahan yang bisa dijelaskan setelah Gabriel menyelesaikan misi.

### 11.1 State Sebelum Scan QR

```text
Total Kopoin Issued: 18.300
Team Pemuda Sukamaju Points: 7.700
QR Verifications: 95
Mission Completions: 341
Progress: 73.2%
Recent Activity terbaru: Nadia / Ajak Anggota Aktif
```

### 11.2 State Sesudah Scan QR Gabriel

```text
Total Kopoin Issued: 18.450
Team Pemuda Sukamaju Points: 7.850
QR Verifications: 96
Mission Completions: 342
Progress: 73.8%
Recent Activity terbaru: Gabriel / Beli Produk Lokal / +150 Kopoin / QR Verified
```

### 11.3 Implementasi Sederhana

Pilih salah satu:

1. **Shared mock state file**: mobile dan admin membaca data dari file JSON yang sama.
2. **Local storage demo state**: dashboard punya tombol/trigger `Apply Gabriel QR Demo`.
3. **Mock API in-memory**: endpoint `POST /api/demo/complete-mission` mengubah state.
4. **Hardcoded demo toggle**: tombol kecil tersembunyi untuk mengganti before/after.

Untuk hackathon, opsi 2 atau 4 masih valid jika jujur disebut sebagai demo simulation. Yang penting angka konsisten.

---

## 12. User Stories dan Acceptance Criteria

### ADM-P0-01 - Overview KPI Cards

**Sebagai** pengurus koperasi,  
**saya ingin** melihat KPI utama campaign,  
**agar** saya bisa menilai performa campaign dalam waktu singkat.

Acceptance criteria:

- menampilkan minimal 6 KPI utama;
- setiap KPI punya label, angka, dan subtext;
- angka sesuai mock data;
- layout rapi di desktop;
- tidak ada angka dummy yang bertentangan dengan halaman lain.

---

### ADM-P0-02 - Campaign Progress Panel

**Sebagai** pengurus koperasi,  
**saya ingin** melihat progres reward bersama,  
**agar** saya tahu seberapa dekat komunitas mencapai target.

Acceptance criteria:

- menampilkan nama campaign;
- menampilkan status aktif;
- menampilkan hari campaign;
- menampilkan progress bar;
- menampilkan current points dan target points;
- progress berubah setelah demo state diterapkan.

---

### ADM-P0-03 - Team Leaderboard

**Sebagai** pengurus koperasi,  
**saya ingin** melihat tim paling aktif,  
**agar** saya tahu kelompok mana yang paling berkontribusi.

Acceptance criteria:

- minimal 3 tim tampil;
- ranking berdasarkan points;
- Tim Pemuda Sukamaju ranking 1;
- points Tim Pemuda Sukamaju naik setelah Gabriel menyelesaikan misi;
- ada indikator trend sederhana.

---

### ADM-P0-04 - User Activity Table

**Sebagai** pengurus koperasi,  
**saya ingin** melihat aktivitas user terbaru,  
**agar** saya bisa melihat bukti partisipasi real-time/demo-time.

Acceptance criteria:

- tabel memiliki kolom user, team, mission, points, verification, status, timestamp;
- aktivitas Gabriel bisa muncul sebagai activity terbaru;
- status verified tampil jelas;
- table tidak pecah di laptop.

---

### ADM-P0-05 - Mission Performance

**Sebagai** pengurus koperasi,  
**saya ingin** melihat performa tiap misi,  
**agar** saya tahu misi mana yang efektif.

Acceptance criteria:

- minimal 4 misi tampil;
- setiap misi punya completions, participants, points generated;
- misi Beli Produk Lokal terlihat sebagai misi paling kuat;
- data konsisten dengan campaign narrative.

---

### ADM-P0-06 - QR Verification Log

**Sebagai** pengurus koperasi,  
**saya ingin** melihat verifikasi kontribusi,  
**agar** saya yakin poin tidak hanya diberikan dari klik kosong.

Acceptance criteria:

- log menampilkan verification type;
- minimal ada status QR verified;
- aktivitas Gabriel masuk sebagai QR verification;
- tidak perlu validasi QR production.

---

## 13. Sprint Plan Rio

### Sprint Admin 0 - Setup & Alignment

**Durasi target:** 1-2 jam  
**Tujuan:** Menyiapkan fondasi dashboard dan memastikan scope tidak melebar.

Tasks:

| ID | Task | Output |
|---|---|---|
| RIO-S0-01 | Baca sprint utama dan agent rules | Pemahaman scope. |
| RIO-S0-02 | Tentukan framework dashboard yang dipakai | Next.js/React/Vite/etc sesuai repo. |
| RIO-S0-03 | Buat route admin dasar | `/admin` bisa dibuka. |
| RIO-S0-04 | Buat file mock data admin | `adminMockData` atau JSON setara. |
| RIO-S0-05 | Catat audit awal | Entry di `WORK_LOG.md`. |

Acceptance:

- dashboard route hidup;
- data mock terpisah dari komponen;
- tidak ada fitur di luar scope.

---

### Sprint Admin 1 - KPI Overview

**Durasi target:** 3-4 jam  
**Tujuan:** Membuat dashboard overview terlihat bernilai untuk juri.

Tasks:

| ID | Task | Output |
|---|---|---|
| RIO-S1-01 | Buat layout admin shell | Header, sidebar/top nav, content area. |
| RIO-S1-02 | Buat KPI card component | Reusable card. |
| RIO-S1-03 | Render KPI utama | Active members, completions, Kopoin, progress, QR, voting. |
| RIO-S1-04 | Buat campaign progress card | Progress bar dan target reward. |
| RIO-S1-05 | Styling sesuai brand Kopoin | Teal, cream, gold, clean cards. |
| RIO-S1-06 | Update audit | Catat komponen dan file. |

Acceptance:

- overview terlihat rapi;
- semua KPI tampil;
- progress campaign jelas;
- bisa dipakai untuk screenshot pitch.

---

### Sprint Admin 2 - Monitoring Tables

**Durasi target:** 3-5 jam  
**Tujuan:** Membuat dashboard terasa sebagai alat monitoring, bukan landing page.

Tasks:

| ID | Task | Output |
|---|---|---|
| RIO-S2-01 | Buat team leaderboard table | Ranking tim. |
| RIO-S2-02 | Buat recent activity table | Aktivitas user terbaru. |
| RIO-S2-03 | Buat mission performance section | Misi dan completions. |
| RIO-S2-04 | Buat QR verification log | Status QR/manual verified. |
| RIO-S2-05 | Tambah status badge | verified, pending, rejected jika perlu. |
| RIO-S2-06 | Update audit | Catat file dan fitur. |

Acceptance:

- Tim Pemuda Sukamaju ranking 1;
- activity Gabriel bisa muncul;
- misi Beli Produk Lokal terlihat paling kuat;
- tabel tidak berantakan.

---

### Sprint Admin 3 - Demo State & Polish

**Durasi target:** 2-4 jam  
**Tujuan:** Membuat dashboard siap demo dan sinkron dengan alur user.

Tasks:

| ID | Task | Output |
|---|---|---|
| RIO-S3-01 | Tambahkan state before/after demo | Angka berubah setelah aksi Gabriel. |
| RIO-S3-02 | Buat trigger demo sederhana | Button tersembunyi/toggle/mock API. |
| RIO-S3-03 | Polish spacing dan visual hierarchy | Dashboard terlihat premium. |
| RIO-S3-04 | Tambah empty/error fallback sederhana | Tidak hancur saat data kosong. |
| RIO-S3-05 | Screenshot dashboard untuk pitch | Asset presentasi. |
| RIO-S3-06 | Update audit final | Perubahan final tercatat. |

Acceptance:

- state Gabriel dapat terlihat di dashboard;
- angka before/after konsisten;
- dashboard siap direkam;
- tidak ada warning/error besar saat run.

---

## 14. Definition of Done Admin Dashboard

Dashboard dianggap selesai untuk MVP jika:

1. route admin bisa dibuka stabil;
2. overview KPI tampil;
3. campaign progress tampil;
4. team leaderboard tampil;
5. recent activity tampil;
6. mission performance tampil;
7. QR verification log tampil;
8. data konsisten dengan demo mobile;
9. ada minimal satu before/after state untuk demo;
10. styling mengikuti brand Kopoin;
11. semua perubahan dicatat di audit file.

---

## 15. File Structure yang Disarankan

Sesuaikan dengan framework repo. Contoh struktur React/Next:

```text
src/
  app/
    admin/
      page.tsx
      campaigns/
        [campaignId]/
          page.tsx
  components/
    admin/
      AdminShell.tsx
      AdminSidebar.tsx
      KpiCard.tsx
      CampaignProgressCard.tsx
      TeamLeaderboardTable.tsx
      RecentActivityTable.tsx
      MissionPerformanceList.tsx
      VerificationLogTable.tsx
  data/
    kopoinAdminMockData.ts
  lib/
    demoState.ts
```

Contoh struktur Vite/React:

```text
src/
  pages/
    AdminDashboard.tsx
  components/
    admin/
      AdminShell.tsx
      KpiCard.tsx
      CampaignProgressCard.tsx
      TeamLeaderboardTable.tsx
      RecentActivityTable.tsx
      MissionPerformanceList.tsx
      VerificationLogTable.tsx
  data/
    kopoinAdminMockData.ts
  utils/
    demoState.ts
```

---

## 16. Component Specification

### 16.1 `KpiCard`

Props minimal:

```ts
type KpiCardProps = {
  label: string;
  value: string | number;
  helper?: string;
  trend?: string;
  icon?: React.ReactNode;
};
```

Rules:

- value harus paling dominan;
- helper menjelaskan konteks;
- trend jangan berlebihan;
- jangan pakai icon random yang tidak konsisten.

### 16.2 `CampaignProgressCard`

Props minimal:

```ts
type CampaignProgressCardProps = {
  campaignName: string;
  currentPoints: number;
  targetPoints: number;
  progressPercent: number;
  rewardName: string;
  dayCurrent: number;
  dayTotal: number;
};
```

Rules:

- progress bar harus jelas;
- tampilkan reward target;
- tampilkan hari campaign;
- progress percent tidak boleh lebih dari 100.

### 16.3 `RecentActivityTable`

Kolom minimal:

```text
Time | User | Team | Mission | Points | Verification | Status
```

Rules:

- activity terbaru di atas;
- Gabriel harus bisa muncul saat demo;
- status verified harus paling jelas;
- table boleh scroll horizontal.

---

## 17. Copywriting Dashboard

Gunakan bahasa Indonesia yang ringkas dan profesional.

Contoh label yang disarankan:

| Konsep | Label UI |
|---|---|
| Active Members | Anggota Aktif |
| Mission Completions | Misi Selesai |
| Total Kopoin Issued | Kopoin Dibagikan |
| Team Progress | Progres Reward Bersama |
| QR Verifications | Verifikasi QR |
| Voting Participation | Partisipasi Voting |
| Team Leaderboard | Peringkat Tim |
| Recent Activity | Aktivitas Terbaru |
| Mission Performance | Kinerja Misi |
| Verification Log | Log Verifikasi |

Jangan gunakan label terlalu teknis seperti:

- conversion funnel cohort;
- attribution model;
- user lifecycle analytics;
- data warehouse;
- fraud scoring.

MVP harus mudah dipahami juri dalam hitungan detik.

---

## 18. Audit Wajib untuk Rio

Setiap prompt/perubahan harus dicatat ke `WORK_LOG.md` atau file audit yang disepakati.

Format entry:

```md
## AUD-RIO-YYYYMMDD-XXX - <Judul Pekerjaan>

**Tanggal:** YYYY-MM-DD  
**Owner:** Rio  
**Prompt/Instruksi:** <ringkasan prompt>  
**Scope:** Admin Dashboard  
**Sprint Ref:** RIO-S1-01 / RIO-S2-03 / dst  
**Files Changed:**
- `path/to/file.tsx` - <apa yang berubah>
- `path/to/mockData.ts` - <apa yang berubah>

**What Changed:**
- <poin perubahan 1>
- <poin perubahan 2>

**Why:**
- <alasan perubahan untuk MVP/demo>

**Validation:**
- [ ] Run/build berhasil
- [ ] UI dicek manual
- [ ] Data konsisten dengan demo state
- [ ] Tidak keluar dari MVP

**Commit Suggestion:**
`feat(admin): add campaign KPI overview`
```

---

## 19. Commit Mapping yang Rapi

Gunakan commit per bagian kerja, bukan satu commit besar.

Contoh commit sequence:

```text
feat(admin): add dashboard shell and mock campaign data
feat(admin): add KPI overview cards
feat(admin): add campaign progress panel
feat(admin): add team leaderboard and activity table
feat(admin): add mission performance and verification log
feat(admin): add demo state toggle for Gabriel activity
style(admin): polish Kopoin admin dashboard visuals
```

Commit harus sesuai isi file yang berubah. Jangan memasukkan mobile UI, maskot, atau README ke commit admin kecuali memang relevan.

---

## 20. Demo Checklist Rio

Sebelum demo/perekaman, pastikan:

- [ ] dashboard bisa dibuka tanpa error;
- [ ] campaign title tampil benar;
- [ ] KPI cards tampil rapi;
- [ ] progress reward bersama tampil;
- [ ] Team Pemuda Sukamaju ranking 1;
- [ ] activity Gabriel dapat muncul sebagai aktivitas terbaru;
- [ ] QR verification count naik dari 95 ke 96;
- [ ] total Kopoin naik dari 18.300 ke 18.450;
- [ ] progress naik dari 73.2% ke 73.8%;
- [ ] visual dashboard cocok dengan brand Kopoin;
- [ ] screenshot dashboard sudah disiapkan;
- [ ] audit sudah diperbarui.

---

## 21. Catatan Keras

Admin dashboard adalah fitur pendukung yang sangat berguna, tetapi jangan sampai memakan waktu core mobile loop. Jika waktu sempit, cukup buat satu halaman admin overview yang kuat, rapi, dan datanya konsisten. Lebih baik satu dashboard ringkas yang tajam daripada empat halaman yang setengah matang.
