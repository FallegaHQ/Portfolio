# Portfolio

A portfolio website built with React, TypeScript, and Tailwind CSS. This application dynamically fetches and displays GitHub profile information, repositories, and coding statistics with an elegant glass morphism design.

## Features

- **Dynamic GitHub Integration**: Automatically fetches GitHub profile, repositories, and statistics
- **Modern Design**: Beautiful glass morphism UI with smooth animations and transitions
- **Dark/Light Theme**: Toggle between dark and light modes with persistent theme storage
- **Responsive Layout**: Fully responsive design that works on all device sizes
- **Language Statistics**: Visual representation of most used programming languages
- **Project Showcase**: Featured projects section with repository details and links
- **Interactive Elements**: Clickable language cards, repository filtering, and modal dialogs
- **Performance Optimized**: Image caching and efficient API calls

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: PHP proxy for GitHub API
- **Build Tool**: Vite

## Live Demo

Here: [Softwyx](https://softwyx.com)

## Project Structure

```
src/
├── components/
│   ├── GitHubPortfolio/          # Main portfolio components
│   │   ├── index.tsx             # Main portfolio component
│   │   ├── HeroSection.tsx       # Hero section with profile info
│   │   ├── StatsCards.tsx        # GitHub statistics cards
│   │   ├── LanguagesSection.tsx  # Programming languages section
│   │   ├── ProjectsSection.tsx   # Projects showcase
│   │   ├── ContactSection.tsx    # Contact information
│   │   ├── ThemeToggle.tsx       # Dark/light theme toggle
│   │   └── LoadingSpinner.tsx    # Loading component
│   └── ui/                       # Reusable UI components
├── hooks/                        # Custom React hooks
├── services/                     # API services and caching
├── types/                        # TypeScript type definitions
├── utils/                        # Utility functions and constants
│   ├── constants.ts             # App constants
│   ├── helpers.ts               # Helper functions
│   └── styles.ts                # Style utilities
└── main.tsx                     # Application entry point
```

## API Endpoints

The application uses the following GitHub API endpoints through the PHP proxy:

- `GET /users/{username}` - Fetch user profile
- `GET /users/{username}/repos` - Fetch user repositories
- `GET /repos/{username}/{repo}/languages` - Fetch repository languages


## Security Considerations

- Never commit your GitHub token to version control
- Use environment variables for sensitive configuration in production
- Ensure your PHP proxy validates and sanitizes all inputs
- Consider implementing rate limiting for the API proxy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is [unlicensed](https://unlicense.org/).

## Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Lucide React](https://lucide.dev/) - For beautiful icons
- [GitHub API](https://docs.github.com/en/rest) - For fetching GitHub data

## Support

If you found this project helpful, please give it a ⭐️ on GitHub!

For questions or support, feel free to open an issue or reach out through the contact information in the portfolio.

---

**Built with ❤️ by [FallegaHQ](https://github.com/FallegaHQ)**
