import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Flavored extends Component {

    constructor(props){
        super(props)

        this.state = {
            flavoredList: []
        }
    }

    componentDidMount(){
        axios.get('/api/flavored')
        .then(resp => {
            this.setState({
                flavoredList: resp.data
            })
        })
    }

    render(){
        const mappedFlavoredList = this.state.flavoredList.map((product, i) => {
            return (
                <Link key={i} to={`/product/${product.product_id}`}>
                    <div  
                         className='product-scroll-div'
                         style={{backgroundImage: `url(${product.img})`}}>
                        <div className='name-div'>
                            <h4>{product.product}</h4>
                        </div>
                    </div>
                </Link>
            )
        })
        return (
            <div className='main'>
                <h2>Flavored</h2>
                <div className='product-scroll'>
                    {mappedFlavoredList}
                </div>
            </div>
        )
    }
}

export default Flavored;