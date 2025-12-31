import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface-muted py-12 px-4 font-sans transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-text-primary mb-4">
            Privacy <span className="text-brand">Policy</span>
          </h1>
          <p className="text-text-muted">Last updated: December 30, 2025</p>
        </div>

        <div className="bg-surface rounded-2xl shadow-sm border border-border-muted p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">1. Introduction</h2>
            <p className="text-text-secondary leading-relaxed">
              Welcome to anonmsg. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">2. Data We Collect</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-text-secondary">
              <li><strong className="text-text-primary">Identity Data:</strong> includes username or similar identifier.</li>
              <li><strong className="text-text-primary">Contact Data:</strong> includes email address.</li>
              <li><strong className="text-text-primary">Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
              <li><strong className="text-text-primary">Usage Data:</strong> includes information about how you use our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">3. How We Use Your Data</h2>
            <p className="text-text-secondary leading-relaxed">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-text-secondary">
              <li>To register you as a new customer.</li>
              <li>To manage our relationship with you.</li>
              <li>To administer and protect our business and this website.</li>
              <li>To deliver relevant website content and advertisements to you.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">4. Data Security</h2>
            <p className="text-text-secondary leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">5. Contact Us</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about this privacy policy or our privacy practices, please contact us at: 
              <a href="mailto:support@anonmsg.com" className="text-brand font-bold hover:underline ml-1">support@anonmsg.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
