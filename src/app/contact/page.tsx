'use client';

import { useState } from 'react';
import Container from "@/app/_components/container";

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
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
    <main className="min-h-screen bg-[var(--background-primary)] transition-colors duration-300">
      <Container>
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-4 text-gray-900 dark:text-white">
            Contact
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
            Let's start a conversation
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
            Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you. Fill out the form below or reach out via email or social media.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Get In Touch
              </h2>
              <p className="text-lg mb-6 text-gray-800 dark:text-gray-200 leading-relaxed">
                I'm always interested in hearing about new projects, opportunities, or just connecting with fellow creatives. 
                Drop me a line and let's discuss how we can work together.
              </p>
            </div>
            {/* FAQ/Encouragement Section */}
            <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-sm mb-6">
              <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Not sure what to say?</h3>
              <ul className="list-disc pl-5 text-[var(--text-secondary)] text-base space-y-1">
                <li>Share your project idea or vision</li>
                <li>Ask about collaboration or commissions</li>
                <li>Request a quote or consultation</li>
                <li>Just say hi or give feedback!</li>
              </ul>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                All messages are welcome. I usually reply within 1-2 business days.
              </p>
            </div>
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="group bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-sm">
                <h3 className="text-xl font-bold mb-3 flex items-center text-gray-900 dark:text-white">
                  <span className="mr-3 text-2xl">📧</span>
                  Email
                </h3>
                <p className="text-lg ml-11">
                  <a 
                    href="mailto:nduatileon@gmail.com" 
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 group-hover:underline"
                  >
                    nduatileon@gmail.com
                  </a>
                </p>
              </div>
              
              <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border-color)] shadow-sm">
                <h3 className="text-xl font-bold mb-3 flex items-center text-gray-900 dark:text-white">
                  <span className="mr-3 text-2xl">🌐</span>
                  Social Media
                </h3>
                <ul className="space-y-3 ml-11">
                  {[
                    { name: 'X (Twitter)', url: 'https://twitter.com/leonnduati', icon: '🐦' },
                    { name: 'Instagram', url: 'https://instagram.com/thoughtsofman_', icon: '📸' },
                    { name: 'LinkedIn', url: 'https://linkedin.com/in/leonnduati', icon: '💼' }
                  ].map((social) => (
                    <li key={social.name}>
                      <a 
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                      >
                        <span className="mr-2">{social.icon}</span>
                        <span className="group-hover:underline">{social.name}</span>
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            
          </div>
          
          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 transition-colors duration-300">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h2>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 rounded-lg animate-fade-in">
                  <div className="flex items-center">
                    <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✅</span>
                    <p className="text-green-900 dark:text-green-300 font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg animate-fade-in">
                  <div className="flex items-center">
                    <span className="text-red-600 dark:text-red-400 mr-3 text-xl">❌</span>
                    <p className="text-red-900 dark:text-red-300 font-medium">
                      Failed to send message. Please try again or email me directly.
                    </p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-slate-700 dark:text-white ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-slate-600 focus:ring-blue-500'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-slate-700 dark:text-white ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-slate-600 focus:ring-blue-500'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-slate-700 dark:text-white ${
                      errors.subject 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-slate-600 focus:ring-blue-500'
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                      {errors.subject}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none dark:bg-slate-700 dark:text-white ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-slate-600 focus:ring-blue-500'
                    }`}
                    placeholder="Tell me about your project, idea, or just say hello!"
                    maxLength={500}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fade-in">
                      {errors.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formData.message.length}/500 characters
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-200 transform flex items-center justify-center
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}
                    bg-black border border-black text-white
                    hover:bg-gray-900 hover:text-white
                    dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-100 dark:hover:text-black
                    theme-metallic:bg-white theme-metallic:text-black theme-metallic:hover:bg-black theme-metallic:hover:text-white
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="ml-2">✨</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.2s both;
        }
      `}</style>
    </main>
  );
}