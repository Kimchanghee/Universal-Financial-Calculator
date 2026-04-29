import React from 'react';

const guides = [
    {
        href: '/guides/compound-interest-formula.html',
        title: 'Compound interest formula',
        description: 'Future value formula with principal, rate, time, compounding, and monthly deposits.',
    },
    {
        href: '/guides/roi-formula.html',
        title: 'ROI formula',
        description: 'Return on investment formula for profit, cost, and percentage return.',
    },
    {
        href: '/guides/loan-payment-formula.html',
        title: 'Loan payment formula',
        description: 'Monthly payment, total repayment, and interest cost calculation guide.',
    },
    {
        href: '/guides/retirement-savings-goal.html',
        title: 'Retirement savings goal',
        description: 'Estimate the savings target and monthly contribution needed for retirement.',
    },
    {
        href: '/guides/inflation-purchasing-power.html',
        title: 'Inflation purchasing power',
        description: 'Estimate how inflation changes the real value of money over time.',
    },
];

const answers = [
    {
        question: 'How do I calculate compound interest?',
        answer:
            'Use future value from principal, periodic rate, compounding frequency, time, and optional monthly contributions.',
    },
    {
        question: 'How do I calculate ROI?',
        answer:
            'Subtract investment cost from final value, divide by cost, then multiply by 100 to get ROI percentage.',
    },
    {
        question: 'How do I calculate a loan payment?',
        answer:
            'Use loan amount, periodic interest rate, and number of payments to estimate the fixed monthly payment.',
    },
];

const ExposureLinks: React.FC = () => (
    <section
        className="mt-8 rounded-2xl border border-slate-200 bg-white/90 p-6 text-left shadow-lg"
        aria-labelledby="financial-answer-guides-title"
    >
        <h2 id="financial-answer-guides-title" className="text-xl font-bold text-slate-900">
            Financial calculator answer guides
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
            Crawlable formula pages for search engines and AI answer systems that need direct
            explanations before opening the interactive calculator.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
            {guides.map(guide => (
                <a
                    key={guide.href}
                    href={guide.href}
                    className="block rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-red-300 hover:bg-red-50"
                >
                    <span className="text-sm font-semibold text-red-700">{guide.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-600">{guide.description}</span>
                </a>
            ))}
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {answers.map(item => (
                <article key={item.question} className="rounded-xl border border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{item.answer}</p>
                </article>
            ))}
        </div>
    </section>
);

export default ExposureLinks;
