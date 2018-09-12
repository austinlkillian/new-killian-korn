import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Light extends Component {

    constructor(props){
        super(props)

        this.state = {
            lightList: []
        }
    }

    componentDidMount(){
        axios.get('/api/light')
        .then(resp => {
            this.setState({
                lightList: resp.data
            })
        })
    }

    render(){
        const mappedLightList = this.state.lightList.map((product, i) => {
            return (
                <Link to={`/product/${product.product_id}`}>
                    <div key={i} 
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
                <h2>Light</h2>
                <div className='product-scroll'>
                    {mappedLightList}
                </div>
            </div>
        )
    }
}

export default Light;