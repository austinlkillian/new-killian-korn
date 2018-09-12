import {createStore, combineReducers} from 'redux';
import userReducer from './ducks/users';
// import cartReducer from './ducks/cart';

let reducers = combineReducers({
    users: userReducer,
    // cart: cartReducer
})

export default createStore(reducers)