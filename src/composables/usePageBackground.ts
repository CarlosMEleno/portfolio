import {
  ref,
  readonly,
  onMounted,
  onUnmounted,
  nextTick,
  type DeepReadonly,
  type Ref,
} from 'vue'
import type { ParallaxOptions } from '../types/parallax'

// Estado reactivo global para el background actual
const currentBackground = ref<ParallaxOptions | null>(null)

/**
 * Return type for the usePageBackground composable
 */
export interface UsePageBackgroundReturn {
  /** Current background configuration (readonly) */
  currentBackground: DeepReadonly<Ref<ParallaxOptions | null>>
  /** Set the background configuration */
  setBackground: (options: ParallaxOptions) => void
  /** Clear the current background */
  clearBackground: () => void
  /** Hook to set background on mount and clear on unmount */
  useViewBackground: (options: ParallaxOptions) => void
}

/**
 * Composable para gestionar el background parallax de las páginas.
 * Cada vista puede llamar a setBackground() para definir su propio background.
 */
export function usePageBackground(): UsePageBackgroundReturn {
  /**
   * Define el background parallax para la página actual
   * @param options - Opciones de configuración del parallax
   */
  const setBackground = (options: ParallaxOptions): void => {
    currentBackground.value = options
  }

  /**
   * Elimina el background de la página actual
   */
  const clearBackground = (): void => {
    currentBackground.value = null
  }

  /**
   * Hook para usar en vistas - configura background al montar y limpia al desmontar
   * Usa onMounted para garantizar el timing correcto con Vue Router
   * @param options - Opciones de configuración del parallax
   */
  const useViewBackground = (options: ParallaxOptions): void => {
    onMounted(async (): Promise<void> => {
      await nextTick()
      setBackground(options)
    })

    onUnmounted((): void => {
      clearBackground()
    })
  }

  return {
    currentBackground: readonly(currentBackground),
    setBackground,
    clearBackground,
    useViewBackground,
  }
}

// Re-exportar tipos para conveniencia
export type { ParallaxOptions } from '../types/parallax'
