import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/header.css';



class Header extends Component {
    render() {
        const { username } = this.props;
            return (
                <header>
                    <nav className="navbar-menu">
                        {
                            username ?

                                (
                                    <ul>
                                        <li> Hi, {username}</li>
                                        <li><NavLink to='/' onClick={(e) => this.props.logout(e, this.state)}>Logout</NavLink></li>
                                    </ul>
                                )
                                :
                                (
                                    <ul>
                                        <li><NavLink to="/register">Add data Here!</NavLink></li>
                                    </ul>
                                )
                        }
                </nav>
                
            </header >
        );
    };
}

export default Header;