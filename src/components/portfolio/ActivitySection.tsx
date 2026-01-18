import React, {useEffect, useMemo, useState} from 'react';
import {Activity, GitCommit, LineChart, Zap} from 'lucide-react';
import type {GitHubEvent} from '@/types';
import {githubApi} from '@/services';

interface ContributionDay {
    date: string;
    contributionCount: number;
    color: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionsCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}

interface ActivitySectionProps {
    username: string;
    events: GitHubEvent[];
    darkMode: boolean;
}

const CONTRIBUTIONS_QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}
`;

const formatDate = (iso: string) => {
    try {
        return new Date(iso).toLocaleDateString(undefined, {
            year : 'numeric',
            month: 'short',
            day  : 'numeric'
        });
    }
    catch {
        return iso;
    }
};

const isCommitLikeEvent = (e: GitHubEvent) => {
    // Private events are sanitized server-side and may not be PushEvent anymore.
    return e.type === 'PushEvent' || e.type === 'PrivateEvent';
};

const getRecentCommitEvents = (events: GitHubEvent[], username: string, limit = 12) => {
    return events
        .filter(isCommitLikeEvent)
        // Only enforce actor match when actor is present (private events remove it)
        .filter(e => !e.actor?.login || e.actor.login.toLowerCase() === username.toLowerCase())
        .slice(0, limit);
};

const extractRepoDisplayName = (fullName: string) => {
    const parts = fullName.split('/', 2);
    return parts.length === 2 ? parts[1] : fullName;
};

const getCommitCountFromEvent = (event: GitHubEvent): number => {
    const payloadAny = event.payload as unknown as { commits?: unknown[]; size?: number } | undefined;
    if(Array.isArray(payloadAny?.commits)){
        return payloadAny!.commits!.length;
    }
    if(typeof payloadAny?.size === 'number'){
        return payloadAny.size;
    }
    return 1;
};

const getRepoGroupKey = (event: GitHubEvent): string => {
    const repoName = event.repo?.name;
    if(repoName) {
        return repoName;
    }
    const payloadAny = event.payload as unknown as { repository_id?: unknown } | undefined;
    if(typeof payloadAny?.repository_id === 'number' || typeof payloadAny?.repository_id === 'string'){
        return `repo-id:${payloadAny.repository_id}`;
    }
    return 'unknown-repo';
};

const groupCommitEventsByConsecutiveRepo = (commitEvents: GitHubEvent[]) => {
    const groups: Array<{
        id: string;
        repoName: string;
        repoKey: string;
        createdAt: string;
        count: number;
    }> = [];

    for(const e of commitEvents) {
        const repoName = e.repo?.name || 'Private repo';
        const repoKey = getRepoGroupKey(e);
        const count = getCommitCountFromEvent(e);

        const last = groups.length ? groups[groups.length - 1] : null;
        if(last && last.repoKey === repoKey) {
            last.count += count;
            // keep the first event timestamp for the group (timeline start)
            continue;
        }

        groups.push({
            id       : e.id || `${repoKey}-${e.created_at}`,
            repoName,
            repoKey,
            createdAt: e.created_at,
            count
        });
    }

    return groups;
};

export const ActivitySection: React.FC<ActivitySectionProps> = ({
                                                                    username,
                                                                    events,
                                                                    darkMode
                                                                }) => {
    const [calendar, setCalendar] = useState<ContributionsCalendar | null>(null);
    const [calendarError, setCalendarError] = useState<string | null>(null);
    const [showAllCommits, setShowAllCommits] = useState(false);

    useEffect(() => {
                  let cancelled = false;

                  const load = async() => {
                      try {
                          setCalendarError(null);
                          const data = await githubApi.graphql<{
                              data?: {
                                  user?: {
                                      contributionsCollection?: {
                                          contributionCalendar?: ContributionsCalendar;
                                      };
                                  };
                              };
                              errors?: Array<{ message: string }>;
                          }>(CONTRIBUTIONS_QUERY, {login: username});

                          if(cancelled) {
                              return;
                          }

                          if(data.errors?.length) {
                              throw new Error(data.errors[0].message);
                          }

                          const cal = data.data?.user?.contributionsCollection?.contributionCalendar ?? null;
                          setCalendar(cal);
                      }
                      catch(err) {
                          if(cancelled) {
                              return;
                          }
                          setCalendar(null);
                          setCalendarError(err instanceof Error ? err.message : 'Failed to load contributions');
                      }
                  };

                  load();
                  return () => {
                      cancelled = true;
                  };
              },
              [username]);

    const recentCommitEvents = useMemo(() => getRecentCommitEvents(events, username, 12), [events, username]);

    const recentCommitItems = useMemo(() => {
        return groupCommitEventsByConsecutiveRepo(recentCommitEvents);
    }, [recentCommitEvents]);

    const visibleCommitItems = useMemo(() => {
        return showAllCommits ? recentCommitItems : recentCommitItems.slice(0, 4);
    }, [recentCommitItems, showAllCommits]);

    const flattenedDays = useMemo(() => {
        if(!calendar) {
            return [] as ContributionDay[];
        }
        const days: ContributionDay[] = [];
        for(const week of calendar.weeks) {
            for(const day of week.contributionDays) {
                days.push(day);
            }
        }
        return days;
    }, [calendar]);

    const maxCount = useMemo(() => {
        return flattenedDays.reduce((m, d) => Math.max(m, d.contributionCount), 0);
    }, [flattenedDays]);

    const cardClass = `${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-white/30'} backdrop-blur-xl rounded-2xl p-6 border mb-12`;

    return (<section aria-label="Activity overview" className={cardClass}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Activity className="text-emerald-500" aria-hidden="true"/>
            Activity
        </h2>

        <div className="space-y-6">
            <div className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white/30'} rounded-2xl p-5 border`}>
                <div className="flex items-center gap-2 mb-3">
                    <LineChart className="text-purple-500" aria-hidden="true"/>
                    <h3 className="font-semibold">Contribution chart</h3>
                </div>

                {calendar ? (<>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {calendar.totalContributions} contributions in the last year
                    </p>

                    <div className="overflow-x-auto -mx-1 px-1">
                        <div
                            className="grid grid-flow-col auto-cols-max gap-1"
                            role="img"
                            aria-label="GitHub contributions heatmap for the last year"
                        >
                            {calendar.weeks.map((week, wi) => (<div key={wi} className="grid grid-rows-7 gap-1">
                            {week.contributionDays.map((day) => {
                                const intensity = maxCount > 0 ? day.contributionCount / maxCount : 0;
                                const bg = day.contributionCount === 0
                                    ? (darkMode ? 'bg-white/5' : 'bg-gray-200/60')
                                    : '';

                                return (<div
                                    key={day.date}
                                    title={`${day.contributionCount} on ${formatDate(day.date)}`}
                                    className={`w-3 h-3 rounded-sm ${bg}`}
                                    style={day.contributionCount === 0
                                        ? undefined
                                        : {
                                            backgroundColor: day.color,
                                            opacity        : Math.min(1, Math.max(0.35, intensity + 0.15))
                                        }}
                                />);
                            })}
                            </div>))}
                        </div>
                    </div>

                    <p className={`text-xs mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Source: GitHub GraphQL.
                    </p>
                </>) : (<div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                    {calendarError ? `Could not load contributions: ${calendarError}` : 'Loading contributions…'}
                </div>)}
            </div>

            <div className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white/30'} rounded-2xl p-5 border`}>
                <div className="flex items-center gap-2 mb-3">
                    <GitCommit className="text-blue-500" aria-hidden="true"/>
                    <h3 className="font-semibold">Recent commits</h3>
                </div>

                {visibleCommitItems.length > 0 ? (<>
                    <div className="space-y-3">
                        {visibleCommitItems.map((item) => {
                            const repoDisplay = extractRepoDisplayName(item.repoName);
                            return (<div key={item.id} className={`${darkMode ? 'bg-white/5' : 'bg-white/70'} rounded-xl p-3 border ${darkMode ? 'border-white/10' : 'border-white/30'}`}>
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="font-medium truncate">{repoDisplay}</p>
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {formatDate(item.createdAt)} · {item.count} commit{item.count === 1 ? '' : 's'}
                                    </p>
                                </div>
                                <Zap className="shrink-0 text-emerald-500" aria-hidden="true"/>
                            </div>
                            </div>);
                        })}
                    </div>

                    {recentCommitItems.length > 4 && (<div className="mt-4">
                        <button
                            type="button"
                            onClick={() => setShowAllCommits(v => !v)}
                            className={`${darkMode ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-white/80 hover:bg-white text-gray-900'} px-4 py-2 rounded-xl border ${darkMode ? 'border-white/10' : 'border-white/30'} transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${darkMode ? 'focus-visible:ring-offset-gray-950' : 'focus-visible:ring-offset-white'}`}
                            aria-expanded={showAllCommits}
                        >
                            {showAllCommits ? 'Show less' : 'Show more'}
                        </button>
                    </div>)}
                </>) : (<p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    No recent push events found.
                </p>)}

            </div>
        </div>
    </section>);
};
