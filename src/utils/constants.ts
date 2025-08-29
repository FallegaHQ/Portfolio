export const GITHUB_CONFIG = {
    USERNAME                   : 'FallegaHQ',
    REPOS_PER_PAGE             : 100,
    FEATURED_REPOS_LIMIT       : 6,
    TOP_LANGUAGES_LIMIT        : 8,
    LANGUAGE_DIALOG_REPOS_LIMIT: 5,
} as const;

export const CACHE_CONFIG = {
    AVATAR_DURATION: 24 * 60 * 60 * 1000, // 24 hours
    PREFIX         : 'github_portfolio_',
} as const;

export const THEME_CONFIG = {
    STORAGE_KEY: 'github-portfolio-theme',
    DARK       : 'dark',
    LIGHT      : 'light',
} as const;

export const CONTACT = {
    SKYPE_CALL_LINK: 'https://call.whatsapp.com/video/L1nOl9rdGXkpC4vC3fEnLW'
}
