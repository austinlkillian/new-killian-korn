import React, {Component} from 'react';
import axios from 'axios';

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
                <div key={i}>
                    <h4>{product.product}</h4>
                    <img src={product.img} alt="" />
                    <h4>${product.price}</h4>
                </div>
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