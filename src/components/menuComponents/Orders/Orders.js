import React, {Component} from 'react';
import axios from 'axios';

import './Orders.css'

class Orders extends Component{
    constructor(props){
        super(props)

        this.state = {
            ordersNotShipped: [],
            ordersShipped: []
        }
    }

    componentDidMount(){
        this.getOrdersNotShippedFn()
        // this.getOrdersShippedFn()
    }

    getOrdersNotShippedFn(){
        axios.get('/api/orders/notshipped')
        .then(resp => {
            this.setState({
                ordersNotShipped: resp.data
            })
        })
    }

    // getOrdersShippedFn(){
    //     axios.get('/api/orders/shipped')
    //     .then(resp => {
    //         this.setState({
    //             ordersShipped: resp.data
    //         })
    //     })
    // }

    render(){

        const mappedOrdersNotShipped = this.state.ordersNotShipped.map((order, i) => {
            return (
                <div key={i}>
                    <br/>
                    <div className='order-main'>
                        <img src={order.img} alt=""/>
                        <h2>{order.product}</h2>
                        <div>
                            <h1>{order.quantity}</h1>
                            <h4>Qty</h4>
                        </div>
                        <h2>${order.price * order.quantity}</h2>
                    </div>
                    <hr/>
                </div>
            )
        })

        return(
            <div className='body'>
                <h1>Orders Made</h1>
                    {mappedOrdersNotShipped}
                {/* <br/>
                <br/>
                <br/>
                <h1>Orders Shipped</h1> */}
            </div>
        )
    }
}

export default Orders;