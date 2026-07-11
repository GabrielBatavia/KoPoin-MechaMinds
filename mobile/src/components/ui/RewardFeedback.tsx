import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Check } from "lucide-react-native";

import { useReduceMotion } from "../../hooks/use-reduce-motion";
import { motion } from "../../motion";
import { colors } from "../../theme";

type RewardFeedbackProps = {
  active: boolean;
  children: ReactNode;
  points?: number;
  style?: StyleProp<ViewStyle>;
};

export function RewardFeedback({ active, children, points, style }: RewardFeedbackProps) {
  const reduceMotion = useReduceMotion();
  const previousActive = useRef(active);
  const emphasis = useRef(new Animated.Value(0)).current;
  const badge = useRef(new Animated.Value(0)).current;
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const becameActive = active && !previousActive.current;
    previousActive.current = active;
    if (!becameActive || reduceMotion) {
      return;
    }

    setShowBadge(true);
    emphasis.setValue(0);
    badge.setValue(0);
    const animation = Animated.parallel([
      Animated.sequence([
        Animated.timing(emphasis, {
          toValue: 1,
          duration: motion.duration.fast,
          easing: motion.easing.enter,
          useNativeDriver: true,
        }),
        Animated.spring(emphasis, {
          toValue: 0,
          ...motion.spring,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(badge, {
          toValue: 1,
          duration: motion.duration.base,
          easing: motion.easing.enter,
          useNativeDriver: true,
        }),
        Animated.delay(motion.duration.slow),
        Animated.timing(badge, {
          toValue: 2,
          duration: motion.duration.fast,
          easing: motion.easing.exit,
          useNativeDriver: true,
        }),
      ]),
    ]);
    animation.start(() => setShowBadge(false));
    return () => animation.stop();
  }, [active, badge, emphasis, reduceMotion]);

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={{
          transform: [
            {
              scale: emphasis.interpolate({
                inputRange: [0, 1],
                outputRange: [1, motion.scale.emphasis],
              }),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
      {showBadge ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.badge,
            {
              opacity: badge.interpolate({ inputRange: [0, 1, 2], outputRange: [0, 1, 0] }),
              transform: [
                { translateY: badge.interpolate({ inputRange: [0, 1, 2], outputRange: [8, -8, -18] }) },
                { scale: badge.interpolate({ inputRange: [0, 1, 2], outputRange: [0.92, 1, 0.98] }) },
              ],
            },
          ]}
        >
          <Check size={13} color={colors.tealDark} strokeWidth={3} />
          <Text style={styles.badgeText}>{points ? `+${points} Kopoin` : "Berhasil"}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: 14,
    top: 0,
    zIndex: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    backgroundColor: colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: colors.tealDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 5,
  },
  badgeText: {
    color: colors.tealDark,
    fontSize: 11,
    fontWeight: "900",
  },
});
