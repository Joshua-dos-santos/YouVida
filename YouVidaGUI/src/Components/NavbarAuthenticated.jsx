import React from 'react';
import { Nav, NavLink, NavMenu } from './NavbarElements';
import LoginButton from "./Authentication/LoginButton";
import LogoutButton from "./Authentication/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { NavbarBrand } from "react-bootstrap";
import Logo from '../assets/youvida.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faMagnifyingGlass, faStream } from "@fortawesome/free-solid-svg-icons";

const NavbarAuthenticated = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <>
                <Nav>
                    <NavMenu>
                        <NavbarBrand to='/' style={{ fontSize: 'x-large', marginRight: '3vw' }}>
                            <img style={{ width: '7vw', marginLeft: '2vw' }} alt="logo" src={Logo} />
                        </NavbarBrand>
                        <NavLink to='/'>
                            <FontAwesomeIcon icon={faStream} size="xl" style={{ marginRight: '0.5vw' }} /> Timeline
                        </NavLink>
                        <NavLink to='/profile'>
                            <FontAwesomeIcon icon={faCircleUser} size="xl" style={{ marginRight: '0.5vw' }} /> Profile
                        </NavLink>
                        <NavLink to='/SearchProfiles'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ marginRight: '0.5vw' }} /> Search...
                        </NavLink>
                        <div style={{ marginLeft: 'auto', marginRight: '2vw', display: 'flex', flexDirection: 'row', minWidth: '10vw' }}>
                            <p style={{ marginRight: '2vw', color: 'white' }}>Welcome, {user.nickname}</p>
                            <LoginButton />
                            <LogoutButton />
                        </div>
                    </NavMenu>
                </Nav>
            </>
        )
    );
};

export default NavbarAuthenticated;
