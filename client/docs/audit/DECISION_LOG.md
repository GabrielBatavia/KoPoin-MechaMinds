# Decision Log Kopoin

| Decision ID | Tanggal | Keputusan | Alasan | Dampak | Alternatif yang Ditolak | Owner |
|---|---|---|---|---|---|---|
| DEC-20260705-001 | 2026-07-05 | Menggunakan `localStorage` klien untuk state demo sinkronisasi | Menghindari kompleksitas backend server/database MySQL selama hackathon dan mempermudah presentasi interaktif before/after secara instan di browser. | State dapat berubah secara reaktif dan persisten di browser lokal tanpa dependensi jaringan. | Integrasi database server real-time (terlalu memakan waktu hackathon). | Riovaldo |
