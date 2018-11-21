import React, {Component} from 'react';
import axios from 'axios';
import './CartItem.css'


class CartItem extends Component{
    constructor(props){
        super(props)

        this.state = {
            quantity: ''
        }
        this.handleQuantity = this.handleQuantity.bind(this)
    }

handleQuantity(e){
    this.setState({
        quantity: e.target.value
    })
}

updateQuantity(cartId){
    axios.put(`/api/cart/${cartId}`, {quantity: this.state.quantity * 1})
    .then(() => {
        this.setState({
            quantity: ''
        })
        this.props.getItems()
        this.props.getCartTotal()
    })
}

    render(){
        const {item} = this.props
        return(
            <div className='item-main'>
                <div className='cart-items-left'>
                    <img src={item.img} alt=""/>
                    <div>{item.product}</div>
                </div>
                <div className='cart-items-middle'>
                    
                </div>
            </div>
        )
    }
}

export default CartItem;