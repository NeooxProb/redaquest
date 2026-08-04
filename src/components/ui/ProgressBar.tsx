import type { CSSProperties } from 'react'

interface ProgressBarProps {
  current: number
  max: number
  color?: string
  trackColor?: string
  height?: number
  label: string
  glow?: boolean
}

type ProgressStyle = CSSProperties & {
  '--progress-width': string
  '--progress-color': string
  '--progress-track': string
  '--progress-height': string
  '--progress-glow': string
}

export default function ProgressBar({
  current,
  max,
  color = '#ffffff',
  trackColor = 'rgba(255,255,255,0.25)',
  height = 10,
  label,
  glow = false,
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 1
  const percentage = Math.min(100, Math.max(0, Math.round((current / safeMax) * 100)))
  const style: ProgressStyle = {
    '--progress-width': `${percentage}%`,
    '--progress-color': color,
    '--progress-track': trackColor,
    '--progress-height': `${height}px`,
    '--progress-glow': glow ? `0 0 10px ${color}88` : 'none',
  }

  return (
    <div
      className="progress-bar"
      style={style}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={current}
    >
      <div className="progress-bar__fill" />
    </div>
  )
}
