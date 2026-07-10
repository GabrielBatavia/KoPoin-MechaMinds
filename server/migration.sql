-- Kopoin mobile dynamic-state migration.
-- Run this in the shared PostgreSQL/Supabase SQL editor.

ALTER TABLE public.auth
  ADD COLUMN IF NOT EXISTS points_balance INTEGER NOT NULL DEFAULT 1730,
  ADD COLUMN IF NOT EXISTS level INTEGER NOT NULL DEFAULT 3,
  ADD COLUMN IF NOT EXISTS monthly_saving INTEGER NOT NULL DEFAULT 37500,
  ADD COLUMN IF NOT EXISTS has_joined_team BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS has_joined_community BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS selected_team_id TEXT NULL,
  ADD COLUMN IF NOT EXISTS achievement_unlocked BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS public.kopoin_communities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tag TEXT NOT NULL,
  about TEXT NOT NULL,
  location_name TEXT NOT NULL,
  location_address TEXT NOT NULL,
  formed_at TIMESTAMPTZ NOT NULL,
  members_count INTEGER NOT NULL DEFAULT 0,
  avatar_uris JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS public.kopoin_community_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.auth(id) ON DELETE CASCADE,
  community_id TEXT NOT NULL REFERENCES public.kopoin_communities(id) ON DELETE CASCADE,
  reason TEXT NULL,
  status TEXT NOT NULL DEFAULT 'approved',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, community_id)
);

CREATE TABLE IF NOT EXISTS public.kopoin_campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  cooperative_id TEXT NOT NULL,
  target_value INTEGER NOT NULL,
  current_value INTEGER NOT NULL,
  reward_title TEXT NOT NULL,
  deadline_label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS public.kopoin_missions (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL REFERENCES public.kopoin_campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  deadline_label TEXT NOT NULL,
  product_name TEXT NULL,
  priority TEXT NOT NULL DEFAULT 'P1',
  qr_code TEXT NULL,
  target INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.kopoin_user_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.auth(id) ON DELETE CASCADE,
  mission_id TEXT NOT NULL REFERENCES public.kopoin_missions(id) ON DELETE CASCADE,
  current_value INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ NULL,
  used_code TEXT NULL,
  UNIQUE (user_id, mission_id)
);

CREATE TABLE IF NOT EXISTS public.kopoin_transactions (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.auth(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  transaction_type TEXT NOT NULL,
  cash_amount INTEGER NOT NULL DEFAULT 0,
  points_amount INTEGER NOT NULL DEFAULT 0,
  icon_name TEXT NOT NULL DEFAULT 'points',
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kopoin_coupons (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  original_price TEXT NOT NULL,
  promo_price TEXT NOT NULL,
  points INTEGER NOT NULL,
  merchant TEXT NOT NULL,
  emoji TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.kopoin_coupon_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.auth(id) ON DELETE CASCADE,
  coupon_id TEXT NOT NULL REFERENCES public.kopoin_coupons(id) ON DELETE CASCADE,
  points_spent INTEGER NOT NULL,
  redeemed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, coupon_id)
);

CREATE TABLE IF NOT EXISTS public.kopoin_vote_options (
  id TEXT PRIMARY KEY,
  poll_id TEXT NOT NULL,
  label TEXT NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.kopoin_user_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.auth(id) ON DELETE CASCADE,
  poll_id TEXT NOT NULL,
  option_id TEXT NOT NULL REFERENCES public.kopoin_vote_options(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, poll_id)
);

INSERT INTO public.auth (
  id, email, password, name, nik, phone, province, pekerjaan, jenis_kelamin,
  koperasi_ref, anggota_ref, alamat_koperasi, points_balance, level, monthly_saving,
  has_joined_team, has_joined_community, selected_team_id, achievement_unlocked
) VALUES (
  '00000000-0000-4000-8000-000000000001',
  'gabriel.demo@push',
  '$2a$10$abcdefghijklmnopqrstuuG8tbQz2wJCHhZ4i7mPqAAx3XObCdEfG',
  'Gabriel',
  '3173010101010001',
  '081234567890',
  'DKI Jakarta',
  'Mahasiswa',
  'Laki-laki',
  'Koperasi Merah Putih Sukamaju',
  'KMP-SKM-0001',
  'Dusun Krajan Tengah, Desa Sukamaju',
  1730,
  3,
  37500,
  false,
  false,
  null,
  false
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  points_balance = EXCLUDED.points_balance,
  level = EXCLUDED.level,
  monthly_saving = EXCLUDED.monthly_saving;

INSERT INTO public.kopoin_campaigns (id, title, cooperative_id, target_value, current_value, reward_title, deadline_label, status)
VALUES
  ('camp_7hari_produk_lokal', '7 Hari Dukung Produk Koperasi Sukamaju', 'coop_sukamaju', 100, 73, 'Kupon Bersama Produk Lokal', 'Berakhir 17 Juli 2026', 'active')
ON CONFLICT (id) DO UPDATE SET
  current_value = EXCLUDED.current_value,
  target_value = EXCLUDED.target_value,
  deadline_label = EXCLUDED.deadline_label;

INSERT INTO public.kopoin_missions (id, campaign_id, title, description, points, action_type, deadline_label, product_name, priority, qr_code, target)
VALUES
  ('mis_beli_kopi_sukamaju', 'camp_7hari_produk_lokal', 'Beli Produk Lokal', 'Beli Kopi Sukamaju dan input kode QR transaksi demo.', 120, 'qr_scan', 'Minggu ini', 'Kopi Sukamaju', 'P0', 'KOPI-SUKAMAJU-001', 1),
  ('mis_belajar_koperasi', 'camp_7hari_produk_lokal', 'Belajar Koperasi 5 Menit', 'Selesaikan materi ringan tentang manfaat koperasi desa.', 60, 'learning', 'Minggu ini', null, 'P1', 'BELAJAR-KOPERASI-001', 1),
  ('mis_vote_reward', 'camp_7hari_produk_lokal', 'Pilih Reward Berikutnya', 'Ikut voting campaign atau reward komunitas berikutnya.', 30, 'vote', 'Hari ini', null, 'P1', null, 1),
  ('comm_mission_1', 'camp_7hari_produk_lokal', 'Penghijauan Dusun Sukamaju', 'Tanam minimal 5 bibit pohon rindang bersama anggota komunitas.', 150, 'qr_scan', 'Minggu ini', 'Bibit Pohon Sukamaju', 'P1', 'HIJAU-SUKAMAJU-001', 5),
  ('comm_mission_2', 'camp_7hari_produk_lokal', 'Kerja Bakti Booth Koperasi', 'Gotong royong membersihkan dan mendekorasi booth koperasi desa.', 100, 'qr_scan', 'Minggu ini', 'Booth Koperasi', 'P1', 'BOOTH-KOPERASI-001', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  points = EXCLUDED.points,
  qr_code = EXCLUDED.qr_code,
  target = EXCLUDED.target;

INSERT INTO public.kopoin_communities (id, name, tag, about, location_name, location_address, formed_at, members_count, avatar_uris)
VALUES
  ('pemuda_sukamaju_hijau', 'Pemuda Sukamaju Hijau', 'Gotong Royong', 'Komunitas pemuda-pemudi desa untuk gotong royong, pelestarian lingkungan, dan digitalisasi Koperasi Desa Merah Putih.', 'Koperasi Merah Putih', 'Dusun Krajan Tengah, Desa Sukamaju', '2020-01-09T00:00:00+07:00', 37, '["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"]'::jsonb),
  ('tani_makmur_organik', 'Tani Makmur Organik', 'Pertanian', 'Himpunan petani muda dan pemerhati pangan Desa Sukamaju yang berfokus pada pupuk organik dan hidroponik koperasi.', 'Gudang Tani Sukamaju', 'Jl. Pertanian No. 88, Sukamaju', '2021-03-15T00:00:00+07:00', 24, '["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60"]'::jsonb),
  ('srikandi_umkm_kreatif', 'Srikandi UMKM Kreatif', 'Koperasi & UMKM', 'Komunitas pengrajin wanita Desa Sukamaju yang memasarkan tas anyaman, batik khas, dan camilan lokal via Kopoin.', 'Pusat Kreatif Srikandi', 'RT 04 / RW 02, Desa Sukamaju', '2022-11-12T00:00:00+07:00', 41, '["https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  members_count = EXCLUDED.members_count,
  about = EXCLUDED.about,
  avatar_uris = EXCLUDED.avatar_uris;

INSERT INTO public.kopoin_transactions (id, user_id, title, subtitle, transaction_type, cash_amount, points_amount, icon_name, occurred_at)
VALUES
  ('tx_demo_1', '00000000-0000-4000-8000-000000000001', 'fresh tomato hybrid', 'Belanja Kopoin Mart - 1 kg', 'grocery', -32000, 32, 'grocery', '2026-07-10T17:42:00+07:00'),
  ('tx_demo_2', '00000000-0000-4000-8000-000000000001', 'roti tawar gandum kampung', 'Belanja Kopoin Mart - 1 pack', 'grocery', -15000, 15, 'grocery', '2026-07-09T11:20:00+07:00'),
  ('tx_demo_3', '00000000-0000-4000-8000-000000000001', 'Voucher Kopi Sukamaju 10%', 'Penukaran Loyalty Points', 'points_redemption', 0, -30, 'points', '2026-07-08T09:15:00+07:00'),
  ('tx_demo_4', '00000000-0000-4000-8000-000000000001', 'Koperasi Sukamaju Join Reward', 'Bonus anggota baru terverifikasi', 'points_earn', 0, 120, 'rewards', '2026-07-07T08:00:00+07:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.kopoin_coupons (id, title, original_price, promo_price, points, merchant, emoji, category, tags)
VALUES
  ('coupon_happy_a_idm', 'Tebus Murah Paket Happy A - Eat And Go IDM', 'Rp 40.700', 'Rp 25.000', 30, 'Eat And Go', '🍱', 'Penawaran Khusus', '["Toy Story 5","Makanan"]'::jsonb),
  ('coupon_happy_a', 'Tebus Murah Paket Happy A - Eat And Go', 'Rp 56.800', 'Rp 35.000', 35, 'Eat And Go', '🍛', 'Makanan & Minuman', '["Perawatan Diri","Makanan"]'::jsonb),
  ('coupon_happy_b', 'Tebus Murah Paket Happy B - Eat And Go', 'Rp 56.800', 'Rp 35.000', 35, 'Eat And Go', '🍚', 'Makanan & Minuman', '["MLBB M...","Makanan"]'::jsonb),
  ('coupon_happy_b_idm', 'Tebus Murah Paket Happy B - Eat And Go IDM', 'Rp 61.000', 'Rp 35.000', 40, 'Eat And Go', '🍲', 'Penawaran Khusus', '["Toy Story 5","Makanan"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  points = EXCLUDED.points,
  active = TRUE;

INSERT INTO public.kopoin_vote_options (id, poll_id, label, votes)
VALUES
  ('reward_kopi', 'poll_reward_berikutnya', 'Kupon Kopi Sukamaju', 48),
  ('reward_sembako', 'poll_reward_berikutnya', 'Paket Sembako Lokal', 32),
  ('reward_merch', 'poll_reward_berikutnya', 'Merch Tim Pemuda', 20)
ON CONFLICT (id) DO UPDATE SET votes = EXCLUDED.votes;
