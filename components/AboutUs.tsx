import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const AboutUs: React.FC = () => {
    const { t } = useLocalization();

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-200/50 p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                {t('aboutUsTitle')}
            </h2>

            <div className="space-y-6 text-slate-700 leading-relaxed">
                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('aboutMissionTitle')}</h3>
                    <p className="mb-3">{t('aboutMissionContent')}</p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('aboutWhatWeOfferTitle')}</h3>
                    <p className="mb-3">{t('aboutWhatWeOfferContent')}</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>{t('aboutFeature1')}</li>
                        <li>{t('aboutFeature2')}</li>
                        <li>{t('aboutFeature3')}</li>
                        <li>{t('aboutFeature4')}</li>
                        <li>{t('aboutFeature5')}</li>
                        <li>{t('aboutFeature6')}</li>
                        <li>{t('aboutFeature7')}</li>
                        <li>{t('aboutFeature8')}</li>
                        <li>{t('aboutFeature9')}</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('aboutWhyChooseTitle')}</h3>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li><strong>{t('aboutBenefit1Title')}:</strong> {t('aboutBenefit1Content')}</li>
                        <li><strong>{t('aboutBenefit2Title')}:</strong> {t('aboutBenefit2Content')}</li>
                        <li><strong>{t('aboutBenefit3Title')}:</strong> {t('aboutBenefit3Content')}</li>
                        <li><strong>{t('aboutBenefit4Title')}:</strong> {t('aboutBenefit4Content')}</li>
                        <li><strong>{t('aboutBenefit5Title')}:</strong> {t('aboutBenefit5Content')}</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('aboutTeamTitle')}</h3>
                    <p className="mb-3">{t('aboutTeamContent')}</p>
                </section>

                <section className="border-t pt-6 mt-6">
                    <p className="text-center text-slate-600 italic">
                        {t('aboutClosing')}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
