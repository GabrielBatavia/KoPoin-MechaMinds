import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle
} from "react-native";
import { ArrowLeft, ArrowRight, X } from "lucide-react-native";

import { useReduceMotion } from "../../hooks/use-reduce-motion";
import type { GuidedCardPlacement } from "../../services/guidedDemo";
import { getGuidedMotionConfig } from "../../services/guidedDemo";
import { colors, radii, shadows, spacing } from "../../theme";

export type SpotlightRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type GuidedTargetContextValue = {
  activeTargetKey: string | null;
  registerTarget: (key: string, rect: SpotlightRect) => void;
};

type GuidedTargetProviderProps = {
  activeTargetKey: string | null;
  onTargetLayout: (rect: SpotlightRect | null) => void;
  children: ReactNode;
};

type SpotlightTargetProps = {
  targetKey: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type GuidedTooltipProps = {
  checkpoint: number;
  total: number;
  title: string;
  description: string;
  actionHint?: string;
  placement: GuidedCardPlacement;
  targetRect: SpotlightRect | null;
  canGoBack: boolean;
  canAdvance: boolean;
  isLast: boolean;
  onBack: () => void;
  onClose: () => void;
  onNext: () => void;
};

const GuidedTargetContext = createContext<GuidedTargetContextValue>({
  activeTargetKey: null,
  registerTarget: () => undefined
});

export function GuidedTargetProvider({ activeTargetKey, onTargetLayout, children }: GuidedTargetProviderProps) {
  const registerTarget = useCallback(
    (key: string, rect: SpotlightRect) => {
      if (key === activeTargetKey) {
        onTargetLayout(rect);
      }
    },
    [activeTargetKey, onTargetLayout]
  );

  const value = useMemo(() => ({ activeTargetKey, registerTarget }), [activeTargetKey, registerTarget]);

  useEffect(() => {
    onTargetLayout(null);
  }, [activeTargetKey, onTargetLayout]);

  return <GuidedTargetContext.Provider value={value}>{children}</GuidedTargetContext.Provider>;
}

export function SpotlightTarget({ targetKey, children, style }: SpotlightTargetProps) {
  const targetRef = useRef<View>(null);
  const lastRectRef = useRef<SpotlightRect | null>(null);
  const { activeTargetKey, registerTarget } = useContext(GuidedTargetContext);
  const isActive = activeTargetKey === targetKey;

  const measureTarget = useCallback(() => {
    if (!isActive) {
      return;
    }

    requestAnimationFrame(() => {
      targetRef.current?.measureInWindow((x, y, width, height) => {
        if (width > 0 && height > 0) {
          const nextRect = { x, y, width, height };
          const previousRect = lastRectRef.current;
          const hasMoved =
            !previousRect ||
            Math.abs(previousRect.x - x) > 1 ||
            Math.abs(previousRect.y - y) > 1 ||
            Math.abs(previousRect.width - width) > 1 ||
            Math.abs(previousRect.height - height) > 1;

          if (hasMoved) {
            lastRectRef.current = nextRect;
            registerTarget(targetKey, nextRect);
          }
        }
      });
    });
  }, [isActive, registerTarget, targetKey]);

  useEffect(() => {
    if (!isActive) {
      lastRectRef.current = null;
      return;
    }

    measureTarget();
    const interval = setInterval(measureTarget, 320);
    return () => clearInterval(interval);
  }, [isActive, measureTarget]);

  function handleLayout(_: LayoutChangeEvent) {
    measureTarget();
  }

  return (
    <View ref={targetRef} collapsable={false} onLayout={handleLayout} style={[style, isActive && styles.activeTarget]}>
      {children}
    </View>
  );
}

export function GuidedTooltip({
  checkpoint,
  total,
  title,
  description,
  actionHint,
  placement,
  targetRect,
  canGoBack,
  canAdvance,
  isLast,
  onBack,
  onClose,
  onNext
}: GuidedTooltipProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const reduceMotion = useReduceMotion();
  const motion = getGuidedMotionConfig(reduceMotion);
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const cardTranslate = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    cardOpacity.setValue(0);
    cardTranslate.setValue(reduceMotion ? 0 : placement === "top" ? -12 : 12);
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: motion.contentDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(cardTranslate, {
        toValue: 0,
        duration: motion.contentDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ]).start();
  }, [cardOpacity, cardTranslate, checkpoint, motion.contentDuration, placement, reduceMotion]);

  useEffect(() => {
    pulse.setValue(0);
    if (!targetRect || !motion.allowPulse) {
      return;
    }

    const animation = Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: motion.spotlightDuration, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: motion.spotlightDuration, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1, duration: motion.spotlightDuration, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: motion.spotlightDuration, useNativeDriver: true })
    ]);
    animation.start();
    return () => animation.stop();
  }, [motion.allowPulse, motion.spotlightDuration, pulse, targetRect]);

  const cutout = targetRect ? normalizeRect(targetRect, screenWidth, screenHeight) : null;
  const tooltipWidth = Math.min(screenWidth - spacing.md * 2, 360);
  const tooltipLeft = (screenWidth - tooltipWidth) / 2;
  const targetCenterX = cutout ? cutout.x + cutout.width / 2 : screenWidth / 2;
  const caretLeft = Math.min(tooltipWidth - 34, Math.max(22, targetCenterX - tooltipLeft - 9));
  const cardStyle =
    placement === "top"
      ? styles.cardTop
      : placement === "center"
        ? styles.cardCenter
        : styles.cardBottom;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
      {cutout ? (
        <>
          <BlockingPane style={{ left: 0, right: 0, top: 0, height: cutout.y }} />
          <BlockingPane style={{ left: 0, top: cutout.y, width: cutout.x, height: cutout.height }} />
          <BlockingPane
            style={{ left: cutout.x + cutout.width, right: 0, top: cutout.y, height: cutout.height }}
          />
          <BlockingPane style={{ left: 0, right: 0, top: cutout.y + cutout.height, bottom: 0 }} />
          <Animated.View
            pointerEvents="none"
            style={[
              styles.spotlightFrame,
              {
                left: cutout.x,
                top: cutout.y,
                width: cutout.width,
                height: cutout.height,
                opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.72, 1] }),
                transform: [
                  { scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.025] }) }
                ]
              }
            ]}
          />
        </>
      ) : (
        <BlockingPane style={StyleSheet.absoluteFillObject} block={canAdvance} />
      )}

      <Animated.View
        style={[
          styles.card,
          cardStyle,
          {
            left: tooltipLeft,
            width: tooltipWidth,
            opacity: cardOpacity,
            transform: [{ translateY: cardTranslate }]
          }
        ]}
      >
        {cutout && placement !== "center" ? (
          <View
            pointerEvents="none"
            style={[
              styles.tooltipCaret,
              placement === "top" ? styles.tooltipCaretBottom : styles.tooltipCaretTop,
              { left: caretLeft }
            ]}
          />
        ) : null}
        <View style={styles.cardHeader}>
          <Text style={styles.stepLabel}>{checkpoint}/{total}</Text>
          <TouchableOpacity accessibilityLabel="Tutup simulasi terpandu" onPress={onClose} style={styles.closeButton}>
            <X size={18} color={colors.muted} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {actionHint && !canAdvance ? <Text style={styles.actionHint}>{actionHint}</Text> : null}

        <View style={styles.actions}>
          <View style={styles.backSlot}>
            {canGoBack ? (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.75}>
                <ArrowLeft size={16} color={colors.teal} />
                <Text style={styles.backText}>Kembali</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            disabled={!canAdvance}
            onPress={onNext}
            style={[styles.nextButton, !canAdvance && styles.nextButtonDisabled]}
            activeOpacity={0.82}
          >
            <Text style={[styles.nextText, !canAdvance && styles.nextTextDisabled]}>
              {canAdvance ? (isLast ? "Selesai" : "Berikutnya") : "Lakukan aksi"}
            </Text>
            {canAdvance ? <ArrowRight size={17} color="#FFFFFF" /> : null}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

function BlockingPane({ style, block = true }: { style: object; block?: boolean }) {
  return (
    <View
      pointerEvents={block ? "auto" : "none"}
      style={[styles.blockingPane, style]}
      onStartShouldSetResponder={() => block}
      onResponderRelease={() => undefined}
    />
  );
}

function normalizeRect(rect: SpotlightRect, screenWidth: number, screenHeight: number): SpotlightRect {
  const padding = 7;
  const x = Math.max(4, rect.x - padding);
  const y = Math.max(4, rect.y - padding);
  const width = Math.min(screenWidth - x - 4, rect.width + padding * 2);
  const height = Math.min(screenHeight - y - 4, rect.height + padding * 2);
  return { x, y, width, height };
}

const styles = StyleSheet.create({
  activeTarget: {
    zIndex: 2
  },
  blockingPane: {
    position: "absolute",
    backgroundColor: "rgba(3, 12, 18, 0.72)"
  },
  spotlightFrame: {
    position: "absolute",
    borderRadius: radii.md,
    borderWidth: 3,
    borderColor: colors.gold,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 14,
    elevation: 16
  },
  card: {
    position: "absolute",
    borderRadius: radii.lg,
    padding: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.card,
    zIndex: 30
  },
  tooltipCaret: {
    position: "absolute",
    width: 18,
    height: 18,
    backgroundColor: colors.white,
    transform: [{ rotate: "45deg" }]
  },
  tooltipCaretTop: {
    top: -8,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.line
  },
  tooltipCaretBottom: {
    bottom: -8,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line
  },
  cardTop: {
    top: 24
  },
  cardBottom: {
    bottom: 24
  },
  cardCenter: {
    top: "31%"
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  stepLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "800"
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background
  },
  title: {
    color: colors.ink,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "900",
    marginTop: spacing.sm
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    marginTop: spacing.sm
  },
  actionHint: {
    color: colors.teal,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "900",
    marginTop: spacing.md
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  backSlot: {
    flex: 1
  },
  backButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  backText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900"
  },
  nextButton: {
    minHeight: 48,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: colors.teal
  },
  nextButtonDisabled: {
    backgroundColor: colors.line
  },
  nextText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  nextTextDisabled: {
    color: colors.muted
  }
});
