import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const ContactUs: React.FC = () => {
    const { t } = useLocalization();

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-200/50 p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                {t('contactUsTitle')}
            </h2>

            <div className="space-y-6 text-slate-700 leading-relaxed">
                <section>
                    <p className="mb-6 text-lg">{t('contactIntro')}</p>
                </section>

                <section className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-100">
                    <h3 className="text-xl font-semibold mb-4 text-slate-800">{t('contactInfoTitle')}</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📧</span>
                            <div>
                                <p className="font-semibold text-slate-700">{t('contactEmail')}</p>
                                <a href="mailto:contact@finora.app" className="text-red-600 hover:text-rose-700 underline">
                                    contact@finora.app
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🌐</span>
                            <div>
                                <p className="font-semibold text-slate-700">{t('contactWebsite')}</p>
                                <a href="https://finora.app" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-rose-700 underline">
                                    finora.app
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">💼</span>
                            <div>
                                <p className="font-semibold text-slate-700">{t('contactBusiness')}</p>
                                <a href="mailto:business@finora.app" className="text-red-600 hover:text-rose-700 underline">
                                    business@finora.app
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-4 text-slate-800">{t('contactHoursTitle')}</h3>
                    <p className="mb-2">{t('contactHoursContent')}</p>
                    <p className="text-sm text-slate-600">{t('contactResponseTime')}</p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-4 text-slate-800">{t('contactFeedbackTitle')}</h3>
                    <p className="mb-3">{t('contactFeedbackContent')}</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>{t('contactFeedback1')}</li>
                        <li>{t('contactFeedback2')}</li>
                        <li>{t('contactFeedback3')}</li>
                        <li>{t('contactFeedback4')}</li>
                    </ul>
                </section>

                <section className="border-t pt-6 mt-6">
                    <p className="text-center text-slate-600 italic">
                        {t('contactClosing')}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ContactUs;
