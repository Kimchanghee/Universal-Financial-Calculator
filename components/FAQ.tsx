import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';

const FAQ: React.FC = () => {
    const { t } = useLocalization();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { question: t('faq1Question'), answer: t('faq1Answer') },
        { question: t('faq2Question'), answer: t('faq2Answer') },
        { question: t('faq3Question'), answer: t('faq3Answer') },
        { question: t('faq4Question'), answer: t('faq4Answer') },
        { question: t('faq5Question'), answer: t('faq5Answer') },
        { question: t('faq6Question'), answer: t('faq6Answer') },
        { question: t('faq7Question'), answer: t('faq7Answer') },
        { question: t('faq8Question'), answer: t('faq8Answer') },
        { question: t('faq9Question'), answer: t('faq9Answer') },
        { question: t('faq10Question'), answer: t('faq10Answer') },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-200/50 p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                {t('faqTitle')}
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full text-left p-5 bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 transition-colors flex justify-between items-center"
                        >
                            <span className="font-semibold text-slate-800 pr-4">{faq.question}</span>
                            <span className="text-red-600 text-xl flex-shrink-0">
                                {openIndex === index ? '−' : '+'}
                            </span>
                        </button>
                        {openIndex === index && (
                            <div className="p-5 bg-white border-t border-slate-200">
                                <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <section className="border-t pt-6 mt-8">
                <p className="text-center text-slate-600">
                    {t('faqMoreQuestions')}
                </p>
            </section>
        </div>
    );
};

export default FAQ;
