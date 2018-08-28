import React, {Component} from 'react';

import {Link} from 'react-router-dom'

import './Header.css'

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render(){
        return (
            <div className='header'>
                <div className='menu'>
                    <div className='buns-container'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <Link to='/'>
                    <div className='logo'>
                        <img src="https://www.killiankorn.com/themes/killian_korn/images/logo.png" alt=""/>
                    </div>
                </Link>
                <div className='right-buttons'>
                    <div className='search-button'>
                        <img src="http://www.clker.com/cliparts/Y/3/d/w/R/r/search-icon-white-hi.png" alt=""/>
                    </div>
                    <Link to='/cart'>
                        <div className='cart'>
                            <img src="http://pluspng.com/img-png/shop-png-black-and-white-logo-512.png" alt=""/>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Header;