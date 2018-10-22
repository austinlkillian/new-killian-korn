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
            allProducts: [],
            cartAllQuantity: 0,
            profilePic: ''
        }
        this.menuShowFn = this.menuShowFn.bind(this);
        this.searchShowFn = this.searchShowFn.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.clearFn = this.clearFn.bind(this);
        this.login = this.login.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
        this.getCartAllQuantity = this.getCartAllQuantity.bind(this)
    }

    getProfilePic(){
        axios.get('/api/profilepic')
        .then(resp => {
            console.log(resp.data)
            this.setState({
                profilePic: resp.data[0].img
            })
        })
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

    closeMenu(){
            this.setState({
                menuShow: false
            })
    }

    searchShowFn(){
        this.setState({
            searchShow: !this.state.searchShow
        })
    }
    
    closeSearch(){
        this.setState({
            searchShow: false
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

    getCartAllQuantity(){
        axios.get('/api/cartallquantity')
        .then(resp => {
            if(resp.data[0].sum){
                this.setState({
                    cartAllQuantity: resp.data[0].sum
                })
            } else if(!resp.data[0].sum){
                this.setState({
                    cartAllQuantity: 0
                })
            }
        })
    }

    componentDidMount(){
        axios.get('/api/allproducts')
        .then(resp => {
            this.setState({
                allProducts: resp.data
            })
        })
        this.getCartAllQuantity()
        this.getProfilePic()
    }

    componentDidUpdate(prevProps){
        if(this.state.cartAllQuantity !== prevProps.cartAllQuantity){
            this.getCartAllQuantity()
        }
    }

    render(){

        const filteredProducts = this.state.allProducts.filter((product, i) => {
            return product.product.toLowerCase().includes(this.state.searchInput.toLowerCase())
        })
        let displayProducts = this.state.searchInput ? filteredProducts : this.state.allProducts;
        const mappedAllProducts = displayProducts.map((product, i) => {
            return (
                <Link key={i} to={`/product/${product.product_id}`}>
                    <div className='all-search' 
                         style={{backgroundImage: `url(${product.img})`}} 
                         onClick={this.searchShowFn}>
                            <div className='search-name-div'>
                                <h4>{product.product}</h4>
                            </div>
                    </div>
                </Link>
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
                        <div className='logo' onClick={this.closeMenu}>
                            <div onClick={this.closeSearch}>
                                <img src="https://www.killiankorn.com/themes/killian_korn/images/logo.png" alt=""/>
                            </div>
                        </div>
                    </Link>
                    <div className='right-buttons'>
                        <div className='search-button' onClick={this.searchShowFn}>
                            <div onClick={this.closeMenu}>
                                <img src="http://www.clker.com/cliparts/Y/3/d/w/R/r/search-icon-white-hi.png" alt=""/>
                            </div>
                        </div>
                        <Link to='/cart'>
                            <div className='cart' onClick={this.closeMenu}>
                                <div onClick={this.closeSearch}>
                                    <img src="http://pluspng.com/img-png/shop-png-black-and-white-logo-512.png" alt=""/>
                                    <div className='cartAllQuantity'>
                                        <div>{this.state.cartAllQuantity}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={(this.state.menuShow ? "dropDownMenuShow" : '') + ' dropDownMenu'}>
                    <div className='menu-list' onClick={this.closeSearch}>
                        <div className='login-div'>
                            <a onClick={this.login}>Login</a>
                            <div className='profile-pic' style={{backgroundImage: `url(${this.state.profilePic})`}}></div>
                        </div>
                        <Link to='/orders'><div onClick={this.menuShowFn}>Orders</div></Link>
                        <Link to='/kklub'><div onClick={this.menuShowFn}>K-Klub</div></Link>
                        <Link to='/giftboxes'><div onClick={this.menuShowFn}>Gift Boxes</div></Link>
                        <Link to='/yourbusiness'><div onClick={this.menuShowFn}>Your Business</div></Link>
                        <Link to='/fundraising'><div onClick={this.menuShowFn}>Fundraising</div></Link>
                        <Link to='./upcomingshows'><div onClick={this.menuShowFn}>Upcoming Shows</div></Link>
                        <Link to='contactus'><div onClick={this.menuShowFn}>Contact Us</div></Link>
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