"use client";

import { useState } from 'react';
import Container from "@/app/_components/container";
import { Mail, Globe, ArrowRight, ArrowUpRight, Send, CheckCircle, AlertCircle, MessageSquare, ExternalLink } from 'lucide-react';
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
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) newErrors.email = 'Please provide your email address';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Please add a subject';
    if (!formData.message.trim()) newErrors.message = 'Please provide a message';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
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
    <main className="min-h-screen pb-32 bg-background-primary relative selection:bg-accent-blue/30 font-noto-display-condensed">
      
      {/* Background layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background-primary" />

      {/* --- HERO SECTION: DICTIONARY ENTRY --- */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] md:h-[85vh] flex flex-col justify-center overflow-hidden pt-16 pb-4 md:pt-20">
        <div className="absolute inset-0 z-0 pointer-events-none bg-background-primary" />

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            {/* Left: Dictionary Text */}
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="block w-8 md:w-12 h-[1px] bg-accent-blue opacity-50"></span>
                    <span className="text-accent-blue font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">Get in Touch</span>
                 </div>
                 
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6 uppercase text-primary">
                   Connect
                 </h1>
                 
                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-lg md:text-3xl font-mono text-secondary">
                   <span>/kəˈnɛkt/</span>
                   <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent-blue/50"></span>
                   <span>verb</span>
                 </div>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-5xl font-light text-primary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                1. To establish a communication link. 2. Reaching out for collaboration, inquiries, and creative impact.
              </ScrollReveal>

              <div className="mt-12 md:mt-24 flex flex-wrap gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <a href="#contact-form" className="px-10 md:px-12 py-3 md:py-4 rounded-full font-medium text-xs md:text-sm uppercase tracking-widest transition-all bg-primary text-background-primary shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3">
                   <span>Send a Message</span>
                   <ArrowRight size={16} />
                </a>
                <a href="mailto:nduatileon@gmail.com" className="px-10 md:px-12 py-3 md:py-4 rounded-full liquid-glass-clear font-medium text-xs md:text-sm uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-105 active:scale-95 text-primary flex items-center gap-2">
                   <span>Direct Email</span>
                   <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Right: Figurine Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-4 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-accent-blue/5 blur-3xl rounded-full opacity-60"></div>
                  <Image 
                    src="/assets/LN Portfolio Asset Figurine Hero Stance.webp" 
                    alt="Contact Figurine" 
                    fill 
                    sizes="(max-width: 768px) 300px, 600px" 
                    className="object-contain z-10 transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_20px_80px_rgba(0,0,0,0.4)]" 
                    priority 
                  />
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- CONTENT FORM & INFO --- */}
      <div id="contact-form" className="scroll-mt-24">
        <Container className="relative z-10 !max-w-none px-6 md:px-20 mt-12 md:mt-20">
          
          {/* Section Header */}
          <div className="relative mb-10 md:mb-16 rounded-2xl overflow-hidden p-6 md:p-8 bg-primary/[0.02] backdrop-blur-md shadow-lg border border-primary/5">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"></div>
             
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                       <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">Transmission Portal</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/40"></span>
                       <span className="text-secondary opacity-50 font-mono text-[10px] uppercase tracking-wider">Direct Access</span>
                   </div>
                   <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter leading-none text-primary">Inquiries & Dialogue</h2>
                   <p className="text-secondary text-sm md:text-base mt-2 max-w-xl opacity-60">Open for engineering collaborations, creative direction, music inquiries, and dialogue.</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-1 space-y-6 md:space-y-8">
                  {/* Email Card */}
                  <div className="group relative bg-primary/[0.02] hover:bg-primary/[0.04] border border-primary/5 p-6 sm:p-8 md:p-10 rounded-2xl overflow-hidden hover:border-accent-blue/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
                      <div className="absolute top-3 right-4 font-mono text-[10px] opacity-20 uppercase tracking-widest text-secondary">Email</div>
                      <div className="w-12 h-12 rounded-xl bg-accent-blue/10 text-accent-blue mb-6 flex items-center justify-center border border-accent-blue/20">
                        <Mail size={22} />
                      </div>
                      <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-accent-blue mb-2">Primary Email</h3>
                      <a href="mailto:nduatileon@gmail.com" className="text-xl sm:text-2xl font-light uppercase tracking-tight hover:text-accent-blue transition-colors break-all text-primary">
                        nduatileon@gmail.com
                      </a>
                  </div>

                  {/* Social Media Card */}
                  <div className="group relative bg-primary/[0.02] hover:bg-primary/[0.04] border border-primary/5 p-6 sm:p-8 md:p-10 rounded-2xl overflow-hidden hover:border-accent-blue/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
                      <div className="absolute top-3 right-4 font-mono text-[10px] opacity-20 uppercase tracking-widest text-secondary">Online</div>
                      <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-accent-blue mb-6">Follow My Work</h3>
                      <ul className="space-y-4 md:space-y-6">
                          {[
                            { name: 'X / Twitter', url: 'https://x.com/leonnduati' }, 
                            { name: 'Instagram', url: 'https://instagram.com/thoughtsofman_' }, 
                            { name: 'LinkedIn', url: 'https://linkedin.com/in/leonnduati' },
                            { name: 'GitHub', url: 'https://github.com/git2mann' }
                          ].map(social => (
                              <li key={social.name}>
                                <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group/link hover:text-accent-blue transition-colors text-primary/80">
                                  <span className="font-light text-base md:text-lg uppercase tracking-wider">{social.name}</span>
                                  <ArrowUpRight size={16} className="opacity-40 group-hover/link:opacity-100 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
                                </a>
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* Status Card */}
                  <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-accent-blue/[0.03] border border-accent-blue/15 flex flex-col gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                      <div className="flex justify-between items-center font-mono text-xs uppercase tracking-wider">
                        <span className="opacity-50 text-secondary">Current Status</span>
                        <span className="text-emerald-500 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Open for Inquiries
                        </span>
                      </div>
                      <p className="text-secondary text-sm md:text-base leading-relaxed opacity-80">
                        Whether you're looking to collaborate on a system, commission artwork, or discuss music, feel free to reach out.
                      </p>
                      <div className="h-px w-full bg-accent-blue/15 relative overflow-hidden">
                        <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 h-full w-1/4 bg-accent-blue/50" />
                      </div>
                  </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                  <div className="group relative bg-primary/[0.02] border border-primary/5 p-6 sm:p-10 md:p-14 lg:p-16 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md">
                      <div className="absolute top-4 right-6 font-mono text-[10px] opacity-20 uppercase tracking-widest text-secondary">Contact Form</div>
                      
                      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12 relative z-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                              <div className="space-y-2">
                                  <label className="block text-xs font-mono uppercase tracking-[0.2em] text-accent-blue">Your Name</label>
                                  <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    className="w-full bg-transparent border-b border-primary/10 py-3 font-light uppercase tracking-tight text-xl md:text-2xl focus:outline-none focus:border-accent-blue transition-colors placeholder:text-primary/20 text-primary" 
                                    placeholder="Leon Nduati" 
                                  />
                                  {errors.name && <p className="text-red-400 text-xs font-mono uppercase tracking-wider mt-1">{errors.name}</p>}
                              </div>
                              <div className="space-y-2">
                                  <label className="block text-xs font-mono uppercase tracking-[0.2em] text-accent-blue">Your Email</label>
                                  <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    className="w-full bg-transparent border-b border-primary/10 py-3 font-light uppercase tracking-tight text-xl md:text-2xl focus:outline-none focus:border-accent-blue transition-colors placeholder:text-primary/20 text-primary" 
                                    placeholder="name@example.com" 
                                  />
                                  {errors.email && <p className="text-red-400 text-xs font-mono uppercase tracking-wider mt-1">{errors.email}</p>}
                              </div>
                          </div>
                          
                          <div className="space-y-2">
                              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-accent-blue">Subject</label>
                              <input 
                                type="text" 
                                name="subject" 
                                value={formData.subject} 
                                onChange={handleInputChange} 
                                className="w-full bg-transparent border-b border-primary/10 py-3 font-light uppercase tracking-tight text-xl md:text-2xl focus:outline-none focus:border-accent-blue transition-colors placeholder:text-primary/20 text-primary" 
                                placeholder="Collaboration or project inquiry" 
                              />
                              {errors.subject && <p className="text-red-400 text-xs font-mono uppercase tracking-wider mt-1">{errors.subject}</p>}
                          </div>
                          
                          <div className="space-y-2">
                              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-accent-blue">Your Message</label>
                              <textarea 
                                name="message" 
                                rows={5} 
                                value={formData.message} 
                                onChange={handleInputChange} 
                                className="w-full bg-primary/[0.01] border border-primary/10 p-4 md:p-6 font-light uppercase text-base md:text-lg focus:outline-none focus:border-accent-blue transition-colors resize-none rounded-xl placeholder:text-primary/20 text-primary" 
                                placeholder="What would you like to discuss?" 
                                maxLength={500}
                              ></textarea>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-red-400 text-xs font-mono uppercase tracking-wider">{errors.message || ''}</span>
                                <span className="font-mono text-xs text-secondary/40">{formData.message.length} / 500 characters</span>
                              </div>
                          </div>
                          
                          {/* Bot honeypot */}
                          <div className="absolute opacity-0 -z-10 h-0 w-0 overflow-hidden">
                            <input type="text" name="website" value={formData.website} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                          </div>
                          
                          <div className="space-y-6 pt-2">
                              {submitStatus === 'success' && (
                                <div className="p-4 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4 animate-in fade-in">
                                  <CheckCircle className="text-emerald-500" size={22} />
                                  <span className="font-medium text-emerald-500 text-xs sm:text-sm uppercase tracking-widest">Message successfully sent. I will get back to you soon.</span>
                                </div>
                              )}
                              
                              {submitStatus === 'error' && (
                                <div className="p-4 sm:p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-4 animate-in fade-in">
                                  <AlertCircle className="text-red-500" size={22} />
                                  <span className="font-medium text-red-500 text-xs sm:text-sm uppercase tracking-widest">Failed to send message. Please try emailing directly.</span>
                                </div>
                              )}
                              
                              <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="w-full flex items-center justify-center gap-4 py-4 sm:py-5 rounded-full bg-primary text-background-primary transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl disabled:opacity-50 cursor-pointer font-medium text-xs sm:text-sm uppercase tracking-[0.3em]"
                              >
                                  {isSubmitting ? (
                                    <>
                                      <span className="animate-spin block w-5 h-5 border-2 border-background-primary border-t-transparent rounded-full"></span>
                                      <span>Sending...</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>Send Message</span>
                                      <Send size={16} />
                                    </>
                                  )}
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
