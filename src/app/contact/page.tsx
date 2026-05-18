'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import data from '../../data/portfolio.json'

export default function ContactPage() {
  const [formData, setFormData] = useState<Record<string, string>>({ name: '', email: '', message: '' })

  const { contact, social } = data
  const socialMap = social as Record<string, { label: string; url: string; display: string; value?: string }>

  const contactMethods = contact.contactMethods.map((key: string) => ({
    label: socialMap[key].label,
    value: socialMap[key].display,
    link: socialMap[key].url,
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = formData
    window.location.href = `mailto:${social.email.value}?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
  }

  return (
    <div className="pt-24 px-6 relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${contact.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{contact.sectionTitle}</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-neon rounded-full mb-6" />
          <p className="text-zinc-400">{contact.sectionSubtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {contactMethods.map((method: { label: string; value: string; link: string }, idx: number) => (
              <motion.a
                key={idx}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="group flex items-center justify-between p-5 rounded-2xl glass-effect border-accent/10 hover:border-accent/30 transition-all"
              >
                <div>
                  <h3 className="font-semibold text-zinc-100 group-hover:text-accent transition-colors">{method.label}</h3>
                  <p className="text-sm text-zinc-500 mt-0.5">{method.value}</p>
                </div>
                <span className="text-zinc-600 group-hover:text-accent transition-colors">→</span>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl glass-effect border-accent/10 mt-6"
            >
              <h3 className="font-semibold text-neon mb-2">{contact.availability.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-2">{contact.availability.text}</p>
              <p className="text-xs text-zinc-500">{contact.availability.responseTime}</p>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {contact.form.fields.map((field: { name: string; label: string; type: string; placeholder: string; rows?: number }) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-zinc-300 mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name]}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, [field.name]: e.target.value })}
                    required
                    rows={field.rows}
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-accent/20 focus:border-accent outline-none transition-colors text-zinc-100 placeholder-zinc-600 resize-none text-sm"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [field.name]: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-accent/20 focus:border-accent outline-none transition-colors text-zinc-100 placeholder-zinc-600 text-sm"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3 bg-gradient-to-r from-accent to-neon text-white rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              {contact.form.submitText}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}
