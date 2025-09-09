import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Portfolio from './components/portfolio'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!)
    .render(<StrictMode>
        <BrowserRouter>
            <Portfolio/>
        </BrowserRouter>
    </StrictMode>,)
