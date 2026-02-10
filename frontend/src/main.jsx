import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId="149847110917-0k6h59nat3gmg3dvi2sanb2ualb9l0bl.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </StrictMode>
)
