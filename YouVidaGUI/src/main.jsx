import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Auth0Provider} from "@auth0/auth0-react";

const domain = "dev-2h2ymz1zr5cmek6w.eu.auth0.com";
const clientId = "ZBV5xfwBsGtRuvto1gY0kctzAPXhKVRM";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirectUri:"http:localhost:8069/profile"
            }}
        >
            <App/>
        </Auth0Provider>
    </React.StrictMode>,
)
