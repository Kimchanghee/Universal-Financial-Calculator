import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const PrivacyPolicy: React.FC = () => {
    const { t } = useLocalization();

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-200/50 p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                {t('privacyPolicyTitle')}
            </h2>

            <div className="space-y-6 text-slate-700 leading-relaxed">
                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('privacySection1Title')}</h3>
                    <p className="mb-3">{t('privacySection1Content')}</p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('privacySection2Title')}</h3>
                    <p className="mb-3">{t('privacySection2Content')}</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>{t('privacyData1')}</li>
                        <li>{t('privacyData2')}</li>
                        <li>{t('privacyData3')}</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('privacySection3Title')}</h3>
                    <p className="mb-3">{t('privacySection3Content')}</p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('privacySection4Title')}</h3>
                    <p className="mb-3">{t('privacySection4Content')}</p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('privacySection5Title')}</h3>
                    <p className="mb-3">{t('privacySection5Content')}</p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{t('privacySection6Title')}</h3>
                    <p className="mb-3">{t('privacySection6Content')}</p>
                </section>

                <section className="border-t pt-6 mt-6">
                    <p className="text-sm text-slate-600">
                        {t('privacyLastUpdated')}: {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                        {t('privacyContact')}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
