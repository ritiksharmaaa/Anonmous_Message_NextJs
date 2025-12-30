import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-zinc-900 mb-4">
            Terms of <span className="text-red-600">Service</span>
          </h1>
          <p className="text-zinc-500">Last updated: December 30, 2025</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-zinc-600 leading-relaxed">
              By accessing and using anonmsg, you accept and agree to be bound by the terms and provision of this agreement. 
              In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable 
              to such services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. User Conduct</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              You agree to use the website only for lawful purposes. You are prohibited from posting on or transmitting through the website any material that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600">
              <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable.</li>
              <li>Encourages conduct that would constitute a criminal offense, give rise to civil liability, or otherwise violate any law.</li>
              <li>Contains a virus or other harmful component.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">3. Intellectual Property</h2>
            <p className="text-zinc-600 leading-relaxed">
              The Site and its original content, features, and functionality are owned by anonmsg and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Termination</h2>
            <p className="text-zinc-600 leading-relaxed">
              We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction of all information associated with you. All provisions of this Agreement that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Changes to This Agreement</h2>
            <p className="text-zinc-600 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms of Service by posting the updated terms on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
