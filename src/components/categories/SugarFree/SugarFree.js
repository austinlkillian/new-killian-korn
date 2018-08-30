import React, {Component} from 'react';
import axios from 'axios';

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
                <div key={i}>
                    <h4>{product.product}</h4>
                    <img src={product.img} alt=""/>
                    <h4>${product.price}</h4>
                </div>
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