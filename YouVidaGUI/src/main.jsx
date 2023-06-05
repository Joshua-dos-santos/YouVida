import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Auth0Provider} from "@auth0/auth0-react";

const domain = "dev-2h2ymz1zr5cmek6w.eu.auth0.com";
const clientId = "ZBV5xfwBsGtRuvto1gY0kctzAPXhKVRM";
const identifier = "https://dev-2h2ymz1zr5cmek6w.eu.auth0.com/api/v2/";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            audience={identifier}
            authorizationParams={{
                redirect_uri:"https://joshua.mdjansen.nl/"
            }}
            useRefreshTokens
            cacheLocation="localstorage"
        >
            <App/>
        </Auth0Provider>
    </React.StrictMode>,
)
