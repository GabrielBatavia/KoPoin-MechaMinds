import { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Image
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type JudgeWizardScreenProps = {
  onFinish: () => void;
  onSkip: () => void;
};

const onboardingSlides = [
  {
    title: "Simpan Pinjam Lebih Praktis",
    description: "Nikmati kemudahan mengakses seluruh layanan Koperasi Merah Putih (Kopdes) kapan saja dan di mana saja secara aman dan terpercaya.",
    buttonLabel: "Lanjut"
  },
  {
    title: "Dukung Produk Lokal Desa",
    description: "Selesaikan misi seru dengan berbelanja produk koperasi desa. Kumpulkan koin dan bantu naikkan peringkat tim pemudamu!",
    buttonLabel: "Lanjut"
  },
  {
    title: "Transparansi & Suaramu Didengar",
    description: "Pantau semua aktivitas transaksi lewat ledger terbuka dan salurkan aspirasimu dalam voting program reward koperasi.",
    buttonLabel: "Mulai Sekarang"
  }
] as const;

export function JudgeWizardScreen({ onFinish, onSkip }: JudgeWizardScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const slide = onboardingSlides[stepIndex] ?? onboardingSlides[0];
  const isLastStep = stepIndex === onboardingSlides.length - 1;

  // Animation values for smooth text transitions
  const fadeAnim = useState(() => new Animated.Value(1))[0];
  const translateYAnim = useState(() => new Animated.Value(0))[0];

  useEffect(() => {
    // Reset animation values for slide transition
    fadeAnim.setValue(0);
    translateYAnim.setValue(10);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      })
    ]).start();
  }, [stepIndex]);

  function handlePrimaryAction() {
    if (isLastStep) {
      onFinish();
      return;
    }
    setStepIndex((current) => current + 1);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Immersive linear gradient background */}
      <LinearGradient
        colors={["#D7F3EF", "#0F6B63", "#073F3A", "#021B18"]}
        locations={[0.0, 0.4, 0.75, 1.0]}
        start={{ x: 0.9, y: 0.05 }}
        end={{ x: 0.1, y: 0.95 }}
        style={styles.backgroundContainer}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          
          {/* Animated Text Content */}
          <Animated.View 
            style={[
              styles.textWrapper, 
              { 
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }]
              }
            ]}
          >
            {/* Brand Logo & Name */}
            <View style={styles.brandRow}>
              <Image source={require("../assets/images/white-logo.png")} style={styles.wizardLogo} resizeMode="contain" />
            </View>

            {/* Slide Title */}
            <Text style={styles.slideTitle}>{slide.title}</Text>

            {/* Slide Description */}
            <Text style={styles.slideDescription}>{slide.description}</Text>
          </Animated.View>

          {/* Indicators */}
          <View style={styles.indicatorRow}>
            {onboardingSlides.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.indicatorDot,
                  idx === stepIndex ? styles.indicatorDotActive : null
                ]}
              />
            ))}
          </View>

          {/* Actions */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={handlePrimaryAction}
              activeOpacity={0.8}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>{slide.buttonLabel}</Text>
            </TouchableOpacity>

            {stepIndex < onboardingSlides.length - 1 ? (
              <TouchableOpacity
                onPress={onSkip}
                activeOpacity={0.7}
                style={styles.skipButton}
              >
                <Text style={styles.skipButtonText}>Lewati</Text>
              </TouchableOpacity>
            ) : (
              // Empty space placeholder to maintain layout consistency on last slide
              <View style={styles.skipPlaceholder} />
            )}
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 28,
    paddingBottom: 20,
  },
  textWrapper: {
    width: "100%",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  logoMarkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  logoBar1: {
    width: 5,
    height: 18,
    borderRadius: 2.5,
    backgroundColor: "#0F6B63",
    marginRight: 3,
  },
  logoBar2: {
    width: 5,
    height: 12,
    borderRadius: 2.5,
    backgroundColor: "#10B981",
    marginTop: 6,
  },
  brandText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  badgeContainer: {
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 1.5,
    borderRadius: 6,
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  badgeText: {
    color: "#10B981",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  slideTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 42,
    fontWeight: "800",
    marginTop: 12,
    letterSpacing: -0.5,
  },
  slideDescription: {
    color: "rgba(255, 255, 255, 0.90)",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    marginTop: 12,
  },
  indicatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 32,
    gap: 6,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  indicatorDotActive: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0F6B63",
  },
  actionContainer: {
    width: "100%",
  },
  primaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 14,
    backgroundColor: "#0F6B63",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F6B63",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  skipButton: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  skipButtonText: {
    color: "rgba(255, 255, 255, 0.55)",
    fontSize: 15,
    fontWeight: "600",
  },
  skipPlaceholder: {
    height: 48,
    marginTop: 6,
  },
  wizardLogo: {
    width: 45,
    height: 45,
    marginBottom: 4,
    alignSelf: "flex-start"
  }
});
