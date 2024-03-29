import React from 'react';
import {
    Nav,
    Bars,
    NavMenu
} from './NavbarElements';
import LoginButton from "./Authentication/LoginButton";
import LogoutButton from "./Authentication/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import {NavbarBrand} from "react-bootstrap";
import Logo from "../assets/youvida.png";

const NavbarAuthenticated = () => {
    const {isAuthenticated} = useAuth0();
    return (
        !isAuthenticated && (
            <>
                <Nav>
                    <Bars/>

                    <NavMenu>
                        <NavbarBrand to='/' style={{fontSize: 'x-large', marginRight: '3vw'}}><img style={{width: '7vw', marginLeft: '2vw'}} alt="logo" src={Logo}/></NavbarBrand>
                        <div style={{marginLeft: 'auto',marginRight: '2vw', display: 'flex', flexDirection: 'row', minWidth: '10vw'}}>
                        <LoginButton/>
                        <LogoutButton/>
                        </div>
                    </NavMenu>
                </Nav>
            </>
        )
    )
}


export default NavbarAuthenticated;