import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Private from './components/Private/Private'
import ContactUs from './components/menuComponents/ContactUs/ContactUs';
import Fundraising from './components/menuComponents/Fundraising/Fundraising';
import GiftBoxes from './components/menuComponents/GiftBoxes/GiftBoxes';
import KKlub from './components/menuComponents/KKlub/KKlub';
import Orders from './components/menuComponents/Orders/Orders';
import UpcomingShows from './components/menuComponents/UpcomingShows/UpcomingShows';
import YourBusiness from './components/menuComponents/YourBusiness/YourBusiness';

import Product from './components/Product/Product'

export default (
<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/cart' component={Cart} />
    <Route path='/private' component={Private} />
    <Route path='/contactus' component={ContactUs} />
    <Route path='/fundraising' component={Fundraising} />
    <Route path='/giftboxes' component={GiftBoxes} />
    <Route path='/kklub' component={KKlub} />
    <Route path='/orders' component={Orders} />
    <Route path='/upcomingshows' component={UpcomingShows} />
    <Route path='/yourbusiness' component={YourBusiness} />
    <Route path='/product/:product' component={Product} />
</Switch>
)