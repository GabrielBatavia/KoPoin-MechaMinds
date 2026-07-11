import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Animated, Pressable, type StyleProp, type ViewStyle } from "react-native";

import { useReduceMotion } from "../../hooks/use-reduce-motion";
import { motion } from "../../motion";

type PressableProps = ComponentProps<typeof Pressable>;

type MotionPressableProps = Omit<PressableProps, "children" | "style"> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  pressedScale?: number;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function MotionPressable({
  children,
  disabled,
  onPressIn,
  onPressOut,
  pressedScale = motion.scale.press,
  style,
  ...props
}: MotionPressableProps) {
  const reduceMotion = useReduceMotion();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => () => scale.stopAnimation(), [scale]);

  function animateTo(value: number, isRelease: boolean) {
    scale.stopAnimation();
    if (reduceMotion) {
      scale.setValue(1);
      return;
    }

    if (isRelease) {
      Animated.spring(scale, {
        toValue: value,
        ...motion.spring,
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.timing(scale, {
      toValue: value,
      duration: motion.duration.instant,
      easing: motion.easing.exit,
      useNativeDriver: true,
    }).start();
  }

  return (
    <AnimatedPressable
      {...props}
      disabled={disabled}
      onPressIn={(event) => {
        animateTo(pressedScale, false);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateTo(1, true);
        onPressOut?.(event);
      }}
      style={[
        style,
        {
          opacity: disabled ? 0.55 : 1,
          transform: [{ scale }],
        },
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}
