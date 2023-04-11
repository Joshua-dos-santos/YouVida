import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import '../Stylesheets/Navbar.css';
import LoginButton from "./Authentication/LoginButton";
import LogoutButton from "./Authentication/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import {NavbarBrand} from "react-bootstrap";

const NavbarAuthenticated = () => {
    const {user, isAuthenticated} = useAuth0();
    return (
        isAuthenticated && (
            <>
                <Nav>
                    <Bars/>

                    <NavMenu>
                        <NavbarBrand to='/' style={{fontSize: 'x-large'}}>YouVida</NavbarBrand>
                        <NavLink to='/' activeStyle>
                            Timeline
                        </NavLink>
                        <NavLink to='/profile' activeStyle>
                            Profile
                        </NavLink>
                        <p style={{textAlign: 'right'}}>Welcome {user.name}</p>
                        <LoginButton/>
                        <LogoutButton/>
                    </NavMenu>
                </Nav>
            </>
        )
    )
}


export default NavbarAuthenticated;