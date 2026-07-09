"use client";

import { useState } from 'react';
import Container from "@/app/_components/container";
import { Mail, Globe, ArrowRight, Send, CheckCircle, AlertCircle, MessageSquare, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import ScrollReveal from "@/app/_components/ScrollReveal";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot field to catch bots
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', message: '', website: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Identity required';
    if (!formData.email.trim()) newErrors.email = 'Endpoint required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid protocol';
    if (!formData.subject.trim()) newErrors.subject = 'Topic required';
    if (!formData.message.trim()) newErrors.message = 'Payload required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Incomplete data';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (formData.website) {
      setIsSubmitting(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        setSubmitStatus('success');
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pb-32">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] md:h-[85vh] flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 pointer-events-none bg-background-primary" />

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="block w-8 md:w-12 h-[1px] bg-accent-blue opacity-50"></span>
                    <span className="text-accent-blue font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">Get in Touch</span>
                 </div>
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6">Connect</h1>
                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-lg md:text-3xl font-mono text-secondary">
                   <span>/kəˈnɛkt/</span>
                   <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/50"></span>
                   <span>verb</span>
                 </div>
              </div>
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-5xl font-light text-primary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                1. To establish a communication link. 2. Reaching out for collaboration and creative impact.
              </ScrollReveal>
            </div>

            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-8 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-accent-blue/5 blur-3xl rounded-full opacity-60"></div>
                  <Image src="/assets/LN Portfolio Asset Figurine Hero Stance.png" alt="" fill className="object-contain z-10 transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_10px_40px_rgba(0,0,0,0.3)]" priority />
               </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 mt-8 lg:-mt-20 !max-w-none px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-1 space-y-8 md:space-y-12">
                <div className="group relative bg-white/[0.02] border border-white/5 p-6 sm:p-10 md:p-12 rounded-sm overflow-hidden hover:border-accent-blue/30 transition-all duration-500">
                    <div className="absolute top-2 right-4 font-mono text-xs md:text-sm opacity-10 uppercase tracking-widest">Email</div>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-accent-blue/10 text-accent-blue mb-8 md:mb-10 flex items-center justify-center border border-accent-blue/20"><Mail size={24} /></div>
                    <h2 className="text-sm md:text-base font-medium uppercase tracking-[0.4em] text-secondary mb-3 md:mb-4">Primary Email</h2>
                    <a href="mailto:nduatileon@gmail.com" className="text-2xl md:text-3xl font-light uppercase tracking-tighter hover:text-accent-blue transition-colors break-all">nduatileon@gmail.com</a>
                </div>

                <div className="group relative bg-white/[0.02] border border-white/5 p-6 sm:p-10 md:p-12 rounded-sm overflow-hidden hover:border-accent-blue/30 transition-all duration-500">
                    <div className="absolute top-2 right-4 font-mono text-xs md:text-sm opacity-10 uppercase tracking-widest">Social Media</div>
                    <h2 className="text-sm md:text-base font-medium uppercase tracking-[0.4em] text-secondary mb-8 md:mb-10">Follow My Work</h2>
                    <ul className="space-y-6 md:space-y-8">
                        {[{ name: 'X', url: 'https://x.com/leonnduati' }, { name: 'Instagram', url: 'https://instagram.com/thoughtsofman_' }, { name: 'LinkedIn', url: 'https://linkedin.com/in/leonnduati' }].map(social => (
                            <li key={social.name}><a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group/link hover:text-accent-blue transition-colors"><span className="font-medium text-lg md:text-xl uppercase tracking-widest">{social.name}</span><ArrowRight size={20} className="opacity-20 group-hover/link:opacity-100 group-hover/link:translate-x-2 transition-all" /></a></li>
                        ))}
                    </ul>
                </div>

                <div className="p-6 sm:p-10 md:p-12 rounded-sm bg-accent-blue/[0.03] border border-accent-blue/10 flex flex-col gap-6 md:gap-8">
                    <div className="flex justify-between items-center font-mono text-sm md:text-base uppercase tracking-widest"><span className="opacity-40">Current Status</span><span className="text-green-500 font-medium">Open for Inquiries</span></div>
                    <p className="text-secondary font-medium text-lg md:text-xl leading-relaxed opacity-80">Whether you're looking to collaborate or have any inquiries, feel free to reach out.</p>
                    <div className="h-px w-full bg-accent-blue/10 relative overflow-hidden"><motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 h-full w-1/4 bg-accent-blue/40" /></div>
                </div>
            </div>

            <div className="lg:col-span-2">
                <div className="group relative bg-white/[0.02] border border-white/5 p-6 sm:p-10 md:p-20 rounded-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.03]">
                    <div className="absolute top-6 right-10 font-mono text-xs md:text-sm opacity-10 uppercase tracking-widest">Contact Form</div>
                    <form onSubmit={handleSubmit} className="space-y-10 md:space-y-16 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                            <div className="space-y-3 md:space-y-4">
                                <span className="text-sm md:text-base font-medium uppercase tracking-widest opacity-40">Your Name</span>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 p-3 font-light uppercase tracking-tighter text-xl sm:text-2xl md:text-4xl focus:outline-none focus:border-accent-blue transition-colors placeholder:text-primary/30" placeholder="LEON NDUATI" />
                            </div>
                            <div className="space-y-3 md:space-y-4">
                                <span className="text-sm md:text-base font-medium uppercase tracking-widest opacity-40">Your Email</span>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 p-3 font-light uppercase tracking-tighter text-xl sm:text-2xl md:text-4xl focus:outline-none focus:border-accent-blue transition-colors placeholder:text-primary/30" placeholder="NAME@EXAMPLE.COM" />
                            </div>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                            <span className="text-sm md:text-base font-medium uppercase tracking-widest opacity-40">Subject</span>
                            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/10 p-3 font-light uppercase tracking-tighter text-xl sm:text-2xl md:text-4xl focus:outline-none focus:border-accent-blue transition-colors placeholder:text-primary/30" placeholder="Add your Collaboration Inquiry here" />
                        </div>
                        <div className="space-y-3 md:space-y-4">
                            <span className="text-sm md:text-base font-medium uppercase tracking-widest opacity-40">Your Message</span>
                            <textarea name="message" rows={4} value={formData.message} onChange={handleInputChange} className="w-full bg-transparent border border-white/10 p-4 sm:p-6 md:p-8 font-light uppercase text-base sm:text-lg md:text-2xl focus:outline-none focus:border-accent-blue transition-colors resize-none rounded-sm placeholder:text-primary/30" placeholder="What would you like to discuss?" maxLength={500}></textarea>
                            <div className="flex justify-between mt-2 md:mt-4"><span className="text-red-500 text-sm md:text-base font-medium uppercase tracking-widest">{errors.message || ''}</span><span className="font-mono text-xs sm:text-sm opacity-30">{formData.message.length}/500_BYTES</span></div>
                        </div>
                        <div className="absolute opacity-0 -z-10 h-0 w-0 overflow-hidden"><input type="text" name="website" value={formData.website} onChange={handleInputChange} tabIndex={-1} autoComplete="off" /></div>
                        <div className="space-y-8 md:space-y-12">
                            {submitStatus === 'success' && <div className="p-4 sm:p-6 md:p-8 rounded-sm bg-green-500/5 border border-green-500/20 flex items-center gap-4 md:gap-6 animate-in fade-in"><CheckCircle className="text-green-500" size={24} /><span className="font-medium text-green-500 text-xs sm:text-sm md:text-lg uppercase tracking-[0.2em]">Message Sent.</span></div>}
                            <button type="submit" disabled={isSubmitting} className="group/submit w-full flex items-center justify-center gap-4 sm:gap-6 md:gap-10 py-4 sm:py-6 md:py-8 rounded-sm bg-primary text-background-primary transition-all duration-500 hover:gap-12 sm:hover:gap-16 disabled:opacity-50">
                                {isSubmitting ? <><span className="animate-spin block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-3 border-background-primary border-t-transparent rounded-full"></span><span className="font-medium text-xs sm:text-sm md:text-xl uppercase tracking-[0.4em]">Sending...</span></> : <><span className="font-medium text-xs sm:text-sm md:text-xl uppercase tracking-[0.4em]">Send Message</span><div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-background-primary/20 flex items-center justify-center group-hover/submit:translate-x-3 transition-transform"><Send size={18} /></div></>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </Container>
    </main>
  );
}
