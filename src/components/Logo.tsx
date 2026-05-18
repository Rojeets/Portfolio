'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="group relative flex items-center py-1">
      <motion.div
        className="flex items-center gap-0.5"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 8 }}
      >
        <motion.span
          className="text-sm font-mono font-bold text-accent/40 group-hover:text-accent/70 transition-colors"
          whileHover={{ rotate: -8 }}
        >
          &lt;
        </motion.span>
        <span className="relative">
          <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-accent via-purple-400 to-neon bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(99,102,241,0.3)]">
            R
          </span>
          <span className="absolute -inset-2 bg-gradient-to-r from-accent/20 via-purple-400/10 to-neon/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-purple-400 to-neon rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </span>
        <span className="text-lg md:text-xl font-semibold tracking-tight text-zinc-100/90 group-hover:text-zinc-100 transition-colors">
          ojeets
        </span>
        <motion.span
          className="text-sm font-mono font-bold text-accent/40 group-hover:text-accent/70 transition-colors"
          whileHover={{ rotate: 8 }}
        >
          /&gt;
        </motion.span>
      </motion.div>
    </Link>
  )
}
