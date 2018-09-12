import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class SugarFree extends Component {

    constructor(props){
        super(props)
    
        this.state = {
            sugarFreeList: []
        }
    }
    
    componentDidMount(){
        axios.get('/api/sugarfree')
        .then(resp => {
            this.setState({
                sugarFreeList: resp.data
            })
        })
    }

    render(){
        const mappedSugarFreeList = this.state.sugarFreeList.map((product, i) => {
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
                <h2>Sugar Free</h2>
                <div className='product-scroll'>
                    {mappedSugarFreeList}
                </div>
            </div>
        )
    }
}

export default SugarFree;