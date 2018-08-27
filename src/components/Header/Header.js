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
                <div className='menu'></div>
                <div className='logo'></div>
                <div className='right-buttons'>
                    <div className='search-button'></div>
                    <div className='cart'></div>
                </div>
            </div>
        )
    }
}

export default Header;