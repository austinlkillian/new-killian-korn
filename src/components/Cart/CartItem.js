import React, {Component} from 'react';
import axios from 'axios';

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
            <div>
                <img src={item.img} alt=""/>
                <div>product: {item.product}</div>
                <div>quantity: 
                    <input className='change-quantity'
                           onChange={this.handleQuantity}
                           placeholder={item.quantity}
                           value={this.state.quantity}/>
                </div>
                
                <button onClick={() => this.updateQuantity(item.cart_id)}>Update Quantity</button>
            </div>
        )
    }
}

export default CartItem;