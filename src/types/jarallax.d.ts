declare module 'jarallax' {
  export interface JarallaxOptions {
    /** Parallax effect type */
    type?: 'scroll' | 'scale' | 'opacity' | 'scroll-opacity' | 'scale-opacity'
    /** Parallax effect speed. -1.0 to 2.0 */
    speed?: number
    /** Image source URL */
    imgSrc?: string
    /** Image element selector or element */
    imgElement?: string | HTMLElement
    /** Image size */
    imgSize?: string
    /** Image position */
    imgPosition?: string
    /** Image repeat */
    imgRepeat?: string
    /** Keep image visible when out of viewport */
    keepImg?: boolean
    /** Element selector to track height */
    elementInViewport?: string | HTMLElement
    /** z-index */
    zIndex?: number
    /** Disable parallax on specific conditions */
    disableParallax?: boolean | (() => boolean)
    /** Disable video parallax on specific conditions */
    disableVideo?: boolean | (() => boolean)
    /** Automatically play video */
    automaticResize?: boolean
    /** Video start time */
    videoStartTime?: number
    /** Video end time */
    videoEndTime?: number
    /** Video volume (0-1) */
    videoVolume?: number
    /** Video play only when visible */
    videoPlayOnlyVisible?: boolean
    /** Video lazy loading */
    videoLazyLoading?: boolean
    /** Callback after init */
    onInit?: (instance: JarallaxInstance) => void
    /** Callback after destroy */
    onDestroy?: (instance: JarallaxInstance) => void
    /** Callback on scroll */
    onScroll?: (instance: JarallaxInstance) => void
    /** Callback after cover image loaded */
    onCoverImage?: (instance: JarallaxInstance) => void
  }

  export interface JarallaxInstance {
    $item: HTMLElement
    options: JarallaxOptions
    image: {
      src: string
      $container: HTMLElement
      $item: HTMLElement
      width: number
      height: number
    }
    destroy: () => void
    clipContainer: () => void
    coverImage: () => void
    isVisible: () => boolean
    onScroll: (force?: boolean) => void
  }

  export function jarallax(
    elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
    options?: JarallaxOptions | 'destroy'
  ): void

  export function jarallaxVideo(
    elements?: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>
  ): void
}
