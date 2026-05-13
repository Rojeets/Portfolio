'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import data from '../data/portfolio.json'

export default function Contact() {
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
    const mailtoLink = `mailto:${social.email.value}?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.location.href = mailtoLink
  }

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${contact.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{contact.sectionTitle}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
          <p className="text-zinc-400 mt-6 text-lg">{contact.sectionSubtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {contactMethods.map((method: { label: string; value: string; link: string }, idx: number) => (
              <motion.a
                key={idx}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="group glass-effect p-6 rounded-xl border border-accent/10 hover:border-accent/30 transition-all block"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-mono text-sm">{method.label.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon transition-colors">
                      {method.label}
                    </h3>
                    <p className="text-zinc-400 text-sm">{method.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-effect p-6 rounded-xl border border-accent/10 mt-8"
            >
              <h3 className="text-lg font-bold mb-4 text-neon">{contact.availability.title}</h3>
              <p className="text-zinc-300 leading-relaxed">
                {contact.availability.text}
              </p>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {contact.form.fields.map((field: { name: string; label: string; type: string; placeholder: string; rows?: number }) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name]}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, [field.name]: e.target.value })}
                    required
                    rows={field.rows}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-accent/20 focus:border-accent outline-none transition-colors text-white placeholder-zinc-500 resize-none"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [field.name]: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-accent/20 focus:border-accent outline-none transition-colors text-white placeholder-zinc-500"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
            >
              {contact.form.submitText}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
