import React from 'react';
import {
    Nav,
    Bars,
    NavMenu,
    NavLink
} from './NavbarElements';
import '../Stylesheets/Navbar.css';
import LoginButton from "./Authentication/LoginButton";
import LogoutButton from "./Authentication/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import {NavbarBrand} from "react-bootstrap";

const NavbarAuthenticated = () => {
    const {isAuthenticated} = useAuth0();
    return (
        !isAuthenticated && (
            <>
                <Nav>
                    <Bars/>

                    <NavMenu>
                        <NavbarBrand to='/' style={{fontSize: 'x-large'}}>YouVida</NavbarBrand>
                        <LoginButton/>
                        <LogoutButton/>
                    </NavMenu>
                </Nav>
            </>
        )
    )
}


export default NavbarAuthenticated;