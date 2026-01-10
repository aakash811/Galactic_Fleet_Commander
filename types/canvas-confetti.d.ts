declare module "canvas-confetti" {
  const confetti: (options?: {
    particleCount?: number
    angle?: number
    spread?: number
    origin?: { x?: number; y?: number }
    colors?: string[]
  }) => void

  export default confetti
}