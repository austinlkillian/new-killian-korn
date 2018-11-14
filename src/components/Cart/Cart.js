import React, {Component} from 'react'
import axios from 'axios';
import Checkout from './../Checkout/Checkout'

import {connect} from 'react-redux'
import {removeFromCart} from '../../ducks/cart'

import CartItem from './CartItem'

import './Cart.css'

class Cart extends Component {

    constructor(props){
        super(props)

        this.state = {
            cartItems: [],
            cartTotal: 0
        }
        this.getItems = this.getItems.bind(this)
        this.getCartTotal = this.getCartTotal.bind(this)
    }

    componentDidMount(){

        this.getItems()
        this.getCartTotal()
    }

    getItems(){
        axios.get('/api/cart')
        .then(resp => {
            this.setState({
                cartItems: resp.data
            })
        })
    }

    getCartTotal(){
        axios.get('/api/total')
        .then(resp => {
            if(resp.data[0].sum){
                this.setState({
                    cartTotal: resp.data[0].sum
                })
            } else if(!resp.data[0].sum){
                this.setState({
                    cartTotal: 0
                })
            }
        })
    }

    // deleteItem(cartId){
    //     axios.delete(`/api/cart/${cartId}`)
    //     .then(() => {
    //         this.getItems()
    //         this.getCartTotal()
    //     })
    // }

    render(){

        console.log(this.props.cart)
        console.log(this.props.totalCost)

        const mappedCartItems = this.props.cart.map((item, i) => {
            return(
                <div key={i}>
                    <br/>
                    <hr/>
                    <div className='full-cart-item'>
                        <CartItem item={item} getItems={this.getItems} getCartTotal={this.getCartTotal}/>
                        <button className='delete' onClick={() => this.props.removeFromCart(item)}>X</button>
                    </div>
                    <br/>
                    <hr/>
                </div> 
            )
        })
        return (
            <div className='cart-main'>
                <div className='cart-header'>
                    <h1>Cart</h1>
                    <div>
                        <p>Cart Total: ${this.props.totalCost}</p>
                        <Checkout 
                        cartTotal={this.props.totalCost}
                        getItems={this.getItems}
                        getCartTotal={this.getCartTotal}/>
                    </div>
                </div>
                {mappedCartItems}
            </div>
        )
    }
}

function mapStateToProps( state ) {
    const { cart, user } = state;

    return {
       cart: cart.cart, 
       totalCost: cart.totalCost,
       user: user.user
    };
};

export default connect(mapStateToProps, {removeFromCart})(Cart);