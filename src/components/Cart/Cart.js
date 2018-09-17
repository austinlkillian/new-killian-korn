import React, {Component} from 'react'
import axios from 'axios';
import Checkout from './../Checkout/Checkout'

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

    deleteItem(cartId){
        axios.delete(`/api/cart/${cartId}`)
        .then(() => {
            this.getItems()
            this.getCartTotal()
        })
    }

    render(){


        const mappedCartItems = this.state.cartItems.map((item, i) => {
            return(
                <div>
                    <br/>
                    <hr/>
                    <div className='full-cart-item' key={i}>
                        <CartItem item={item} getItems={this.getItems} getCartTotal={this.getCartTotal}/>
                        <button className='delete' onClick={() => this.deleteItem(item.cart_id)}>X</button>
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
                        <p>Cart Total: ${this.state.cartTotal}</p>
                        <Checkout 
                        cartTotal={this.state.cartTotal}
                        getItems={this.getItems}
                        getCartTotal={this.getCartTotal}/>
                    </div>
                </div>
                {mappedCartItems}
            </div>
        )
    }
}

export default Cart;