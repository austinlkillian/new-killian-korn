import React, {Component} from 'react';
import axios from 'axios';

import {connect} from 'react-redux';
import {updateUser} from './../../ducks/users'

class Product extends Component{

    constructor(props){
        super(props)

        this.state = {
            product: [],
            quantity: 1
        }

        this.addQuantity = this.addQuantity.bind(this);
        this.subQuantity = this.subQuantity.bind(this);
        this.addToCartFn = this.addToCartFn.bind(this);
    }

    addQuantity(){
        this.setState({
            quantity: this.state.quantity += 1
        })
    }

    subQuantity(){
        this.setState({
            quantity: this.state.quantity -= 1
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
        console.log(productId)
        axios.get(`/api/product/${productId}`)
        .then(resp => {
            this.setState({
                product: resp.data,
                quantity: 1
            })
        })
    }

    componentDidUpdate(previousProps){
        if(previousProps.match.params.product !== this.props.match.params.product){
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
        const {quantity} = this.state

        const mappedProduct = this.state.product.map((product, i) => {
            return(
                <div key={i}>
                    <img src={product.img} alt=""/>
                    <h2>{product.product}</h2>
                    <h4>{product.description}</h4>
                    <h3>{product.size}</h3>
                </div>
            )
        })
        return(
            <div className='body'>product
                {mappedProduct}
                <div className='quantity'>
                    <button onClick={this.subQuantity}>-</button>
                        <h3>Quantity: {quantity}</h3>
                    <button onClick={this.addQuantity}>+</button>
                </div>
                <button onClick={this.addToCartFn}>Add to Cart</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {user} = state;

    return{
        user
    }
}

export default connect(mapStateToProps, {updateUser})(Product);