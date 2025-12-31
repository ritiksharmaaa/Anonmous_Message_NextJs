import Link from 'next/link';
import Logo from '@/components/created/logo';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 dark:bg-surface text-white dark:text-text-primary py-16 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo size="md" variant="dark" />
            <p className="text-zinc-400 dark:text-text-muted text-sm leading-relaxed">
              Privacy isn't a feature, it's the foundation.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white dark:text-text-primary mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-zinc-400 dark:text-text-muted">
              <li><Link href="/dashboard" className="hover:text-brand transition-colors">Dashboard</Link></li>
              <li><Link href="/sign-up" className="hover:text-brand transition-colors">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white dark:text-text-primary mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-zinc-400 dark:text-text-muted">
              <li><Link href="/about" className="hover:text-brand transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white dark:text-text-primary mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-zinc-400 dark:text-text-muted">
              <li><Link href="/privacy-policy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-brand transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 dark:border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 dark:text-text-muted">
          <p>&copy; {new Date().getFullYear()} anonmsg. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/ritiksharmaaa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 dark:text-text-muted hover:text-white dark:hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.652 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.38.202 2.398.099 2.652.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.137 20.19 22 16.436 22 12.012 22 6.484 17.523 2 12 2z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/ritiksharmaaa/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 dark:text-text-muted hover:text-[#0A66C2] transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
