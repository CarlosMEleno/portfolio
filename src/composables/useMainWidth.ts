import {
  ref,
  readonly,
  onMounted,
  onUnmounted,
  type DeepReadonly,
  type Ref,
} from 'vue'

const DEFAULT_MAX_WIDTH = 'max-w-[800px]'

const currentMaxWidth = ref(DEFAULT_MAX_WIDTH)

export function useMainWidth(): {
  currentMaxWidth: DeepReadonly<Ref<string>>
  useViewWidth: (maxWidthClass: string) => void
} {
  const useViewWidth = (maxWidthClass: string): void => {
    onMounted(() => {
      currentMaxWidth.value = maxWidthClass
    })

    onUnmounted(() => {
      currentMaxWidth.value = DEFAULT_MAX_WIDTH
    })
  }

  return {
    currentMaxWidth: readonly(currentMaxWidth),
    useViewWidth,
  }
}
