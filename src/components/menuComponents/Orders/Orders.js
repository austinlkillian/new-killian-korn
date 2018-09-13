import React, {Component} from 'react';
import axios from 'axios';

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
                    <h2>{order.cart_id}</h2>
                    <h2>{order.product_id}</h2>
                    <h2>{`${order.ordered}`}</h2>
                    <hr/>
                </div>
            )
        })

        return(
            <div className='body'>
                <h1>Orders Made</h1>
                    {mappedOrdersNotShipped}
                <br/>
                <br/>
                <br/>
                <h1>Orders Shipped</h1>
            </div>
        )
    }
}

export default Orders;