import React, {Component} from 'react';
import axios from 'axios';
import {updateUser} from '../../ducks/user';
import {connect} from 'react-redux';

import Classics from './../categories/Classics/Classics'
import Flavored from './../categories/Flavored/Flavored'
import Light from './../categories/Light/Light'
import SugarFree from './../categories/SugarFree/SugarFree'
import './Home.css'

class Home extends Component {

    windowScroll(x, y){
        // window.scrollTo(x, y)
        window.scroll({
            top: y,
            left: x,
            behavior: 'smooth'
        })
    }

    async componentDidMount() {
        let userData = await axios.get('/api/user-data');
        this.props.updateUser(userData.data)
    }

    componentWillUnmount(){
        window.scrollTo(0,0)
    }

    render() {
        return(
            <div className='body'>
                <div className='category-buttons'>
                    <h3 onClick={() => this.windowScroll(0, 0)}>Classics</h3>
                    <h3 onClick={() => this.windowScroll(0, 250)}>Flavored</h3>
                    <h3 onClick={() => this.windowScroll(0, 501)}>Light</h3>
                    <h3 onClick={() => this.windowScroll(0, 752)}>Sugar Free</h3>
                </div>
                <div className='section'>
                    <div className='sections'><Classics/></div>
                    <div className='sections'><Flavored/></div>
                    <div className='sections'><Light/></div>
                    <div className='sections'><SugarFree/></div>
                </div>
            </div>
        )
    }
}

export default connect( null, {updateUser} ) (Home );