import React, {Component} from 'react';
import axios from 'axios';

class Classics extends Component {

    constructor(props){
        super(props)

        this.state = {
            classicsList: []
        }
    }

    componentDidMount(){
        axios.get('/api/classics')
        .then(resp => {
            this.setState({
                classicsList: resp.data
            })
        })
    }

    render(){
        const mappedClassicsList = this.state.classicsList.map((product, i) => {
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
                <h2>classics</h2>
                <div className='product-scroll'>
                    {mappedClassicsList}
                </div>
            </div>
        )
    }
}

export default Classics;