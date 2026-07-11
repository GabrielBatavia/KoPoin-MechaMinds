import { useEffect, useRef, useState } from "react";
import { Animated, Text, type StyleProp, type TextStyle } from "react-native";

import { useReduceMotion } from "../../hooks/use-reduce-motion";
import { motion } from "../../motion";

type AnimatedNumberProps = {
  formatter?: (value: number) => string;
  style?: StyleProp<TextStyle>;
  suffix?: string;
  value: number;
};

export function AnimatedNumber({ formatter = defaultFormatter, style, suffix = "", value }: AnimatedNumberProps) {
  const reduceMotion = useReduceMotion();
  const previousValue = useRef(value);
  const progress = useRef(new Animated.Value(1)).current;
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const fromValue = previousValue.current;
    previousValue.current = value;

    if (reduceMotion || fromValue === value) {
      progress.stopAnimation();
      progress.setValue(1);
      setDisplayValue(value);
      return;
    }

    progress.stopAnimation();
    progress.setValue(0);
    const listenerId = progress.addListener(({ value: fraction }) => {
      setDisplayValue(Math.round(fromValue + (value - fromValue) * fraction));
    });
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: motion.duration.slow,
      easing: motion.easing.enter,
      useNativeDriver: false,
    });
    animation.start(({ finished }) => {
      if (finished) {
        setDisplayValue(value);
      }
    });

    return () => {
      animation.stop();
      progress.removeListener(listenerId);
    };
  }, [progress, reduceMotion, value]);

  return <Text style={style}>{formatter(displayValue)}{suffix}</Text>;
}

function defaultFormatter(value: number): string {
  return Math.round(value).toLocaleString("id-ID");
}
