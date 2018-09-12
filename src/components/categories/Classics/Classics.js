import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

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
                <h2>classics</h2>
                <div className='product-scroll'>
                    {mappedClassicsList}
                </div>
            </div>
        )
    }
}

export default Classics;