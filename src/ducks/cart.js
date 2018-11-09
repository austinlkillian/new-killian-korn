const initialState = {
    cart: [],
    totalCost: 0,
    cartQuantity: 0
}

const ADD_TO_CART = 'ADD_TO_CART'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART:
            const {product, price, quantity} = action.payload
            return Object.assign({}, state, {
                cart: [...state.cart, product],
                totalCost: Math.round((state.totalCost + (price * quantity)) * 100) / 100,
                cartQuantity: state.cartQuantity + quantity
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