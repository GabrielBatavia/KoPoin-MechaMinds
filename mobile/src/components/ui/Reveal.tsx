import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";

import { useReduceMotion } from "../../hooks/use-reduce-motion";
import { motion } from "../../motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  distance?: number;
  from?: "bottom" | "left" | "right" | "top";
  style?: StyleProp<ViewStyle>;
};

export function Reveal({ children, delay = 0, distance = motion.distance.reveal, from = "bottom", style }: RevealProps) {
  const reduceMotion = useReduceMotion();
  const progress = useRef(new Animated.Value(reduceMotion ? 1 : 0)).current;

  useEffect(() => {
    progress.stopAnimation();
    if (reduceMotion) {
      progress.setValue(1);
      return;
    }

    progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1,
      delay: Math.max(0, Math.min(delay, motion.stagger.default * (motion.stagger.maximumItems - 1))),
      duration: motion.duration.base,
      easing: motion.easing.enter,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, progress, reduceMotion]);

  const offset = progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] });
  const transform =
    from === "left"
      ? [{ translateX: Animated.multiply(offset, -1) }]
      : from === "right"
        ? [{ translateX: offset }]
        : from === "top"
          ? [{ translateY: Animated.multiply(offset, -1) }]
          : [{ translateY: offset }];

  return <Animated.View style={[style, { opacity: progress, transform }]}>{children}</Animated.View>;
}
