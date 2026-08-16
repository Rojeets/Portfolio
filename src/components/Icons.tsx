interface IconProps {
  className?: string
  size?: number | string
}

function icon(size: number | string = '1em') {
  return { width: size, height: size, viewBox: '0 0 256 256', fill: 'currentColor' }
}

export function List({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16M224 184H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16" />
    </svg>
  )
}

export function X({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
    </svg>
  )
}

export function GithubLogo({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M128 0A128 128 0 1 0 256 128 128.14 128.14 0 0 0 128 0m0 232c-11.5 0-22-3.6-30.6-9.7a8 8 0 0 1-.4-12.4l24.1-19.3a8 8 0 0 1 11.2 1l16 19.7a8 8 0 0 0 12.4 0l35.3-52.5a8 8 0 0 0-3.3-11.3 64 64 0 1 0-82.7 82.6 8 8 0 0 0 11.3-3.2L100 138.4l-24.2 19.3a8 8 0 0 1-12.4-.4A104 104 0 1 1 128 24a104.2 104.2 0 0 1 91.8 54.5 8 8 0 0 1-3 13.1l-25 7.2a8 8 0 0 1-10-5.5 48 48 0 0 0-93.6 0 8 8 0 0 1-14.6 1A103.8 103.8 0 0 1 24 128a104 104 0 0 1 104-104" />
    </svg>
  )
}

export function GitlabLogo({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M243.65 112.91 195.8 24.18a9.58 9.58 0 0 0-17.38-.28L142.13 98.67H113.9L77.6 23.9a9.58 9.58 0 0 0-17.38.28L12.35 112.91a38.33 38.33 0 0 0 12.37 45.42l88.4 67.13 2.05 1.56a14.21 14.21 0 0 0 16.93 0l2.05-1.56 88.4-67.13a38.33 38.33 0 0 0 21.1-45.42Zm-13.14 34.36a12.8 12.8 0 0 1-7 3.12l-95.21 69.29-95.21-69.29a12.8 12.8 0 0 1-7-3.12 12.24 12.24 0 0 1-4-13.51l15.54-41.22 10.65-28.27 24.69 62.47a9.28 9.28 0 0 0 8.55 5.75h93.73a9.28 9.28 0 0 0 8.55-5.75l24.69-62.47 10.65 28.27 15.54 41.22a12.24 12.24 0 0 1-4.17 13.51Z" />
    </svg>
  )
}

export function LinkedinLogo({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M232 0H24A24 24 0 0 0 0 24v208a24 24 0 0 0 24 24h208a24 24 0 0 0 24-24V24a24 24 0 0 0-24-24M80 200H48V96h32Zm-16-128a16 16 0 1 1 16-16 16 16 0 0 1-16 16M208 200h-32v-56a16 16 0 0 0-32 0v56h-32V96h32v22.4A32 32 0 0 1 176 112a32.4 32.4 0 0 1 32 36Z" />
    </svg>
  )
}

export function EnvelopeSimple({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8m-89.4 104.6L128 147.1l-4.6 5.5a8 8 0 0 1-12.2 0L40 101.2V64h176Z" />
    </svg>
  )
}

export function ArrowRight({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M213.66 122.34l-80-80A8 8 0 0 0 120 48v41.31L43.31 56A8 8 0 0 0 32 64v128a8 8 0 0 0 11.31 7.69L120 166.69V208a8 8 0 0 0 13.66 5.66l80-80a8 8 0 0 0 0-11.32" />
    </svg>
  )
}

export function ArrowLeft({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M216 112v96a8 8 0 0 1-8 8H136v-32h24a8 8 0 0 0 0-16h-32a8 8 0 0 0-8 8v40a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v41.31l72.34-72.35a8 8 0 0 1 11.32 11.32L131.31 112H208a8 8 0 0 1 8 8" />
    </svg>
  )
}

export function ArrowUpRight({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M204 64v112a8 8 0 0 1-8 8H88a8 8 0 0 1 0-16h83.31l-72.66-72.69a8 8 0 0 1 11.32-11.32L184 148.69V64a8 8 0 0 1 16 0m-40-48H48a8 8 0 0 0-8 8v160a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8m0 168H48V72h160Z" />
    </svg>
  )
}

export function Cpu({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M184 24H72a16 16 0 0 0-16 16v16h16v-8h8v24H48v112h32v8H56v16a16 16 0 0 0 16 16h112a16 16 0 0 0 16-16v-16h-8v-8h32V136h-32v-8h16V72h-16v-8h16V48a16 16 0 0 0-16-16m-16 40h-32v32h32Zm-32 80h32v32h-32Zm0-72h32v32h-32ZM80 136v32h32v-32Zm0-64h32v32H80Z" />
    </svg>
  )
}

export function ChartBar({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M224 208H32a8 8 0 0 1-8-8V48a8 8 0 0 1 16 0v72h24V80a8 8 0 0 1 16 0v80h24V64a8 8 0 0 1 16 0v88h24V72a8 8 0 0 1 16 0v80h24V88a8 8 0 0 1 16 0v112a8 8 0 0 1-8 8" />
    </svg>
  )
}

export function ClipboardText({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M168 24H88a16 16 0 0 0-16 16v16H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V72a16 16 0 0 0-16-16h-24V40a16 16 0 0 0-16-16m-48 8a8 8 0 0 1 8-8h16v16a8 8 0 0 1-16 0ZM80 184v-48h16v48Zm0-64v-16h16v16Zm32 64v-48h16v48Zm0-64v-16h16v16Zm32 64v-48h16v48Zm0-64v-16h16v16Z" />
    </svg>
  )
}

export function Palette({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M128 16a112 112 0 1 0 112 112A112.13 112.13 0 0 0 128 16m0 208a96 96 0 0 1-68.1-28.4 8 8 0 0 1-.5-11.3 8 8 0 0 1 11.3-.5A80 80 0 1 0 128 48a80 80 0 0 1 0 160 8 8 0 0 1 0-16 64 64 0 0 0 0-128 96.1 96.1 0 0 0-68.1 28.4 8 8 0 0 1-11.8-.5 8 8 0 0 1 .5-11.8A112.1 112.1 0 0 0 224 128a112.13 112.13 0 0 1-96 96" />
    </svg>
  )
}

export function CurrencyDollar({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M168 184a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8M128 24a104.16 104.16 0 0 0-31.5 202.1V184a8 8 0 0 0-16 0v42.1A104.16 104.16 0 0 0 128 24m-16 96a8 8 0 0 0-8-8H80a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m64-16h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16" />
    </svg>
  )
}

export function Database({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M128 176a48.05 48.05 0 0 0 48-48 48 48 0 0 0-96 0 48.05 48.05 0 0 0 48 48m0-128a80 80 0 1 0 80 80 80.09 80.09 0 0 0-80-80m0 128a32 32 0 1 1 32-32 32 32 0 0 1-32 32m0-168C71.6 16 24 58.16 24 112v32c0 53.84 47.6 96 104 96s104-42.16 104-96v-32c0-53.84-47.6-96-104-96m80 112c0 40.27-30.4 72-80 72s-80-31.73-80-72 30.4-72 80-72 80 31.73 80 72" />
    </svg>
  )
}

export function HardDrives({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M224 128a8 8 0 0 1-8 8H168v48a8 8 0 0 1-8 8H96a8 8 0 0 1-8-8v-48H40a8 8 0 0 1 0-16h48V72a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v48h48a8 8 0 0 1 8 8M208 24H48a24 24 0 0 0-24 24v160a24 24 0 0 0 24 24h160a24 24 0 0 0 24-24V48a24 24 0 0 0-24-24m-8 168H56V56h144Z" />
    </svg>
  )
}

export function Gear({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M128 80a48 48 0 1 0 48 48 48 48 0 0 0-48-48m0 80a32 32 0 1 1 32-32 32 32 0 0 1-32 32" />
      <path d="M248 128c0-7.3-.7-14.5-2-21.6l-20.3-8.6a8 8 0 0 1-3.6-10.6l8.3-17.5a8 8 0 0 1 10.5-3.6l20.2 8.6a88.3 88.3 0 0 1 21.5-12.4V32a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v16.6a88.3 88.3 0 0 1-21.5 12.4l-20.2-8.6a8 8 0 0 1-3.6-10.6l8.3-17.5a8 8 0 0 1 10.5-3.6l20.3 8.6c1.3-7.1 2-14.3 2-21.6a8 8 0 0 0-16 0c0 6.7-.6 13.3-1.8 19.8l-20.3 8.6a16 16 0 0 1-21-7.2l-8.3-17.5a16 16 0 0 1 7.2-21l20.2-8.6A88.6 88.6 0 0 1 120 14.4V16a8 8 0 0 0-16 0v18.4A88.6 88.6 0 0 1 84.4 32l-20.2 8.6a16 16 0 0 1-21-7.2L35 15.9a16 16 0 0 1 7.2-21l20.3-8.6c1.3-7.1 2-14.3 2-21.6a8 8 0 0 0-16 0c0 6.7-.6 13.3-1.8 19.8L25.6 24a8 8 0 0 1-10.5 3.6l-8.3-17.5a8 8 0 0 1 3.6-10.6L31 9.8A88.3 88.3 0 0 1 52.5 -2.6V-19a8 8 0 0 0-8-8H12.5a8 8 0 0 0-8 8v16.6A88.3 88.3 0 0 1 -17.5 22.4l-20.2-8.6a8 8 0 0 1-3.6-10.6l8.3-17.5A8 8 0 0 1 21.7-18l20.3 8.6C43.3-17.1 44-24.3 44-31.6a8 8 0 0 0-16 0c0 6.7-.6 13.3-1.8 19.8l-20.3 8.6a16 16 0 0 1-21-7.2l-8.3-17.5a16 16 0 0 1 7.2-21l20.2-8.6A88.6 88.6 0 0 1 56.4-88V-96a8 8 0 0 0-16 0v18.4A88.6 88.6 0 0 1 20.4-72l-20.2 8.6a16 16 0 0 1-21-7.2l-8.3-17.5a16 16 0 0 1 7.2-21l20.3-8.6" />
    </svg>
  )
}

export function Rocket({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M220.69 55.35A104.94 104.94 0 0 0 152 32a105.56 105.56 0 0 0-44 9.6L96 48H64A56 56 0 0 0 8 104v32a56 56 0 0 0 56 56h16l27.3 36.4a8 8 0 0 0 12.6.3L136 192v24a8 8 0 0 0 8 8h32a8 8 0 0 0 8-8v-24l16.1 20.7a8 8 0 0 0 12.6-.3L216 192h16a56 56 0 0 0 56-56v-32a56 56 0 0 0-31.3-50.65M192 144a32 32 0 1 1 32-32 32 32 0 0 1-32 32" />
    </svg>
  )
}

export function SquaresFour({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M200 32H56a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h144a24 24 0 0 0 24-24V56a24 24 0 0 0-24-24m-8 168H64V64h128ZM112 112h32v32h-32Z" />
    </svg>
  )
}

export function GearSix({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M128 80a48 48 0 1 0 48 48 48 48 0 0 0-48-48m0 80a32 32 0 1 1 32-32 32 32 0 0 1-32 32" />
      <path d="M224 128a96.15 96.15 0 0 0-40.82-77.24 8 8 0 0 0-9.59 1.46l-15 13.57a8 8 0 0 1-9.62.39 64.07 64.07 0 0 0-83.9 0 8 8 0 0 1-9.62-.39l-15-13.57a8 8 0 0 0-9.59-1.46A96.15 96.15 0 0 0 32 128a96.15 96.15 0 0 0 40.82 77.24 8 8 0 0 0 9.59-1.46l15-13.57a8 8 0 0 1 9.62-.39 64.07 64.07 0 0 0 83.9 0 8 8 0 0 1 9.62.39l15 13.57a8 8 0 0 0 9.59 1.46A96.15 96.15 0 0 0 224 128" />
    </svg>
  )
}

export function MapPin({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M128 16a88.1 88.1 0 0 0-88 88c0 59.3 80.3 109.9 83.8 112.4a8.23 8.23 0 0 0 8.4 0C135.7 213.9 216 163.3 216 104a88.1 88.1 0 0 0-88-88m0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56" />
      <path d="M128 112a24 24 0 1 0 24 24 24 24 0 0 0-24-24" />
    </svg>
  )
}

export function Calendar({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M208 32H184V16a8 8 0 0 0-16 0v16H88V16a8 8 0 0 0-16 0v16H48A16 16 0 0 0 32 48v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16M48 208V80h160v128Z" />
    </svg>
  )
}

export function CheckCircle({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m-8 144l-40-40a8 8 0 0 1 11.32-11.32L128 148.69l36.69-36.68A8 8 0 0 1 176 128Z" />
    </svg>
  )
}

export function Code({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M85.33 128l-42.63-42.67a8 8 0 1 1 11.3-11.3L104 125.69l50-51.66a8 8 0 0 1 11.32 11.3L96.67 128Zm85.34 0 42.63 42.67a8 8 0 0 1-11.3 11.3L152 130.31l-50 51.66a8 8 0 0 1-11.32-11.3L140.67 128Z" />
    </svg>
  )
}

export function ShieldCheck({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M128 24c-23.39 0-44.09 9.4-53.6 25.82a8 8 0 0 0 .65 8.48l28 32a8 8 0 0 0 6.3 3.15h17.65a8 8 0 0 1 8 8V136a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8v-34.55a8 8 0 0 1 8-8H166a8 8 0 0 0 6.3-3.15l28-32a8 8 0 0 0 .65-8.48C192.09 33.4 171.39 24 148 24m-32 112a12 12 0 1 1 12-12 12 12 0 0 1-12 12" />
      <path d="M216 128c0-7.3-.7-14.5-2-21.6l-20.3-8.6a8 8 0 0 1-3.6-10.6l8.3-17.5a8 8 0 0 1 10.5-3.6l20.2 8.6a88.3 88.3 0 0 1 21.5-12.4V64a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v16.6a88.3 88.3 0 0 1-21.5 12.4l-20.2-8.6a8 8 0 0 1-3.6-10.6l8.3-17.5a8 8 0 0 1 10.5-3.6l20.3 8.6c1.3-7.1 2-14.3 2-21.6a8 8 0 0 0-16 0c0 6.7-.6 13.3-1.8 19.8l-20.3 8.6a16 16 0 0 1-21-7.2l-8.3-17.5a16 16 0 0 1 7.2-21l20.2-8.6A88.6 88.6 0 0 1 120 32V48a8 8 0 0 0-16 0V34.4A88.6 88.6 0 0 1 84.4 48l-20.2 8.6a16 16 0 0 1-21-7.2L35 31.9a16 16 0 0 1 7.2-21l20.3-8.6c1.3-7.1 2-14.3 2-21.6a8 8 0 0 0-16 0c0 6.7-.6 13.3-1.8 19.8L25.6 40a8 8 0 0 1-10.5 3.6l-8.3-17.5a8 8 0 0 1 3.6-10.6L31 25.8A88.3 88.3 0 0 1 52.5 13.4V-4a8 8 0 0 0-8-8H12.5a8 8 0 0 0-8 8v16.6A88.3 88.3 0 0 1 -17.5 38.4l-20.2-8.6a8 8 0 0 1-3.6-10.6l8.3-17.5A8 8 0 0 1 21.7 18l20.3 8.6C43.3 26.9 44 19.7 44 12.4a8 8 0 0 0-16 0c0 6.7-.6 13.3-1.8 19.8l-20.3 8.6a16 16 0 0 1-21-7.2l-8.3-17.5a16 16 0 0 1 7.2-21l20.2-8.6A88.6 88.6 0 0 1 56.4-72V-80a8 8 0 0 0-16 0v18.4A88.6 88.6 0 0 1 20.4-56l-20.2 8.6a16 16 0 0 1-21-7.2l-8.3-17.5a16 16 0 0 1 7.2-21l20.3-8.6" />
    </svg>
  )
}

export function Wrench({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M223.46 167l-46.59-46.59a63.53 63.53 0 0 0 14.85-40.69A64 64 0 0 0 128 16a64 64 0 0 0-64 64 63.53 63.53 0 0 0 40.69 14.85L136 82.28V88a8 8 0 0 0 8 8h5.72L82.28 153.37A64 64 0 0 0 48 217.37V240a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8v-14.73a64 64 0 0 0 64-64v-5.72L158 200.59A63.53 63.53 0 0 0 198.69 215.44 64 64 0 0 0 224 152a63.53 63.53 0 0 0-6.54-31" />
    </svg>
  )
}

export function Calculator({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M200 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16M72 56h16v16H72Zm0 40h16v16H72Zm0 40h16v16H72Zm80-80H104V56h48Zm0 40H104V96h48Zm0 40h-16v-16h16Zm0-40h-16V96h16Zm0-40h-16V56h16Zm0 80h16v16h-16Zm16 40h16v40h-16Z" />
    </svg>
  )
}

export function Bot({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M216 80h-8V64a40 40 0 0 0-80 0v16h-8a24 24 0 0 0-24 24v88a24 24 0 0 0 24 24h112a24 24 0 0 0 24-24V104a24 24 0 0 0-24-24m-72-16a24 24 0 0 1 48 0v16h-48Zm72 120H104a8 8 0 0 1-8-8V104a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v88a8 8 0 0 1-8 8" />
      <circle cx="128" cy="132" r="8" />
      <circle cx="168" cy="132" r="8" />
      <path d="M128 156a8 8 0 0 1-4-14.93V136a8 8 0 0 1 8-8h0a8 8 0 0 1 8 8v11.29a8 8 0 0 1-4 7.07" />
    </svg>
  )
}

export function Lock({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M176 104v-8a48 48 0 0 0-96 0v8a24 24 0 0 0-24 24v80a24 24 0 0 0 24 24h96a24 24 0 0 0 24-24V128a24 24 0 0 0-24-24m-48-8a32 32 0 0 1 64 0v8h-64Zm64 104a8 8 0 0 1-8 8H96a8 8 0 0 1-8-8V128a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8Z" />
      <circle cx="128" cy="152" r="12" />
      <rect x="124" y="160" width="8" height="24" rx="4" />
    </svg>
  )
}

export function Backpack({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M208 72h-16V56a56 56 0 0 0-112 0v16H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16M80 56a40 40 0 0 1 80 0v16H80Zm128 144H48V88h160Z" />
      <rect x="88" y="104" width="80" height="56" rx="8" fill="none" stroke="currentColor" strokeWidth="8" />
      <circle cx="128" cy="132" r="6" />
    </svg>
  )
}

export function Store({ className, size }: IconProps) {
  return (
    <svg {...icon(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M223.65 80H32.35a8 8 0 0 0-5.66 2.35l-24 24a8 8 0 0 0 0 11.3l105.31 105.31a16 16 0 0 0 22.62 0L244.89 118a8 8 0 0 0 0-11.31l-24-24a8 8 0 0 0-5.24-2.69M48 96h15.69L128 160.31 192.31 96H208l-80 80-80-80" />
      <path d="M120 24a8 8 0 0 0-8 8v16H88a8 8 0 0 0-8 8v16h192V56a8 8 0 0 0-8-8h-24V32a8 8 0 0 0-8-8Z" />
    </svg>
  )
}
