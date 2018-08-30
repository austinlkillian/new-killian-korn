import React, {Component} from 'react';

import {Link} from 'react-router-dom'

import './Header.css'

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            menuShow: false,
            searchShow: false,
            searchInput: ''
        }
        this.menuShowFn = this.menuShowFn.bind(this);
        this.searchShowFn = this.searchShowFn.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.goFn = this.goFn.bind(this);
    }

    menuShowFn(){
        this.setState({
            menuShow: !this.state.menuShow
        })
    }

    searchShowFn(){
        this.setState({
            searchShow: !this.state.searchShow
        })
    }

    handleSearchInput(e){
        this.setState ({
            searchInput: e.target.value
        })
    }

    goFn(){
        this.setState({
            searchInput: ''
        })
    }

    render(){
        return (
            <div className='whole-header'>
                <div className='header'>
                    <div className='menu' onClick={this.menuShowFn}>
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
                        <div className='search-button' onClick={this.searchShowFn}>
                            <img src="http://www.clker.com/cliparts/Y/3/d/w/R/r/search-icon-white-hi.png" alt=""/>
                        </div>
                        <Link to='/cart'>
                            <div className='cart'>
                                <img src="http://pluspng.com/img-png/shop-png-black-and-white-logo-512.png" alt=""/>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={(this.state.menuShow ? "dropDownMenuShow" : '') + ' dropDownMenu'}>
                    <div className='menu-list'>
                        <h2>Login</h2>
                        <h2>Orders</h2>
                        <h2>K-Klub</h2>
                        <h2>Gift Boxes</h2>
                        <h2>Your Business</h2>
                        <h2>Fundraising</h2>
                        <h2>Upcoming Shows</h2>
                        <h2>Contact Us</h2>
                    </div>
                </div>
                <div className={(this.state.searchShow ? "dropDownSearchShow" : '') + ' dropDownSearch'}>
                    <input className='search-bar' onChange={this.handleSearchInput} value={this.state.searchInput}/>
                    <button className='go-button' onClick={this.goFn}>Go</button>
                </div>
            </div>
        )
    }
}

export default Header;