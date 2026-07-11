import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Image,
  ScrollView,
  Animated
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Svg, { Path, Circle, Line } from "react-native-svg";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  IdCard,
  Briefcase,
  Users,
  Building,
  Tag,
  MapPin,
  Paperclip,
  Check,
  ChevronDown,
  Camera,
  Phone,
  Globe
} from "lucide-react-native";
import { colors, radii, shadows, spacing } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ROOT_URL } from "../config/api";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const CONFETTI_COLORS = ["#FFD700", "#FF4500", "#1E90FF", "#32CD32", "#FF69B4", "#8A2BE2", "#00FFFF"];

type ConfettiPieceProps = {
  delay: number;
};

function ConfettiPiece({ delay }: ConfettiPieceProps) {
  const fallAnim = useRef(new Animated.Value(-50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const swingAnim = useRef(new Animated.Value(0)).current;

  const randomLeft = useRef(Math.random() * (WINDOW_WIDTH - 20)).current;
  const randomSize = useRef(Math.random() * 8 + 6).current;
  const randomColor = useRef(CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]).current;
  const randomDuration = useRef(Math.random() * 2000 + 2500).current;
  const randomRotate = useRef((Math.random() * 360).toString() + "deg").current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(fallAnim, {
            toValue: WINDOW_HEIGHT,
            duration: randomDuration,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: randomDuration,
            useNativeDriver: true,
          }),
          Animated.timing(swingAnim, {
            toValue: 1,
            duration: randomDuration * 0.5,
            useNativeDriver: true,
          })
        ])
      ])
    ).start();
  }, []);

  const rotateValue = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [randomRotate, "720deg"]
  });

  const translateX = swingAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, Math.random() * 30 - 15, 0]
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: randomLeft,
        top: 0,
        width: randomSize,
        height: randomSize * (Math.random() > 0.5 ? 1.5 : 1),
        backgroundColor: randomColor,
        borderRadius: Math.random() > 0.7 ? 999 : 0,
        transform: [
          { translateY: fallAnim },
          { rotate: rotateValue },
          { translateX: translateX }
        ],
        opacity: 0.8,
        zIndex: 99
      }}
    />
  );
}

function ConfettiRain() {
  const pieces = useRef(
    Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 3000
    }))
  ).current;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} delay={piece.delay} />
      ))}
    </View>
  );
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type AuthScreenProps = {
  onSuccess: () => void;
};

const API_URL = API_ROOT_URL;

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [registerStep, setRegisterStep] = useState(1);
  const [isRegistered, setIsRegistered] = useState(false);

  // Floating animation for mascot
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRegistered) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -12,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      floatAnim.setValue(0);
    }
  }, [isRegistered]);

  // Dev Easter Egg Tap trigger
  const [logoTapCount, setLogoTapCount] = useState(0);

  const handleLogoPress = () => {
    const nextCount = logoTapCount + 1;
    if (nextCount >= 3) {
      setIsRegistered(true);
      setLogoTapCount(0);
    } else {
      setLogoTapCount(nextCount);
    }
  };

  // API loading & error states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register States based on DB columns
  const [anggotaRef, setAnggotaRef] = useState("");
  const [koperasiRef, setKoperasiRef] = useState("");
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [alamatKoperasi, setAlamatKoperasi] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [fileKtp, setFileKtp] = useState("");
  const [noHp, setNoHp] = useState("");
  const [provinsi, setProvinsi] = useState("");

  // Dropdown toggle states
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showKoperasiDropdown, setShowKoperasiDropdown] = useState(false);

  function handleTabChange(tab: "login" | "register") {
    setActiveTab(tab);
    setRegisterStep(1);
    setErrorMsg("");
  }

  async function handleLogin() {
    if (!email || !password) {
      setErrorMsg("Email dan kata sandi wajib diisi");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setErrorMsg(resData.error?.message || "Email atau kata sandi salah.");
        setLoading(false);
        return;
      }

      await AsyncStorage.setItem("kopoin-user-token", resData.data.access_token);
      await AsyncStorage.setItem("kopoin-user-refresh-token", resData.data.refresh_token);
      await AsyncStorage.setItem("kopoin-user-data", JSON.stringify(resData.data.user));

      setLoading(false);
      onSuccess();
    } catch (err: any) {
      setErrorMsg("Gagal terhubung ke server. Pastikan server backend Anda aktif.");
      setLoading(false);
    }
  }

  async function handleRegister() {
    if (!email || !password || !nama || !nik || !noHp || !provinsi) {
      setErrorMsg("Mohon lengkapi semua field wajib");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      // 1. Register User
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: nama,
          nik,
          phone: noHp,
          province: provinsi,
          pekerjaan,
          jenis_kelamin: jenisKelamin,
          koperasi_ref: koperasiRef,
          anggota_ref: anggotaRef,
          alamat_koperasi: alamatKoperasi,
          file_ktp: fileKtp
        })
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setErrorMsg(resData.error?.message || "Registrasi gagal. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      // 2. Automatically Log in User
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const loginData = await loginResponse.json();

      if (loginResponse.ok && loginData.success) {
        await AsyncStorage.setItem("kopoin-user-token", loginData.data.access_token);
        await AsyncStorage.setItem("kopoin-user-refresh-token", loginData.data.refresh_token);
        await AsyncStorage.setItem("kopoin-user-data", JSON.stringify(loginData.data.user));
      }

      setLoading(false);
      setIsRegistered(true);
    } catch (err: any) {
      setErrorMsg("Gagal terhubung ke server. Pastikan server backend Anda aktif.");
      setLoading(false);
    }
  }

  if (isRegistered) {
    return (
      <SafeAreaView style={styles.successScreen}>
        <StatusBar style="dark" />
        {/* Falling Confetti Rain animation */}
        <ConfettiRain />

        <View style={styles.successContent}>
          <Animated.Image
            source={require("../assets/images/maskot-1.png")}
            style={[
              styles.successImage,
              { transform: [{ translateY: floatAnim }] }
            ]}
            resizeMode="contain"
          />

          <Text style={styles.successTitle}>Pendaftaran Berhasil!</Text>
          <Text style={styles.successSubtitle}>Selamat menikmati layanan Kopoin. Mari bersama majukan Koperasi Desa!</Text>
        </View>

        <TouchableOpacity
          style={styles.successBtn}
          onPress={onSuccess}
          activeOpacity={0.8}
        >
          <Text style={styles.successBtnText}>SELESAI</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/images/auth.png")}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.darkOverlay} />
        <StatusBar style="light" />

        {/* Top Header Section */}
        <View style={styles.headerSection}>
          <TouchableOpacity activeOpacity={1} onPress={handleLogoPress}>
            <Image source={require("../assets/images/white-logo.png")} style={styles.authLogo} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mulai Langkah Baru{"\n"}di Kopoin</Text>
          <Text style={styles.headerSubtitle}>
            {activeTab === "login" ? "Masuk ke akunmu" : "Daftar sekarang"} untuk menikmati kemudahan bertransaksi di Koperasi Desa Merah Putih
          </Text>
        </View>

        {/* Bottom Card Section */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.cardContainer}
        >
          <View style={styles.card}>
            {/* Pill Tab Selector */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === "login" && styles.activeTabButton]}
                onPress={() => handleTabChange("login")}
                activeOpacity={0.9}
              >
                <Text style={[styles.tabButtonText, activeTab === "login" && styles.activeTabButtonText]}>
                  Masuk
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === "register" && styles.activeTabButton]}
                onPress={() => handleTabChange("register")}
                activeOpacity={0.9}
              >
                <Text style={[styles.tabButtonText, activeTab === "register" && styles.activeTabButtonText]}>
                  Daftar
                </Text>
              </TouchableOpacity>
            </View>

            {/* Stepper Progress Bar (Only for Register) */}
            {activeTab === "register" && (
              <View style={styles.stepperWrapper}>
                <View style={styles.stepIndicator}>
                  {/* Step 1 */}
                  <View style={[styles.stepCircle, registerStep >= 1 && styles.stepCircleActive]}>
                    <Text style={[styles.stepCircleText, registerStep >= 1 && styles.stepCircleTextActive]}>1</Text>
                  </View>
                  <View style={[styles.stepLine, registerStep >= 2 && styles.stepLineActive]} />
                  {/* Step 2 */}
                  <View style={[styles.stepCircle, registerStep >= 2 && styles.stepCircleActive]}>
                    <Text style={[styles.stepCircleText, registerStep >= 2 && styles.stepCircleTextActive]}>2</Text>
                  </View>
                  <View style={[styles.stepLine, registerStep >= 3 && styles.stepLineActive]} />
                  {/* Step 3 */}
                  <View style={[styles.stepCircle, registerStep >= 3 && styles.stepCircleActive]}>
                    <Text style={[styles.stepCircleText, registerStep >= 3 && styles.stepCircleTextActive]}>3</Text>
                  </View>
                  <View style={[styles.stepLine, registerStep >= 4 && styles.stepLineActive]} />
                  {/* Step 4 */}
                  <View style={[styles.stepCircle, registerStep >= 4 && styles.stepCircleActive]}>
                    <Text style={[styles.stepCircleText, registerStep >= 4 && styles.stepCircleTextActive]}>4</Text>
                  </View>
                </View>
                <Text style={styles.stepTitleText}>
                  {registerStep === 1 && "Langkah 1: Identitas Diri & Akun"}
                  {registerStep === 2 && "Langkah 2: Profil & Gender"}
                  {registerStep === 3 && "Langkah 3: Referensi Koperasi"}
                  {registerStep === 4 && "Langkah 4: Alamat & Verifikasi KTP"}
                </Text>
              </View>
            )}

            {/* Scrollable Form Fields */}
            <ScrollView
              style={styles.scrollForm}
              contentContainerStyle={styles.scrollFormContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Input Form Fields */}
              {activeTab === "login" ? (
                <View style={styles.formContainer}>
                  {/* Email Address Input */}
                  <View style={styles.inputOuterContainer}>
                    <View style={styles.iconContainer}>
                      <Mail size={22} color="#0F6B63" />
                    </View>
                    <View style={styles.inputInnerContainer}>
                      <Text style={styles.inputLabel}>Alamat Email</Text>
                      <TextInput
                        style={styles.inputField}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Masukkan alamat email Anda"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputOuterContainer}>
                    <View style={styles.iconContainer}>
                      <Lock size={22} color="#0F6B63" />
                    </View>
                    <View style={styles.inputInnerContainer}>
                      <Text style={styles.inputLabel}>Kata Sandi</Text>
                      <TextInput
                        style={styles.inputField}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Masukkan kata sandi Anda"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.eyeIconContainer}
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.7}
                    >
                      {showPassword ? (
                        <Eye size={22} color="#9CA3AF" />
                      ) : (
                        <EyeOff size={22} color="#9CA3AF" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.formContainer}>
                  {registerStep === 1 && (
                    <>
                      <View style={{ flexDirection: "row", gap: spacing.md }}>
                        {/* Nama */}
                        <View style={[styles.inputOuterContainer, { flex: 1 }]}>
                          <View style={styles.iconContainer}>
                            <User size={22} color="#0F6B63" />
                          </View>
                          <View style={styles.inputInnerContainer}>
                            <Text style={styles.inputLabel}>Nama Lengkap</Text>
                            <TextInput
                              style={styles.inputField}
                              value={nama}
                              onChangeText={setNama}
                              placeholder="Nama lengkap Anda"
                              placeholderTextColor="#9CA3AF"
                              autoCorrect={false}
                            />
                          </View>
                        </View>

                        {/* NIK */}
                        <View style={[styles.inputOuterContainer, { flex: 1 }]}>
                          <View style={styles.iconContainer}>
                            <IdCard size={22} color="#0F6B63" />
                          </View>
                          <View style={styles.inputInnerContainer}>
                            <Text style={styles.inputLabel}>NIK</Text>
                            <TextInput
                              style={styles.inputField}
                              value={nik}
                              onChangeText={setNik}
                              placeholder="16 digit NIK Anda"
                              placeholderTextColor="#9CA3AF"
                              keyboardType="numeric"
                              maxLength={16}
                            />
                          </View>
                        </View>
                      </View>

                      <View style={{ flexDirection: "row", gap: spacing.md }}>
                        {/* Email Address */}
                        <View style={[styles.inputOuterContainer, { flex: 1 }]}>
                          <View style={styles.iconContainer}>
                            <Mail size={22} color="#0F6B63" />
                          </View>
                          <View style={styles.inputInnerContainer}>
                            <Text style={styles.inputLabel}>Alamat Email</Text>
                            <TextInput
                              style={styles.inputField}
                              value={email}
                              onChangeText={setEmail}
                              placeholder="Email aktif Anda"
                              placeholderTextColor="#9CA3AF"
                              keyboardType="email-address"
                              autoCapitalize="none"
                              autoCorrect={false}
                            />
                          </View>
                        </View>

                        {/* Password */}
                        <View style={[styles.inputOuterContainer, { flex: 1 }]}>
                          <View style={styles.iconContainer}>
                            <Lock size={22} color="#0F6B63" />
                          </View>
                          <View style={styles.inputInnerContainer}>
                            <Text style={styles.inputLabel}>Kata Sandi</Text>
                            <TextInput
                              style={styles.inputField}
                              value={password}
                              onChangeText={setPassword}
                              placeholder="Buat kata sandi baru"
                              placeholderTextColor="#9CA3AF"
                              secureTextEntry={!showPassword}
                              autoCapitalize="none"
                              autoCorrect={false}
                            />
                          </View>
                          <TouchableOpacity
                            style={styles.eyeIconContainer}
                            onPress={() => setShowPassword(!showPassword)}
                            activeOpacity={0.7}
                          >
                            {showPassword ? (
                              <Eye size={22} color="#9CA3AF" />
                            ) : (
                              <EyeOff size={22} color="#9CA3AF" />
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  )}

                  {registerStep === 2 && (
                    <>
                      <View style={{ flexDirection: "row", gap: spacing.md }}>
                        {/* Pekerjaan */}
                        <View style={[styles.inputOuterContainer, { flex: 1 }]}>
                          <View style={styles.iconContainer}>
                            <Briefcase size={22} color="#0F6B63" />
                          </View>
                          <View style={styles.inputInnerContainer}>
                            <Text style={styles.inputLabel}>Pekerjaan</Text>
                            <TextInput
                              style={styles.inputField}
                              value={pekerjaan}
                              onChangeText={setPekerjaan}
                              placeholder="Wiraswasta, Petani, Karyawan, dll."
                              placeholderTextColor="#9CA3AF"
                              autoCorrect={false}
                            />
                          </View>
                        </View>

                        {/* Nomor Telepon */}
                        <View style={[styles.inputOuterContainer, { flex: 1 }]}>
                          <View style={styles.iconContainer}>
                            <Phone size={22} color="#0F6B63" />
                          </View>
                          <View style={styles.inputInnerContainer}>
                            <Text style={styles.inputLabel}>Nomor Telepon</Text>
                            <TextInput
                              style={styles.inputField}
                              value={noHp}
                              onChangeText={setNoHp}
                              placeholder="Nomor HP Anda"
                              placeholderTextColor="#9CA3AF"
                              keyboardType="phone-pad"
                            />
                          </View>
                        </View>
                      </View>

                      {/* Jenis Kelamin Dropdown */}
                      <TouchableOpacity
                        style={styles.inputOuterContainer}
                        onPress={() => {
                          setShowGenderDropdown(!showGenderDropdown);
                          Keyboard.dismiss();
                        }}
                        activeOpacity={0.8}
                      >
                        <View style={styles.iconContainer}>
                          <Users size={22} color="#0F6B63" />
                        </View>
                        <View style={styles.inputInnerContainer}>
                          <Text style={styles.inputLabel}>Jenis Kelamin</Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingRight: 4 }}>
                            <Text style={[styles.inputFieldText, !jenisKelamin && { color: "#9CA3AF" }]}>
                              {jenisKelamin || "Pilih Jenis Kelamin"}
                            </Text>
                            <ChevronDown size={18} color="#0F6B63" />
                          </View>
                        </View>
                      </TouchableOpacity>

                      {showGenderDropdown && (
                        <View style={styles.dropdownOptionsContainer}>
                          {["Laki-Laki", "Perempuan"].map((option) => (
                            <TouchableOpacity
                              key={option}
                              style={[
                                styles.dropdownOption,
                                jenisKelamin === option && styles.dropdownOptionActive
                              ]}
                              onPress={() => {
                                setJenisKelamin(option);
                                setShowGenderDropdown(false);
                              }}
                            >
                              <Text style={[
                                styles.dropdownOptionText,
                                jenisKelamin === option && styles.dropdownOptionTextActive
                              ]}>
                                {option}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </>
                  )}

                  {registerStep === 3 && (
                    <>
                      {/* Koperasi Ref Dropdown */}
                      <TouchableOpacity
                        style={styles.inputOuterContainer}
                        onPress={() => {
                          setShowKoperasiDropdown(!showKoperasiDropdown);
                          Keyboard.dismiss();
                        }}
                        activeOpacity={0.8}
                      >
                        <View style={styles.iconContainer}>
                          <Building size={22} color="#0F6B63" />
                        </View>
                        <View style={styles.inputInnerContainer}>
                          <Text style={styles.inputLabel}>Koperasi Referensi</Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingRight: 4 }}>
                            <Text style={[styles.inputFieldText, !koperasiRef && { color: "#9CA3AF" }]}>
                              {koperasiRef || "Pilih Koperasi Acuan"}
                            </Text>
                            <ChevronDown size={18} color="#0F6B63" />
                          </View>
                        </View>
                      </TouchableOpacity>

                      {showKoperasiDropdown && (
                        <View style={styles.dropdownOptionsContainer}>
                          {[
                            "Koperasi Merah Putih Sukamaju",
                            "Koperasi Simpan Pinjam Desa",
                            "Koperasi Tani Makmur",
                            "Koperasi Unit Desa Sejahtera"
                          ].map((option) => (
                            <TouchableOpacity
                              key={option}
                              style={[
                                styles.dropdownOption,
                                koperasiRef === option && styles.dropdownOptionActive
                              ]}
                              onPress={() => {
                                setKoperasiRef(option);
                                setShowKoperasiDropdown(false);
                              }}
                            >
                              <Text style={[
                                styles.dropdownOptionText,
                                koperasiRef === option && styles.dropdownOptionTextActive
                              ]}>
                                {option}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}

                      {/* Anggota Ref */}
                      <View style={styles.inputOuterContainer}>
                        <View style={styles.iconContainer}>
                          <Tag size={22} color="#0F6B63" />
                        </View>
                        <View style={styles.inputInnerContainer}>
                          <Text style={styles.inputLabel}>Nomor Referensi Anggota</Text>
                          <TextInput
                            style={styles.inputField}
                            value={anggotaRef}
                            onChangeText={setAnggotaRef}
                            placeholder="Contoh: AG-REF-8919 (Opsional)"
                            placeholderTextColor="#9CA3AF"
                            autoCorrect={false}
                          />
                        </View>
                      </View>
                    </>
                  )}

                  {registerStep === 4 && (
                    <>
                      <View style={{ flexDirection: "row", gap: spacing.md }}>
                        {/* Alamat Koperasi */}
                        <View style={[styles.inputOuterContainer, { flex: 1 }]}>
                          <View style={styles.iconContainer}>
                            <MapPin size={22} color="#0F6B63" />
                          </View>
                          <View style={styles.inputInnerContainer}>
                            <Text style={styles.inputLabel}>Alamat Koperasi</Text>
                            <TextInput
                              style={styles.inputField}
                              value={alamatKoperasi}
                              onChangeText={setAlamatKoperasi}
                              placeholder="Nama jalan, RT/RW, desa, kecamatan"
                              placeholderTextColor="#9CA3AF"
                              autoCorrect={false}
                            />
                          </View>
                        </View>

                        {/* Provinsi */}
                        <View style={[styles.inputOuterContainer, { flex: 1 }]}>
                          <View style={styles.iconContainer}>
                            <Globe size={22} color="#0F6B63" />
                          </View>
                          <View style={styles.inputInnerContainer}>
                            <Text style={styles.inputLabel}>Provinsi</Text>
                            <TextInput
                              style={styles.inputField}
                              value={provinsi}
                              onChangeText={setProvinsi}
                              placeholder="Provinsi Anda"
                              placeholderTextColor="#9CA3AF"
                              autoCorrect={false}
                            />
                          </View>
                        </View>
                      </View>

                      {/* File KTP Upload Gambar */}
                      <View style={styles.uploadContainer}>
                        <Text style={styles.uploadLabel}>Foto KTP Anda</Text>
                        {fileKtp ? (
                          <View style={styles.uploadPreviewCard}>
                            <View style={styles.uploadPreviewLeft}>
                              <Image
                                source={require("../assets/images/auth.png")}
                                style={styles.uploadThumbnail}
                              />
                              <View style={styles.uploadFileInfo}>
                                <Text style={styles.uploadFileName} numberOfLines={1}>{fileKtp}</Text>
                                <Text style={styles.uploadFileSize}>1.2 MB • Unggah berhasil</Text>
                              </View>
                            </View>
                            <TouchableOpacity
                              style={styles.uploadDeleteBtn}
                              onPress={() => setFileKtp("")}
                              activeOpacity={0.7}
                            >
                              <Text style={styles.uploadDeleteText}>Hapus</Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={styles.uploadPlaceholderCard}
                            onPress={() => setFileKtp("ktp_gabriel_batavia.jpg")}
                            activeOpacity={0.8}
                          >
                            <Camera size={24} color="#0F6B63" style={{ marginBottom: 6 }} />
                            <Text style={styles.uploadCtaText}>Ambil Foto / Unggah KTP</Text>
                            <Text style={styles.uploadSubtext}>Format JPG, PNG (Maks. 5MB)</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </>
                  )}
                </View>
              )}
            </ScrollView>

            {/* Error Message */}
            {errorMsg ? (
              <Text style={{ color: "#EF4444", fontSize: 13, textAlign: "center", marginBottom: 12, fontWeight: "600" }}>
                {errorMsg}
              </Text>
            ) : null}

            {/* Submit / Navigation Buttons */}
            {activeTab === "login" ? (
              <>
                <TouchableOpacity
                  style={[styles.submitButton, loading && { opacity: 0.7 }]}
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitButtonText}>
                    {loading ? "Memproses..." : "Masuk"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.guestButton}
                  onPress={onSuccess}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  <Text style={styles.guestButtonText}>Masuk sebagai Tamu (Mode Demo)</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.registerButtonsRow}>
                {registerStep > 1 && (
                  <TouchableOpacity
                    style={[styles.backButton, loading && { opacity: 0.5 }]}
                    onPress={() => setRegisterStep(registerStep - 1)}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.backButtonText}>Kembali</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    registerStep === 1 && { width: "100%" },
                    loading && { opacity: 0.7 }
                  ]}
                  onPress={() => {
                    if (registerStep < 4) {
                      setRegisterStep(registerStep + 1);
                    } else {
                      handleRegister();
                    }
                  }}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.nextButtonText}>
                    {loading && registerStep === 4 ? "Mendaftar..." : registerStep === 4 ? "Daftar" : "Lanjut"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)"
  },
  headerSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: SCREEN_HEIGHT * 0.12,
    paddingBottom: spacing.lg,
    alignItems: "flex-start"
  },
  headerTitle: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: -0.5
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "500",
    marginTop: spacing.md
  },
  cardContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  card: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl * 1.5,
    ...shadows.card
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    padding: 6,
    marginBottom: spacing.xl
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 999
  },
  activeTabButton: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2
  },
  tabButtonText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "800"
  },
  activeTabButtonText: {
    color: "#1F2937",
    fontWeight: "900"
  },
  stepperWrapper: {
    alignItems: "center",
    marginBottom: spacing.lg
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "center"
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  stepCircleActive: {
    backgroundColor: "#0F6B63",
    borderColor: "#0F6B63"
  },
  stepCircleText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "800",
  },
  stepCircleTextActive: {
    color: colors.white,
    fontWeight: "900"
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 2
  },
  stepLineActive: {
    backgroundColor: "#0F6B63"
  },
  stepTitleText: {
    alignSelf: "flex-start",
    paddingLeft: "5%",
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "800",
    marginTop: spacing.sm
  },
  formContainer: {
    gap: spacing.md,
    marginBottom: spacing.md
  },
  inputOuterContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.white
  },
  iconContainer: {
    marginRight: spacing.sm,
    width: 24,
    alignItems: "center"
  },
  inputInnerContainer: {
    flex: 1,
    justifyContent: "center",
    height: 48
  },
  inputLabel: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "capitalize",
    marginBottom: 1
  },
  inputField: {
    color: "#1F2937",
    fontSize: 14,
    fontWeight: "800",
    padding: 0,
    margin: 0,
    lineHeight: 18
  },
  eyeIconContainer: {
    padding: spacing.xs,
    alignItems: "center",
    justifyContent: "center"
  },
  utilitiesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.xs,
    marginBottom: spacing.xl
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxActive: {
    backgroundColor: "#0F6B63",
    borderColor: "#0F6B63"
  },
  rememberMeText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "800"
  },
  forgotPasswordText: {
    color: "#0F6B63",
    fontSize: 13,
    fontWeight: "800"
  },
  submitButton: {
    backgroundColor: "#0F6B63",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900"
  },
  registerButtonsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.sm,
    width: "100%"
  },
  backButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: colors.white,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  backButtonText: {
    color: "#4B5563",
    fontSize: 15,
    fontWeight: "800"
  },
  nextButton: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: "#0F6B63",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900"
  },
  successScreen: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40
  },
  successContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40
  },
  successImage: {
    width: 220,
    height: 220,
    marginBottom: 40
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center"
  },
  successSubtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.muted,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 260,
    lineHeight: 20
  },
  successBtn: {
    backgroundColor: "#0F6B63",
    borderRadius: 999,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 24,
    marginBottom: 24,
  },
  successBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5
  },
  guestButton: {
    marginTop: spacing.md,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  guestButtonText: {
    color: "#0F6B63",
    fontSize: 14,
    fontWeight: "800",
    textDecorationLine: "underline"
  },
  authLogo: {
    width: 45,
    height: 45,
    marginBottom: 4,
    alignSelf: "flex-start"
  },
  inputFieldText: {
    color: "#1F2937",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18
  },
  dropdownOptionsContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: -8,
    padding: spacing.xs,
    gap: 2
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md
  },
  dropdownOptionActive: {
    backgroundColor: "#EAFBF7"
  },
  dropdownOptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563"
  },
  dropdownOptionTextActive: {
    color: "#0F6B63",
    fontWeight: "800"
  },
  uploadContainer: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs
  },
  uploadLabel: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "capitalize",
    paddingLeft: 4
  },
  uploadPlaceholderCard: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#0F6B63",
    borderRadius: radii.lg,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAFBF7"
  },
  uploadCtaText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F6B63",
    marginBottom: 2
  },
  uploadSubtext: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600"
  },
  uploadPreviewCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white
  },
  uploadPreviewLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  uploadThumbnail: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    marginRight: spacing.sm
  },
  uploadFileInfo: {
    flex: 1,
    justifyContent: "center"
  },
  uploadFileName: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1F2937"
  },
  uploadFileSize: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    marginTop: 2
  },
  uploadDeleteBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.sm,
    backgroundColor: "#FDF0F0",
    borderWidth: 1,
    borderColor: "#FCA5A5"
  },
  uploadDeleteText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.danger
  },
  scrollForm: {
    maxHeight: SCREEN_HEIGHT * 0.46
  },
  scrollFormContent: {
    paddingBottom: spacing.sm
  }
});
