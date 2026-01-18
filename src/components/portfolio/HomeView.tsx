import React from 'react';
import type {ProfileData} from '@/types';
import {CONTACT} from '@/utils';

interface HomeViewProps {
    profileData: ProfileData;
    darkMode: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
                                                      profileData,
                                                      darkMode
                                                  }) => {
    return (<div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Hire Me</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                Available for freelance projects and full-time roles (Laravel, Symfony, React, Angular). Choose the type of collaboration that fits your needs.
            </p>
        </div>

        <div className="prose prose-lg max-w-3xl mx-auto mb-10">
            <div
                className={`${darkMode ? 'bg-white/5' : 'bg-white/50'} backdrop-blur-xl rounded-2xl p-6 border ${darkMode ? 'border-white/10' : 'border-white/30'}`}>
                <h3 className="text-xl font-semibold mb-4">Who am I?</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {profileData.personalInfo.summary}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className={`${darkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-white/60 border-white/30 text-gray-800'} backdrop-blur-xl rounded-2xl p-5 border`}>
                <p className="text-sm opacity-80">Response time</p>
                <p className="text-base font-semibold">Replies within 24h</p>
            </div>

            <div className={`${darkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-white/60 border-white/30 text-gray-800'} backdrop-blur-xl rounded-2xl p-5 border`}>
                <p className="text-sm opacity-80">Availability</p>
                <p className="text-base font-semibold">Available: Feb 2026</p>
            </div>

            <div className={`${darkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-white/60 border-white/30 text-gray-800'} backdrop-blur-xl rounded-2xl p-5 border`}>
                <p className="text-sm opacity-80">Engagement</p>
                <p className="text-base font-semibold">Project · Retainer · Full-time</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/30'} backdrop-blur-xl rounded-2xl p-8 border flex flex-col`}>
                <h3 className="text-xl font-semibold mb-2">Freelance · MVP</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    Build an MVP or a feature fast. Ideal for startups and teams who need execution.
                </p>
                <div className="space-y-2 mb-6 text-sm">
                    <p><span className="font-semibold">Includes:</span> planning, implementation, deployment support</p>
                    <p><span className="font-semibold">Best for:</span> new features, prototypes, internal tools</p>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                    <a
                        href={CONTACT.WHATSAPP_CHAT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-300 text-center"
                    >
                        WhatsApp (chat / call)
                    </a>
                </div>
            </div>

            <div className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/30'} backdrop-blur-xl rounded-2xl p-8 border flex flex-col relative`}> 
                <span className="absolute -top-3 -right-3 text-xs px-3 py-1 rounded-full bg-blue-600 text-white border border-white/20">
                    Most Requested
                </span>
                <h3 className="text-xl font-semibold mb-2">Freelance · Maintenance</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    Keep your product healthy: fixes, improvements, performance, and ongoing delivery.
                </p>
                <div className="space-y-2 mb-6 text-sm">
                    <p><span className="font-semibold">Includes:</span> bugfixes, refactors, performance, SEO</p>
                    <p><span className="font-semibold">Best for:</span> existing apps, long-term collaboration</p>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                    <a
                        href={CONTACT.WHATSAPP_CHAT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-300 text-center"
                    >
                        WhatsApp (chat / call)
                    </a>
                </div>
            </div>

            <div className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/30'} backdrop-blur-xl rounded-2xl p-8 border flex flex-col`}>
                <h3 className="text-xl font-semibold mb-2">Full-time</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    Join your team full-time as a Senior Full-Stack Developer or Team Lead.
                </p>
                <div className="space-y-2 mb-6 text-sm">
                    <p><span className="font-semibold">Focus:</span> backend + frontend, delivery, mentoring</p>
                    <p><span className="font-semibold">Stack:</span> Laravel, Symfony, React, Angular</p>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                    <a
                        href={CONTACT.WHATSAPP_CHAT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-300 text-center"
                    >
                        WhatsApp (chat / call)
                    </a>
                    <a
                        href={`mailto:${profileData.personalInfo.email}`}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300 text-center"
                    >
                        Email
                    </a>
                </div>
            </div>
        </div>
    </div>);
};
