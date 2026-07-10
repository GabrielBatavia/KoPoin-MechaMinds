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
  ImageBackground
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { colors, radii, shadows, spacing } from "../theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type AuthScreenProps = {
  onSuccess: () => void;
};

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [registerStep, setRegisterStep] = useState(1);
  
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

  function handleAuthSubmit() {
    // For demo/MVP, clicking the primary button simply logs the user in successfully
    onSuccess();
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
                    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="#5E7A6B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="m22 6-10 7L2 6"
                        stroke="#5E7A6B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
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
                    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <Rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                        stroke="#5E7A6B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="M7 11V7a5 5 0 0 1 10 0v4"
                        stroke="#5E7A6B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
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
                      <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          stroke="#9CA3AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <Circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="#9CA3AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    ) : (
                      <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                          stroke="#9CA3AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <Path
                          d="M1 1l22 22"
                          stroke="#9CA3AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
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
                        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#5E7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <Circle cx="12" cy="7" r="4" stroke="#5E7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
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
                        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <Rect x="3" y="4" width="18" height="16" rx="2" stroke="#5E7A6B" strokeWidth="2" />
                          <Path d="M7 8h4M7 12h4M15 8h2m-2 4h2M7 16h10" stroke="#5E7A6B" strokeWidth="2" strokeLinecap="round" />
                        </Svg>
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
                        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <Rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="#5E7A6B" strokeWidth="2" />
                          <Path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="#5E7A6B" strokeWidth="2" />
                        </Svg>
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
                        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <Circle cx="12" cy="10" r="6" stroke="#5E7A6B" strokeWidth="2"/>
                          <Path d="m12 16v6M9 19h6" stroke="#5E7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
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
                        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <Path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 21v-4a3 3 0 0 1 6 0v4M12 2v4M9 4h6" stroke="#5E7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
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
                        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="#5E7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <Path d="m7 7 .01-.01" stroke="#5E7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
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
                        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <Path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" stroke="#5E7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <Circle cx="12" cy="10" r="3" stroke="#5E7A6B" strokeWidth="2"/>
                        </Svg>
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
                        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <Path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="#5E7A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
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
                      <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M20 6L9 17l-5-5"
                          stroke="#FFFFFF"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
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
                onPress={handleAuthSubmit}
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
                      handleAuthSubmit();
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
    paddingBottom: spacing.lg
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
  }
});
