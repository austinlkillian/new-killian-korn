import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Checkout extends Component {

    updateOrdered(){
        axios.put('/api/cartUpdate')
        .then(resp => {
            console.log(resp)
        })
    }

    onToken = (token) => {
        token.cart = void 0 
        axios.post('/api/payment', {token, amount: this.props.cartTotal * 100})
        .then(resp => {
            console.log(resp)
        }).then(() => {
            this.updateOrdered()
            this.props.getItems()
        }).then(() => {
            this.props.getCartTotal()
        })
    }

    render(){
        return(
            <StripeCheckout 
                name='Austin Killian'
                description='cart'
                token={this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                amount={this.props.cartTotal * 100}
            />
        )
    }
}

export default Checkout;