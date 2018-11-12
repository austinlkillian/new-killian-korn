import React, {Component} from 'react';
import axios from 'axios';
import './Product.css'

import {connect} from 'react-redux';
// import {updateUser} from './../../ducks/user'
import {addToCart} from './../../ducks/cart'

class Product extends Component{

    constructor(props){
        super(props)

        this.state = {
            product: [],
            quantity: 1,
            price: 0
        }
        this.addQuantity = this.addQuantity.bind(this);
        this.subQuantity = this.subQuantity.bind(this);
        this.addToCartFn = this.addToCartFn.bind(this);
    }

    addQuantity(){
        this.setState({
            quantity: this.state.quantity + 1
        })
    }

    subQuantity(){
        this.setState({
            quantity: this.state.quantity - 1
        })
        if(this.state.quantity<1){
            this.setState({
                quantity: 1
            })
        }
    }

    componentDidMount(){
        const{product} = this.props.match.params

        this.getProduct(product)
    }

    getProduct(productId){
        axios.get(`/api/product/${productId}`)
        .then(resp => {
            this.setState({
                product: resp.data,
                quantity: 1,
                price: resp.data[0].price
            })
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.product !== this.props.match.params.product){
            this.getProduct(this.props.match.params.product)
        }
    }

    addToCartFn(){
        let {product_id, size_id} = this.state.product[0];

        axios.post(`/api/cart`, {product_id: product_id, size_id: size_id, quantity: this.state.quantity
        }).then(resp => {
            console.log(resp)
        })
    }

    render(){
        const {quantity, price} = this.state

      const mappedProduct = this.state.product.map((product, i) => {
            return(
                <div key={i} className='product-map'>
                    <img src={product.img} alt=""/>
                    <h2>{product.product}</h2>
                    <h4>{product.description}</h4>
                    <h3>{product.size}</h3>
                    <h4>${price * quantity}</h4>
                </div>
            )
        })
        return(
            <div className='product-body'>
                <div className='product-main'>
                    {mappedProduct}
                    <div className='quantity'>
                        <button onClick={this.subQuantity}>-</button>
                            <h3>Quantity: {quantity}</h3>
                        <button onClick={this.addQuantity}>+</button>
                    </div>
                    <button className='addToCartButton' onClick={() => this.props.addToCart(this.state.product[0], this.state.quantity)}>Add to Cart</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {addToCart})(Product);