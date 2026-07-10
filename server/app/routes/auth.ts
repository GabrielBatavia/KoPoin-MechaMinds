import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../utils/supabase";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// helper to sign tokens
const signToken = (payload: object, expires: any) => jwt.sign(payload, JWT_SECRET, { expiresIn: expires });

// REGISTER
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      email, 
      password, 
      name, 
      nik, 
      phone, 
      province,
      pekerjaan,
      jenis_kelamin,
      koperasi_ref,
      anggota_ref,
      alamat_koperasi,
      file_ktp
    } = req.body;
    if (!email || !password || !name || !nik || !phone || !province) {
      res.status(400).json({ success: false, error: { message: "Semua field wajib harus diisi" } });
      return;
    }

    // check if user exists
    const { data: existing } = await supabase.from("auth").select("email").eq("email", email).maybeSingle();
    if (existing) {
      res.status(400).json({ success: false, error: { message: "Email sudah terdaftar" } });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { error } = await supabase.from("auth").insert({
      email,
      password: hashedPassword,
      name,
      nik,
      phone,
      province,
      pekerjaan: pekerjaan || null,
      jenis_kelamin: jenis_kelamin || null,
      koperasi_ref: koperasi_ref || null,
      anggota_ref: anggota_ref || null,
      alamat_koperasi: alamat_koperasi || null,
      file_ktp: file_ktp || null
    });

    if (error) throw error;
    res.status(201).json({ success: true, message: "Registrasi berhasil! Silakan masuk." });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// LOGIN
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, error: { message: "Email dan password wajib diisi" } });
      return;
    }

    const { data: user, error } = await supabase.from("auth").select("*").eq("email", email).maybeSingle();
    if (error || !user) {
      res.status(401).json({ success: false, error: { message: "Email atau password salah" } });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, error: { message: "Email atau password salah" } });
      return;
    }

    const accessToken = signToken({ id: user.id, email: user.email }, "1h");
    const refreshToken = signToken({ id: user.id }, "7d");

    // Set cookie
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.json({
      success: true,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          nik: user.nik,
          phone: user.phone,
          province: user.province,
          pekerjaan: user.pekerjaan,
          jenis_kelamin: user.jenis_kelamin,
          koperasi_ref: user.koperasi_ref,
          anggota_ref: user.anggota_ref,
          alamat_koperasi: user.alamat_koperasi,
          file_ktp: user.file_ktp
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// REFRESH TOKEN
router.post("/refresh", async (req: Request, res: Response): Promise<void> => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      res.status(400).json({ success: false, error: { message: "Refresh token wajib disertakan" } });
      return;
    }

    const decoded = jwt.verify(refresh_token, JWT_SECRET) as { id: string };
    const { data: user } = await supabase
      .from("auth")
      .select("id, email, name, nik, phone, province, pekerjaan, jenis_kelamin, koperasi_ref, anggota_ref, alamat_koperasi, file_ktp")
      .eq("id", decoded.id)
      .maybeSingle();

    if (!user) {
      res.status(401).json({ success: false, error: { message: "User tidak ditemukan" } });
      return;
    }

    const newAccessToken = signToken({ id: user.id, email: user.email }, "1h");
    const newRefreshToken = signToken({ id: user.id }, "7d");

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.json({
      success: true,
      data: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        user,
      },
    });
  } catch (error: any) {
    res.status(401).json({ success: false, error: { message: "Refresh token tidak valid atau kedaluwarsa" } });
  }
});

// LOGOUT
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Berhasil keluar" });
});

export default router;
