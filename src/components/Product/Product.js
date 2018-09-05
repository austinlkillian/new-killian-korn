import React, {Component} from 'react';
import axios from 'axios';

class Product extends Component{

    constructor(props){
        super(props)

        this.state = {
            product: []
        }
    }

    componentDidMount(){
        const{product} = this.props.match.params
        console.log(product)

        axios.get(`/api/product/${product}`)
        .then(resp => {
            console.log(resp)
            this.setState({
                product: resp.data
            })
        })
    }

    render(){
        console.log(this.props)
        console.log(this.state.product)
        const mappedProduct = this.state.product.map((product, i) => {
            return(
                <div key={i}>
                    <img src={product.img} alt=""/>
                    <h2>{product.product}</h2>
                    <h4>{product.description}</h4>
                    <h3>{product.size}</h3>
                    <button>Add to Cart</button>
                </div>
            )
        })
        return(
            <div className='body'>product
                {mappedProduct}
            </div>
        )
    }
}

export default Product;