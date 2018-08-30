import React, {Component} from 'react';
import axios from 'axios';

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
                <div key={i}>
                    <h4>{product.product}</h4>
                    <img src={product.img}  alt=""/>
                    <h4>${product.price}</h4>
                </div>
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