import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export default function ContactPage() {
  return (
    <main>
      <Container>
        <Header />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          Contact
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg mb-6">
              I'm always interested in hearing about new projects, opportunities, or just connecting with fellow creatives.
            </p>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-lg">
                <a href="mailto:hello@yourdomain.com" className="hover:underline">
                  nduatileon@gmail.com
                </a>
              </p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Social Media</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://twitter.com/leonnduati" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:underline"
                  >
                    X
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com/thoughtsofman_" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:underline"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="https://linkedin.com/in/leonnduati" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-neutral-100 dark:bg-slate-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-4 duration-200 transition-colors"
              >
                Send Message
              </button>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Note: This is a demo form and doesn't actually send messages yet. I'll get to working on the implementation for this soon!
              </p>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
}
