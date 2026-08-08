import {
  ChartBar,
  Bot,
  ClipboardText,
  Code,
  Wrench,
  Store,
  SquaresFour,
  Rocket,
  GearSix,
  ShieldCheck,
} from '@/components/Icons'
import type { PillarIcon } from '@/data/services'

export const pillarIcons = {
  ChartBar,
  Bot,
  ClipboardText,
  Code,
  Wrench,
  Store,
  SquaresFour,
  Rocket,
  GearSix,
  ShieldCheck,
} as const satisfies Record<PillarIcon, React.ComponentType<{ size?: number; className?: string }>>
