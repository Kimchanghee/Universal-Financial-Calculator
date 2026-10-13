import React from 'react';

export const TERMS_SECTIONS: { title: string; body: string }[] = [
    { title: 'Use of the calculators', body: 'Finora provides free, browser-based financial calculators for general information and education. You may use them for personal, non-commercial purposes. You must not use the site in a way that disrupts it or tries to access it by automated means at a rate that harms other users.' },
    { title: 'Estimates, not advice', body: 'Results are estimates based on the inputs you enter and the simplifying assumptions shown on each page, such as constant rates. They are not financial, tax, legal or investment advice, and real outcomes will differ. Consider speaking to a qualified professional before making financial decisions.' },
    { title: 'No warranty', body: 'The calculators and content are provided "as is" without warranties of accuracy, completeness, availability or fitness for a particular purpose. We work to keep formulas correct and fix confirmed errors, but we do not guarantee that results are error-free.' },
    { title: 'Limitation of liability', body: 'To the extent permitted by law, Finora and its operators are not liable for losses or damages that arise from using or being unable to use the site, or from decisions made based on calculator results.' },
    { title: 'Content and intellectual property', body: 'The text, design and code of this site belong to Finora unless stated otherwise. You may link to the site and briefly quote it with attribution. You may not republish the site wholesale or present it as your own.' },
    { title: 'Third-party links and advertising', body: 'The site may link to third-party websites and may show third-party advertising. We do not control those sites and are not responsible for their content or practices. See the Privacy Policy for how analytics and advertising work.' },
    { title: 'Changes to these terms', body: 'We may update these terms from time to time. The version published on this page applies. Continued use of the site after a change means you accept the updated terms.' },
    { title: 'Contact', body: 'Questions about these terms can be sent to contact@finora.app.' },
];

const TermsOfUse: React.FC = () => (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-200/50 p-8 md:p-10">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Terms of Use</h2>
        <div className="space-y-6 text-slate-700 leading-relaxed">
            {TERMS_SECTIONS.map((s) => (
                <section key={s.title}>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{s.title}</h3>
                    <p className="mb-3">{s.body}</p>
                </section>
            ))}
            <p className="text-sm text-slate-600">Last updated: 2026-10-13</p>
        </div>
    </div>
);

export default TermsOfUse;
