export const contentTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: {
    duration: 0.24,
    ease: [0.22, 1, 0.36, 1] as const
  }
};
