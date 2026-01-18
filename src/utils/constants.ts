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
    WHATSAPP_CHAT_LINK: 'http://wa.me/21627161321',
    WHATSAPP_CALL_LINK: 'https://call.whatsapp.com/voice/UryBRaipMSVjDV6Kk7HtWs',
}
