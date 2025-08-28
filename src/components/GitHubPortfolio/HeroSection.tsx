import React from 'react';
import {Calendar, Link, MapPin} from 'lucide-react';
import type {GitHubProfile} from '../../types/GitHubProfile';
import {Avatar} from '../ui';

interface HeroSectionProps {
    profile: GitHubProfile | null;
    cachedAvatarUrl: string | null;
    darkMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
                                                            profile,
                                                            cachedAvatarUrl,
                                                            darkMode
                                                        }) => {
    const username = profile?.login || 'FallegaHQ';

    return (<div className="text-center mb-12">
            <div className="relative inline-block mb-6">
                <Avatar
                    src={cachedAvatarUrl}
                    alt="Profile"
                    size="large"
                    darkMode={darkMode}
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"/>
            </div>

            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {profile?.name || username}
            </h1>

            <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {profile?.bio || 'Passionate Developer & Problem Solver'}
            </p>

            <div className="flex items-center justify-center gap-6 text-sm mb-8">
                {profile?.location &&
                 (<span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <MapPin size={16}/>
                         {profile.location}
          </span>)}

                <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Calendar size={16}/>
          Joined {new Date(profile?.created_at ?? "").getFullYear()}
        </span>

                {profile?.blog && (<a
                        href={profile.blog}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
                    >
                        <Link size={16}/>
                        Website
                    </a>)}
            </div>

            <div className="prose prose-lg max-w-3xl mx-auto">
                <div
                    className={`${darkMode ? 'bg-white/5' : 'bg-white/50'} backdrop-blur-xl rounded-2xl p-6 border ${darkMode ? 'border-white/10' : 'border-white/30'}`}>
                    <h3 className="text-xl font-semibold mb-4">About Me</h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Seasoned Software Developer with over a decade of experience in architecting,
                        developing, and deploying robust applications across web and mobile platforms.
                        Committed to engineering excellence with a focus on writing clean, scalable,
                        and reusable code. Adept at collaborating with cross-functional teams and
                        clients to deliver state-of-the-art solutions. Proven mentor with experience
                        in training teams on emerging technologies and best practices.
                    </p>
                </div>
            </div>
        </div>);
};
