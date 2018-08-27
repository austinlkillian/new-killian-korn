import React, {Component} from 'react'

import './Home.css'

class Home extends Component {

    render() {
        return(
            <div className='body'>
                <div className='categorie-buttons'>
                    <h3>Classics</h3>
                    <h3>Flavored</h3>
                    <h3>Light</h3>
                    <h3>Sugar Free</h3>
                </div>
                <div className='sections'></div>
                <div className='sections'></div>
                <div className='sections'></div>
                <div className='sections'></div>
            </div>
        )
    }
}

export default Home;