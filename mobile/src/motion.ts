import { Easing } from "react-native";

export const motion = {
  duration: {
    instant: 90,
    fast: 160,
    base: 220,
    slow: 360,
    celebration: 760,
  },
  distance: {
    reveal: 10,
  },
  scale: {
    press: 0.98,
    emphasis: 1.02,
  },
  stagger: {
    default: 60,
    maximumItems: 5,
  },
  easing: {
    enter: Easing.out(Easing.cubic),
    exit: Easing.in(Easing.cubic),
  },
  spring: {
    friction: 8,
    tension: 110,
  },
} as const;

export function getStaggerDelay(index: number): number {
  const boundedIndex = Math.max(0, Math.min(index, motion.stagger.maximumItems - 1));
  return boundedIndex * motion.stagger.default;
}
