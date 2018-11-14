const initialState = {
    cart: [],
    totalCost: 0,
    cartQuantity: this.cart > 0 ? function() {
        let quant = 0
        this.cart.map(prod => quant += prod.quantity)
        return quant
    } : 0
}

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART:
            const {product, price, quantity} = action.payload
            return Object.assign({}, state, {
                cart: [...state.cart, product],
                totalCost: Math.round((state.totalCost + (price * quantity)) * 100) / 100,
                cartQuantity: state.cartQuantity + quantity
            })

        case REMOVE_FROM_CART:
            const {item} = action.payload

            return Object.assign({}, state, {
                cart: state.cart.filter(stateItem => {
                    if(stateItem.product_id !== item.product_id) {
                        return stateItem
                    }
                }),
                totalCost: Math.round((state.totalCost - (item.price * item.quantity)) * 100) / 100,
                cartQuantity: state.cartQuantity - item.quantity
            })

        case UPDATE_ITEM_QUANTITY:
            const {i, quant} = action.payload

            state.cart.map(stateItem => {
                    if(stateItem.product_id === i.product_id){
                        stateItem.quantity = quant
                    }
                })

        default:
         return state

    }
}

export function addToCart(product, quantity){
    let price = product.price * 1
    product.quantity = quantity
    return{
        type: ADD_TO_CART,
        payload: {product, price, quantity}
    }
}

export function removeFromCart(item){
    return{
        type: REMOVE_FROM_CART,
        payload: {item}
    }
}

export function updateItemQuantity(i, quant){
    quant *= 1
    return{
        type: UPDATE_ITEM_QUANTITY,
        payload: {i, quant}
    }
}