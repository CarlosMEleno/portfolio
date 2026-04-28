export type ParallaxType =
  | 'scroll'
  | 'scale'
  | 'opacity'
  | 'scroll-opacity'
  | 'scale-opacity'

export type ImageSize =
  | 'cover'
  | 'contain'
  | 'auto'
  | `${number}px`
  | `${number}%`

export type ImagePosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | `${number}% ${number}%`

export type ImageRepeat = 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'

export interface ParallaxOptions {
  /** Image source URL */
  imageSrc: string

  /**
   * Type of parallax effect
   * @default 'scroll'
   */
  type?: ParallaxType

  /**
   * Image size behavior
   * @default 'cover'
   */
  imgSize?: ImageSize

  /**
   * Image position
   * @default 'center'
   */
  imgPosition?: ImagePosition

  /**
   * Image repeat behavior
   * @default 'no-repeat'
   */
  imgRepeat?: ImageRepeat

  /**
   * Keep image position when scrolled out of viewport
   * @default true
   */
  keepImg?: boolean

  /**
   * z-index of the parallax container
   * @default -100
   */
  zIndex?: number

  /**
   * Disable parallax effect on touch devices
   * @default false
   */
  disableParallax?: boolean

  /**
   * Additional CSS class for the container
   */
  containerClass?: string

  /**
   * Overlay color (with opacity). Example: 'rgba(0,0,0,0.5)'
   */
  overlayColor?: string

  /**
   * Image scale factor. Values < 1 zoom out, > 1 zoom in
   * @default 1
   */
  scale?: number
}

export const defaultParallaxOptions: Partial<ParallaxOptions> = {
  type: 'scroll',
  imgSize: 'cover',
  imgPosition: 'center',
  imgRepeat: 'no-repeat',
  keepImg: true,
  zIndex: -100,
  disableParallax: false,
  scale: 1,
}
