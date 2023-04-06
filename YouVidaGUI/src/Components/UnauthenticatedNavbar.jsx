import React from 'react';
import {
    Nav,
    Bars,
    NavMenu,
} from './NavbarElements';
import '../Stylesheets/Navbar.css';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {useAuth0} from "@auth0/auth0-react";

const NavbarAuthenticated = () => {
    const {isAuthenticated} = useAuth0();
    return (
        !isAuthenticated && (
            <>
                <Nav>
                    <Bars/>

                    <NavMenu>
                        <LoginButton/>
                        <LogoutButton/>
                    </NavMenu>
                </Nav>
            </>
        )
    )
}


export default NavbarAuthenticated;