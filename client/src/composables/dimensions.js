import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

export function useDimensions() {
  const { width } = useWindowSize();

  const isMobileWidth = computed(() => width.value < 600);

  function isBreakpoint(bp, direction = 'down') {
    return { bp, direction };
  }

  return {
    isMobileWidth,
    isBreakpoint,
  };
}
