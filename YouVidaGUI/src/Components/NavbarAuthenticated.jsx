import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import LoginButton from "./Authentication/LoginButton";
import LogoutButton from "./Authentication/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import {NavbarBrand} from "react-bootstrap";
import Logo from '../assets/react.svg'

const NavbarAuthenticated = () => {
    const {user, isAuthenticated} = useAuth0();
    return (
        isAuthenticated && (
            <>
                <Nav>
                    <NavMenu>
                        <NavbarBrand to='/' style={{fontSize: 'x-large', marginRight: '3vw'}}><img src={Logo}/>YouVida</NavbarBrand>
                        <NavLink to='/'>
                            Timeline
                        </NavLink>
                        <NavLink to='/profile'>
                            Profile
                        </NavLink>
                        <NavLink to='/SearchProfiles'>
                            Search...
                        </NavLink>
                        <div style={{marginLeft: 'auto',marginRight: '2vw', display: 'flex', flexDirection: 'row', minWidth: '10vw'}}>
                        <p style={{marginRight: '2vw'}}>Welcome, {user.nickname}</p>
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