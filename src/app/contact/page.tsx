'use client';

import { useState } from 'react';
import Container from "@/app/_components/container";
import { Mail, Globe, ArrowRight, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Min 10 chars';
    
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

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', message: '' });
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
    <main className="min-h-screen bg-[#EAE8E3] text-black selection:bg-[#F4B400] selection:text-black">
      
      {/* 1. BACKGROUND TEXTURE */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* 2. HEADER MODULE */}
      <div className="relative z-10 w-full border-b-4 border-black bg-[#F4F3EF]">
         {/* Ticker */}
         <div className="w-full bg-black text-[#F4F3EF] py-2 overflow-hidden border-b-2 border-black">
            <div className="animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-12">
               <span>/// COMM_LINK: OPEN</span>
               <span>/// ENCRYPTION: NONE</span>
               <span>/// STATUS: LISTENING</span>
               <span>/// COMM_LINK: OPEN</span>
               <span>/// ENCRYPTION: NONE</span>
               <span>/// STATUS: LISTENING</span>
            </div>
         </div>
         <Container>
            <div className="py-16 md:py-24">
                <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter mb-8">
                    Contact<br/>
                    Me!
                </h1>
                <p className="text-xl font-medium border-l-4 border-black pl-6 max-w-2xl leading-relaxed">
                    Establish a connection. Whether for collaboration, inquiry, or transmission of ideas.
                </p>
            </div>
         </Container>
      </div>

      <Container>
        <div className="max-w-[1920px] mx-auto py-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">

                {/* --- LEFT: INFO MODULES --- */}
                <div className="flex flex-col gap-8">
                    
                    {/* Direct Contact Card */}
                    <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                        <div className="flex items-center gap-4 mb-6 border-b-2 border-black pb-4">
                            <div className="w-10 h-10 bg-[#FF3B30] flex items-center justify-center border-2 border-black text-white">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h2 className="font-mono text-sm font-bold uppercase tracking-widest">Direct Line</h2>
                        </div>
                        <a href="mailto:nduatileon@gmail.com" className="text-xl md:text-2xl font-bold uppercase hover:bg-[#FF3B30] hover:text-white transition-colors break-all">
                            nduatileon@gmail.com
                        </a>
                    </div>

                    {/* Social Grid */}
                    <div className="border-4 border-black bg-[#2B4592] p-8 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center gap-4 mb-6 border-b-2 border-white/20 pb-4">
                            <Globe className="w-6 h-6" />
                            <h2 className="font-mono text-sm font-bold uppercase tracking-widest">Network Nodes</h2>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { name: 'X (Twitter)', url: 'https://twitter.com/leonnduati' },
                                { name: 'Instagram', url: 'https://instagram.com/thoughtsofman_' },
                                { name: 'LinkedIn', url: 'https://linkedin.com/in/leonnduati' }
                            ].map(social => (
                                <li key={social.name}>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group hover:text-[#F4B400] transition-colors">
                                        <span className="font-bold uppercase tracking-wide">{social.name}</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Context Info */}
                    <div className="border-4 border-black bg-[#F4F3EF] p-8">
                        <h3 className="font-black uppercase text-2xl mb-4">Transmission Protocols</h3>
                        <ul className="list-disc pl-5 space-y-2 font-mono text-sm uppercase">
                            <li>Collaborations</li>
                            <li>Commissions</li>
                            <li>General Inquiry</li>
                            <li>Feedback Loop</li>
                        </ul>
                        <p className="mt-6 font-mono text-xs border-t-2 border-black pt-4">
                            AVG_RESPONSE_TIME: 24-48 HRS
                        </p>
                    </div>
                </div>

                {/* --- RIGHT: FORM MATRIX --- */}
                <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative">
                    <div className="absolute top-0 right-0 bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-widest">
                        Input_Terminal
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 mt-4">
                        
                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label htmlFor="name" className="block font-mono text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#2B4592]">
                                    Identity [Name]
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full bg-[#F4F3EF] border-2 rounded-none p-4 font-mono text-sm focus:outline-none transition-colors ${
                                        errors.name ? 'border-[#FF3B30] bg-red-50' : 'border-black focus:border-[#2B4592] focus:bg-blue-50'
                                    }`}
                                    placeholder="ENTER_NAME"
                                />
                                {errors.name && <span className="text-[#FF3B30] text-xs font-bold mt-1 block">/// ERROR: NAME_REQUIRED</span>}
                            </div>
                            <div className="group">
                                <label htmlFor="email" className="block font-mono text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#2B4592]">
                                    Return Address [Email]
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full bg-[#F4F3EF] border-2 rounded-none p-4 font-mono text-sm focus:outline-none transition-colors ${
                                        errors.email ? 'border-[#FF3B30] bg-red-50' : 'border-black focus:border-[#2B4592] focus:bg-blue-50'
                                    }`}
                                    placeholder="user@domain.com"
                                />
                                {errors.email && <span className="text-[#FF3B30] text-xs font-bold mt-1 block">/// ERROR: INVALID_EMAIL</span>}
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="group">
                            <label htmlFor="subject" className="block font-mono text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#2B4592]">
                                Topic [Subject]
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className={`w-full bg-[#F4F3EF] border-2 rounded-none p-4 font-mono text-sm focus:outline-none transition-colors ${
                                    errors.subject ? 'border-[#FF3B30] bg-red-50' : 'border-black focus:border-[#2B4592] focus:bg-blue-50'
                                }`}
                                placeholder="SUBJECT_MATTER"
                            />
                             {errors.subject && <span className="text-[#FF3B30] text-xs font-bold mt-1 block">/// ERROR: SUBJECT_REQUIRED</span>}
                        </div>

                        {/* Message */}
                        <div className="group">
                            <label htmlFor="message" className="block font-mono text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#2B4592]">
                                Data Payload [Message]
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                value={formData.message}
                                onChange={handleInputChange}
                                className={`w-full bg-[#F4F3EF] border-2 rounded-none p-4 font-mono text-sm focus:outline-none resize-none transition-colors ${
                                    errors.message ? 'border-[#FF3B30] bg-red-50' : 'border-black focus:border-[#2B4592] focus:bg-blue-50'
                                }`}
                                placeholder="INPUT_DATA..."
                                maxLength={500}
                            ></textarea>
                            <div className="flex justify-between mt-1">
                                {errors.message ? (
                                    <span className="text-[#FF3B30] text-xs font-bold">/// ERROR: CONTENT_REQUIRED</span>
                                ) : (
                                    <span></span>
                                )}
                                <span className="font-mono text-xs text-gray-400">{formData.message.length}/500</span>
                            </div>
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="p-4 bg-[#00FF00]/20 border-2 border-[#009900] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                                <CheckCircle className="text-[#009900]" />
                                <span className="font-bold text-[#009900] uppercase">Transmission Successful. Uplink Terminated.</span>
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="p-4 bg-[#FF3B30]/10 border-2 border-[#FF3B30] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                                <AlertCircle className="text-[#FF3B30]" />
                                <span className="font-bold text-[#FF3B30] uppercase">Transmission Failed. Signal Lost.</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                w-full py-5 bg-black text-white font-black uppercase tracking-[0.2em] text-lg border-2 border-black
                                hover:bg-[#FF3B30] hover:border-[#FF3B30] transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed
                                flex items-center justify-center gap-3
                                shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                            `}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                                    Transmitting...
                                </>
                            ) : (
                                <>
                                    Send Transmission <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

            </div>
        </div>
      </Container>
    </main>
  );
}