import React, {Component} from 'react';

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
                <div className='logo'>
                    <img src="https://www.killiankorn.com/themes/killian_korn/images/logo.png" alt=""/>
                </div>
                <div className='right-buttons'>
                    <div className='search-button'>
                        <img src="http://www.clker.com/cliparts/Y/3/d/w/R/r/search-icon-white-hi.png" alt=""/>
                    </div>
                    <div className='cart'>
                        <img src="http://pluspng.com/img-png/shop-png-black-and-white-logo-512.png" alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;