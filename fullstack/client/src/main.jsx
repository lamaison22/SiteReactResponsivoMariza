import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider  domain="dev-vo4123tdnp7bcuws.us.auth0.com" clientId="QIbYsCN57OXNvgjcBLAD8rCVHIW1WSYN" 
    authorizationParams={{
      redirect_uri:import.meta.env.VITE_APP_URL,
      
    } }
    audience ={import.meta.env.VITE_SERVER_URL}
    scope= "openid user email"
    >
      
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
