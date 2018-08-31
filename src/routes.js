import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Private from './components/Private/Private'

export default (
<Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/cart' component={Cart}/>
    <Route path='/private' component={Private} />
</Switch>
)