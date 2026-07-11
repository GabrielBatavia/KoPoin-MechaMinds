import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";

import { useReduceMotion } from "../../hooks/use-reduce-motion";
import { motion } from "../../motion";

type AnimatedProgressFillProps = {
  children?: ReactNode;
  progress: number;
  style?: StyleProp<ViewStyle>;
};

export function AnimatedProgressFill({ children, progress, style }: AnimatedProgressFillProps) {
  const reduceMotion = useReduceMotion();
  const normalizedProgress = Math.max(0, Math.min(progress, 1));
  const scaleX = useRef(new Animated.Value(reduceMotion ? normalizedProgress : 0)).current;

  useEffect(() => {
    scaleX.stopAnimation();
    if (reduceMotion) {
      scaleX.setValue(normalizedProgress);
      return;
    }

    const animation = Animated.timing(scaleX, {
      toValue: normalizedProgress,
      duration: motion.duration.slow,
      easing: motion.easing.enter,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [normalizedProgress, reduceMotion, scaleX]);

  return (
    <Animated.View
      style={[
        style,
        {
          width: "100%",
          transformOrigin: "left center",
          transform: [{ scaleX }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
