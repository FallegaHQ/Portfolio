import React from 'react';
import {ExternalLink, Github, Phone} from 'lucide-react';
import {CONTACT} from '@/utils'
import type {GitHubProfile} from '@/types'

interface ContactSectionProps {
    username: string;
    profile: GitHubProfile | null;
    darkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
                                                                  username,
                                                                  profile,
                                                                  darkMode
                                                              }) => {
    return (<div
        className={`${darkMode ? 'bg-white/5' : 'bg-white/50'} backdrop-blur-xl rounded-2xl p-8 border ${darkMode ? 'border-white/10' : 'border-white/30'} text-center`}>
        <h2 className="text-2xl font-bold mb-4">Let's Connect!</h2>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Interested in collaborating or have a project in mind? Let's build something amazing together!
        </p>
        <div className="flex justify-center gap-4">
            <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-colors duration-300 flex items-center gap-2"
            >
                <Github size={20}/>
                GitHub
            </a>
            {profile?.blog && (<a
                href={profile.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300 flex items-center gap-2"
            >
                <ExternalLink size={20}/>
                Website
            </a>)}
            <a
                href={CONTACT.SKYPE_CALL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white rounded-xl transition-colors duration-300 flex items-center gap-2"
            >
                <Phone size={20}/>
                Call me now!
            </a>
        </div>
    </div>);
};
