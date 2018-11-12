import {createStore, combineReducers} from 'redux';
import userReducer from './ducks/user';
import cartReducer from './ducks/cart';

let reducers = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())