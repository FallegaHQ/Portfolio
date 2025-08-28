import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import GitHubPortfolio from './components/GitHubPortfolio'

createRoot(document.getElementById('root')!)
    .render(<StrictMode>
        <GitHubPortfolio/>
    </StrictMode>,)
