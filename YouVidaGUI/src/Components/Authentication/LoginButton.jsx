import React from "react";
import {useAuth0} from "@auth0/auth0-react";



const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated, isLoading,} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()}>
                Sign in
            </button>
        )
    )
}

export default LoginButton