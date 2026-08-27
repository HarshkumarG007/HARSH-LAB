import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // Simulate network delay for the serverless function (Web3Forms/Formspree)
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      // In a real implementation, you would post to Web3Forms here:
      /*
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE',
          ...formData
        })
      })
      if (!res.ok) throw new Error('Submission failed')
      */
      
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose()
        setTimeout(() => setStatus('idle'), 300)
      }, 3000)
    } catch (err: unknown) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050510]/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative w-full max-w-md bg-[#0a0a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">Secure Channel</h3>
                <p className="text-indigo-400 text-xs font-mono mt-1">INITIATE TRANSMISSION</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Transmission Successful</h4>
                  <p className="text-white/60 text-sm">Your message has been securely routed. I'll respond shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-white/50 mb-2">IDENTIFIER (NAME)</label>
                    <input
                      id="name"
                      type="text"
                      required
                      disabled={status === 'submitting'}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-white/50 mb-2">ROUTING (EMAIL)</label>
                    <input
                      id="email"
                      type="email"
                      required
                      disabled={status === 'submitting'}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-white/50 mb-2">PAYLOAD (MESSAGE)</label>
                    <textarea
                      id="message"
                      required
                      disabled={status === 'submitting'}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none disabled:opacity-50"
                      placeholder="How can we collaborate?"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-mono bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                      <AlertCircle size={14} />
                      Transmission failed. Please try again or use direct email.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-medium py-3 rounded-lg transition-colors mt-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        ENCRYPTING & SENDING...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        TRANSMIT PAYLOAD
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
