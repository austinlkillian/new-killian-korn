import React, {Component} from 'react'
import axios from 'axios';

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
            this.setState({
                cartTotal: resp.data[0].sum
            })
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
                    <CartItem item={item} i={i} getItems={this.getItems} getCartTotal={this.getCartTotal}/>
                    <button onClick={() => this.deleteItem(item.cart_id)}>delete from cart</button>
                    <br/>
                    <hr/>
                </div>
            )
        })
        return (
            <div className='cart-main'>
                <div>
                    <h1>Cart</h1>
                    <p>Cart Total: {this.state.cartTotal}</p>
                </div>
                {mappedCartItems}
            </div>
        )
    }
}

export default Cart;