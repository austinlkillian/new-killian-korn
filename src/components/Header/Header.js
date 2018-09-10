import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            menuShow: false,
            searchShow: false,
            searchInput: '',
            allProducts: []
        }
        this.menuShowFn = this.menuShowFn.bind(this);
        this.searchShowFn = this.searchShowFn.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.clearFn = this.clearFn.bind(this);
        this.login = this.login.bind(this);
    }

    login(){
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
        let url=`${encodeURIComponent(window.location.origin)}/auth/callback`
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
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

    clearFn(){
        this.setState({
            searchInput: ''
        })
    }

    componentDidMount(){
        axios.get('/api/allproducts')
        .then(resp => {
            this.setState({
                allProducts: resp.data
            })
        })
    }

    render(){
        const filteredProducts = this.state.allProducts.filter((product, i) => {
            return product.product.toLowerCase().includes(this.state.searchInput.toLowerCase())
        })
        let displayProducts = this.state.searchInput ? filteredProducts : this.state.allProducts;
        const mappedAllProducts = displayProducts.map((product, i) => {
            return (
                <Link to={`/product/${product.product_id}`}><div className='all-search' key={i} onClick={this.searchShowFn}>
                    <h4>{product.product}</h4>
                    <img src={product.img} alt=""/>
                    <h4>${product.price}</h4>
                </div></Link>
            )
        })
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
                        <a onClick={this.login}>Login</a>
                        <Link to='/orders'><a>Orders</a></Link>
                        <Link to='/kklub'><a>K-Klub</a></Link>
                        <Link to='/giftboxes'><a>Gift Boxes</a></Link>
                        <Link to='/yourbusiness'><a>Your Business</a></Link>
                        <Link to='/fundraising'><a>Fundraising</a></Link>
                        <Link to='./upcomingshows'><a>Upcoming Shows</a></Link>
                        <Link to='contactus'><a>Contact Us</a></Link>
                    </div>
                </div>
                <div className={(this.state.searchShow ? "dropDownSearchShow" : '') + ' dropDownSearch'}>
                    <div className='search-section'>
                        <input className='search-bar' onChange={this.handleSearchInput} value={this.state.searchInput}/>
                        <button className='clear-button' onClick={this.clearFn}>Clear</button>
                    </div>
                    <div className='all-products'>
                        {mappedAllProducts}
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;