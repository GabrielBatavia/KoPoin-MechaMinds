import React, { useState } from "react";
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
  Image
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
  Check
} from "lucide-react-native";
import { colors, radii, shadows, spacing } from "../theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type AuthScreenProps = {
  onSuccess: () => void;
};

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [registerStep, setRegisterStep] = useState(1);
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Login States
  const [email, setEmail] = useState("micahmad@potarastudio.com");
  const [password, setPassword] = useState("mic4hmad#");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register States based on DB columns
  const [anggotaRef, setAnggotaRef] = useState("AG-REF-8919");
  const [koperasiRef, setKoperasiRef] = useState("Koperasi Desa Sukamaju");
  const [nama, setNama] = useState("Gabriel Batavia");
  const [nik, setNik] = useState("3273012903020005");
  const [kodeWilayah, setKodeWilayah] = useState("32.73.01");
  const [jenisKelamin, setJenisKelamin] = useState("Laki-laki");
  const [pekerjaan, setPekerjaan] = useState("Wiraswasta / Pelaku UMKM");
  const [fileKtp, setFileKtp] = useState("ktp_gabriel_batavia.jpg");

  function handleTabChange(tab: "login" | "register") {
    setActiveTab(tab);
    setRegisterStep(1);
  }

  if (isRegistered) {
    return (
      <SafeAreaView style={styles.successScreen}>
        <StatusBar style="dark" />
        <View style={styles.successContent}>
          {/* Confetti Party Horn Svg */}
          <Svg width={180} height={180} viewBox="0 0 200 200" style={styles.successSvg}>
            {/* Confetti curls */}
            <Path d="M 115 105 C 130 95, 140 100, 138 78 C 136 60, 150 55, 156 68" stroke="#F4B400" strokeWidth={3} strokeLinecap="round" fill="none" />
            <Path d="M 125 115 C 145 120, 155 110, 148 95 C 142 80, 158 75, 163 85" stroke="#F4B400" strokeWidth={3} strokeLinecap="round" fill="none" />
            
            {/* Sparkles / Stars */}
            {/* Yellow star left */}
            <Path d="M 68 85 l 2 3 l 3 2 l -3 2 l -2 3 l -2 -3 l -3 -2 l 3 -2 z" fill="#F4B400" />
            <Circle cx="82" cy="88" r="2.5" fill="#F4B400" />
            {/* Red star right */}
            <Path d="M 175 145 l 2 3 l 3 2 l -3 2 l -2 3 l -2 -3 l -3 -2 l 3 -2 z" fill="#BA3B34" />
            <Circle cx="162" cy="155" r="2.5" fill="#BA3B34" />
            {/* Small yellow dot bottom */}
            <Circle cx="132" cy="172" r="2" fill="#F4B400" />
            
            {/* Red lines popping out */}
            <Line x1="108" y1="78" x2="120" y2="92" stroke="#BA3B34" strokeWidth={3.5} strokeLinecap="round" />
            <Line x1="122" y1="126" x2="142" y2="122" stroke="#BA3B34" strokeWidth={3.5} strokeLinecap="round" />
            <Circle cx="87" cy="112" r="2.5" fill="#BA3B34" />
            
            {/* Blue Party Horn Cone */}
            <Path
              d="M 68 160 C 80 145, 100 120, 122 108 C 122 108, 134 122, 110 148 C 92 168, 75 170, 68 160 Z"
              fill="#0C66E4" 
            />
            {/* Cone opening mouth ellipse */}
            <Path
              d="M 122 108 C 128 102, 120 94, 110 102 C 100 110, 106 120, 110 122 C 116 122, 122 108, 122 108 Z"
              fill="#0049B0"
            />
            {/* Stripe details */}
            <Path d="M 85 148 C 92 138, 102 128, 114 120" stroke="rgba(255,255,255,0.18)" strokeWidth={2.5} strokeLinecap="round" fill="none" />
            <Path d="M 95 138 C 102 128, 108 120, 118 114" stroke="rgba(255,255,255,0.18)" strokeWidth={2.5} strokeLinecap="round" fill="none" />
          </Svg>

          <Text style={styles.successTitle}>Registrasi Selesai</Text>
          <Text style={styles.successSubtitle}>Selamat menikmati layanan Kopoin</Text>
        </View>

        <TouchableOpacity style={styles.successBtn} onPress={onSuccess} activeOpacity={0.8}>
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
          <Image source={require("../assets/images/logo.png")} style={styles.authLogo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Go ahead and set up{"\n"}your account</Text>
          <Text style={styles.headerSubtitle}>
            Sign {activeTab === "login" ? "in" : "up"} to enjoy the best managing experience at Koperasi Desa Merah Putih
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
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === "register" && styles.activeTabButton]}
                onPress={() => handleTabChange("register")}
                activeOpacity={0.9}
              >
                <Text style={[styles.tabButtonText, activeTab === "register" && styles.activeTabButtonText]}>
                  Register
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
                  {registerStep === 1 && "Step 1: Identitas Diri"}
                  {registerStep === 2 && "Step 2: Pekerjaan & Gender"}
                  {registerStep === 3 && "Step 3: Informasi Koperasi"}
                  {registerStep === 4 && "Step 4: Lokasi & Dokumen"}
                </Text>
              </View>
            )}

            {/* Input Form Fields */}
            {activeTab === "login" ? (
              <View style={styles.formContainer}>
                {/* Email Address Input */}
                <View style={styles.inputOuterContainer}>
                  <View style={styles.iconContainer}>
                    <Mail size={22} color="#5E7A6B" />
                  </View>
                  <View style={styles.inputInnerContainer}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput
                      style={styles.inputField}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Enter your email"
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
                    <Lock size={22} color="#5E7A6B" />
                  </View>
                  <View style={styles.inputInnerContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                      style={styles.inputField}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
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
                    {/* Nama */}
                    <View style={styles.inputOuterContainer}>
                      <View style={styles.iconContainer}>
                        <User size={22} color="#5E7A6B" />
                      </View>
                      <View style={styles.inputInnerContainer}>
                        <Text style={styles.inputLabel}>Nama Lengkap</Text>
                        <TextInput
                          style={styles.inputField}
                          value={nama}
                          onChangeText={setNama}
                          placeholder="Nama Lengkap Anda"
                          placeholderTextColor="#9CA3AF"
                          autoCorrect={false}
                        />
                      </View>
                    </View>

                    {/* NIK */}
                    <View style={styles.inputOuterContainer}>
                      <View style={styles.iconContainer}>
                        <IdCard size={22} color="#5E7A6B" />
                      </View>
                      <View style={styles.inputInnerContainer}>
                        <Text style={styles.inputLabel}>NIK</Text>
                        <TextInput
                          style={styles.inputField}
                          value={nik}
                          onChangeText={setNik}
                          placeholder="16 Digit NIK"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="numeric"
                          maxLength={16}
                        />
                      </View>
                    </View>
                  </>
                )}

                {registerStep === 2 && (
                  <>
                    {/* Pekerjaan */}
                    <View style={styles.inputOuterContainer}>
                      <View style={styles.iconContainer}>
                        <Briefcase size={22} color="#5E7A6B" />
                      </View>
                      <View style={styles.inputInnerContainer}>
                        <Text style={styles.inputLabel}>Pekerjaan</Text>
                        <TextInput
                          style={styles.inputField}
                          value={pekerjaan}
                          onChangeText={setPekerjaan}
                          placeholder="Pekerjaan Anda"
                          placeholderTextColor="#9CA3AF"
                          autoCorrect={false}
                        />
                      </View>
                    </View>

                    {/* Jenis Kelamin */}
                    <View style={styles.inputOuterContainer}>
                      <View style={styles.iconContainer}>
                        <Users size={22} color="#5E7A6B" />
                      </View>
                      <View style={styles.inputInnerContainer}>
                        <Text style={styles.inputLabel}>Jenis Kelamin</Text>
                        <TextInput
                          style={styles.inputField}
                          value={jenisKelamin}
                          onChangeText={setJenisKelamin}
                          placeholder="Laki-laki / Perempuan"
                          placeholderTextColor="#9CA3AF"
                          autoCorrect={false}
                        />
                      </View>
                    </View>
                  </>
                )}

                {registerStep === 3 && (
                  <>
                    {/* Koperasi Ref */}
                    <View style={styles.inputOuterContainer}>
                      <View style={styles.iconContainer}>
                        <Building size={22} color="#5E7A6B" />
                      </View>
                      <View style={styles.inputInnerContainer}>
                        <Text style={styles.inputLabel}>Koperasi Ref</Text>
                        <TextInput
                          style={styles.inputField}
                          value={koperasiRef}
                          onChangeText={setKoperasiRef}
                          placeholder="Koperasi Acuan"
                          placeholderTextColor="#9CA3AF"
                          autoCorrect={false}
                        />
                      </View>
                    </View>

                    {/* Anggota Ref */}
                    <View style={styles.inputOuterContainer}>
                      <View style={styles.iconContainer}>
                        <Tag size={22} color="#5E7A6B" />
                      </View>
                      <View style={styles.inputInnerContainer}>
                        <Text style={styles.inputLabel}>Anggota Ref</Text>
                        <TextInput
                          style={styles.inputField}
                          value={anggotaRef}
                          onChangeText={setAnggotaRef}
                          placeholder="Referensi Anggota"
                          placeholderTextColor="#9CA3AF"
                          autoCorrect={false}
                        />
                      </View>
                    </View>
                  </>
                )}

                {registerStep === 4 && (
                  <>
                    {/* Kode Wilayah */}
                    <View style={styles.inputOuterContainer}>
                      <View style={styles.iconContainer}>
                        <MapPin size={22} color="#5E7A6B" />
                      </View>
                      <View style={styles.inputInnerContainer}>
                        <Text style={styles.inputLabel}>Kode Wilayah</Text>
                        <TextInput
                          style={styles.inputField}
                          value={kodeWilayah}
                          onChangeText={setKodeWilayah}
                          placeholder="Kode Wilayah"
                          placeholderTextColor="#9CA3AF"
                          autoCorrect={false}
                        />
                      </View>
                    </View>

                    {/* File KTP */}
                    <View style={styles.inputOuterContainer}>
                      <View style={styles.iconContainer}>
                        <Paperclip size={22} color="#5E7A6B" />
                      </View>
                      <View style={styles.inputInnerContainer}>
                        <Text style={styles.inputLabel}>File KTP</Text>
                        <TextInput
                          style={styles.inputField}
                          value={fileKtp}
                          onChangeText={setFileKtp}
                          placeholder="Nama file KTP"
                          placeholderTextColor="#9CA3AF"
                          autoCorrect={false}
                        />
                      </View>
                    </View>
                  </>
                )}
              </View>
            )}

            {/* Remember Me & Forgot Password Row (Only for Login) */}
            {activeTab === "login" && (
              <View style={styles.utilitiesRow}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                    {rememberMe && (
                      <Check size={12} color="#FFFFFF" strokeWidth={3} />
                    )}
                  </View>
                  <Text style={styles.rememberMeText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Submit / Navigation Buttons */}
            {activeTab === "login" ? (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={onSuccess}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Login</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.registerButtonsRow}>
                {registerStep > 1 && (
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setRegisterStep(registerStep - 1)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.backButtonText}>Kembali</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    registerStep === 1 && { width: "100%" }
                  ]}
                  onPress={() => {
                    if (registerStep < 4) {
                      setRegisterStep(registerStep + 1);
                    } else {
                      setIsRegistered(true);
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.nextButtonText}>
                    {registerStep === 4 ? "Daftar" : "Lanjut"}
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
    color: "rgba(255, 255, 255, 0.5)",
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
    backgroundColor: "#6E8E7C",
    borderColor: "#6E8E7C"
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
    backgroundColor: "#6E8E7C"
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
    backgroundColor: "#6E8E7C",
    borderColor: "#6E8E7C"
  },
  rememberMeText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "800"
  },
  forgotPasswordText: {
    color: "#6E8E7C",
    fontSize: 13,
    fontWeight: "800"
  },
  submitButton: {
    backgroundColor: "#6E8E7C",
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
    backgroundColor: "#6E8E7C",
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
    paddingHorizontal: spacing.lg,
    paddingTop: 80,
    paddingBottom: 40
  },
  successContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40
  },
  successSvg: {
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
    backgroundColor: "#0C66E4",
    borderRadius: radii.sm,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  successBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5
  },
  authLogo: {
    width: 140,
    height: 45,
    marginBottom: 24,
    alignSelf: "flex-start"
  }
});
