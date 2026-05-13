import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const levelConfig = {
  Expert: { border: 'border-emerald-500', dot: 'bg-emerald-500' },
  Advanced: { border: 'border-sky-400', dot: 'bg-sky-400' },
  Proficient: { border: 'border-indigo-400', dot: 'bg-indigo-400' },
}

export default function Sidebar({ pinnedTech, onClose }) {
  return (
    <>
      {pinnedTech && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <motion.aside
        animate={{ x: pinnedTech ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-[28rem] max-w-full z-50 bg-slate-900/95 border-l border-slate-700 shadow-2xl overflow-y-auto backdrop-blur-xl"
      >
        {pinnedTech && (
          <motion.div
            key={pinnedTech.cardId}
            className="min-h-full"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 font-mono mb-1">
                    {pinnedTech.name}
                  </h3>
                  <span className={`text-xs font-bold tracking-wider uppercase ${pinnedTech.levelColor || 'text-slate-400'}`}>
                    {pinnedTech.level}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
                >
                  <X size={16} />
                </motion.button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Sub-Skills
                </h4>
                <div className="space-y-2">
                  {pinnedTech.subSkills.map((subSkill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${levelConfig[pinnedTech.level]?.dot || 'bg-slate-500'}`} />
                      <span className="text-sm text-slate-300 font-mono leading-relaxed">{subSkill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.aside>
    </>
  )
}
