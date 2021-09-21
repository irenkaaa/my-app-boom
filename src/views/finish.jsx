import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/home.css';

function Finish (props) {
    return (
        <div className='welcome'>
            <h2 style={{ textAlign:'center'}}>Successfully finished!!!</h2>
            <h3 style={{ textAlign:'center'}}>Thank you, {props.username ?  props.username : 'user'}</h3>
            <NavLink className='logout' to='/' onClick={(e) => props.logout(e,props)}>Logout</NavLink>
        </div>
    );
}


export default Finish;