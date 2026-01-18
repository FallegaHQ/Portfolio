import React from 'react';
import {Calendar, Link, MapPin, User} from 'lucide-react';
import type {GitHubProfile} from '@/types';
import {GITHUB_CONFIG} from '@/utils'

interface HeroSectionProps {
    profile: GitHubProfile | null;
    darkMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
                                                            profile,
                                                            darkMode
                                                        }) => {
    const username = profile?.login || GITHUB_CONFIG.USERNAME;

    return (<div className="text-center mb-12">
        <div className="flex items-center justify-center gap-6 text-sm mb-8">

                <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <User size={16}/>
                    {username}
        </span>

            <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Calendar size={16}/>
          Joined {new Date(profile?.created_at ?? "").getFullYear()}
        </span>
            {profile?.location &&
             (<span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <MapPin size={16}/>
                 {profile.location}
          </span>)}

            {profile?.blog && (<a
                href={profile.blog}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
                <Link size={16}/>
                Website
            </a>)}
        </div>
    </div>);
};
