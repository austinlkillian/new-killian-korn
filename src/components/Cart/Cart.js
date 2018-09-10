import React, {Component} from 'react'
import axios from 'axios';

import './Cart.css'

class Cart extends Component {

    constructor(props){
        super(props)

        this.state = {
            cartItems: []
        }
    }

    componentDidMount(){
        this.getItems()
    }

    getItems(){
        axios.get('/api/cart')
        .then(resp => {
            console.log(resp)
            this.setState({
                cartItems: resp.data
            })
        })
    }

    deleteItem(cartId){
        axios.delete(`/api/cart/${cartId}`)
        .then(() => {
            this.getItems()
        })
    }

    render(){
        const mappedCartItems = this.state.cartItems.map((item, i) => {
            return(
                <div key={i}>
                    <div>{item.user_id}</div>
                    <div>{item.product_id}</div>
                    <div>{item.quantity}</div>
                    <button onClick={() => this.deleteItem(item.cart_id)}>delete from cart</button>
                    <br/>
                    <hr/>
                </div>
            )
        })
        return (
            <div className='cart-main'>
                <h1>Cart</h1>
                {mappedCartItems}
            </div>
        )
    }
}

export default Cart;