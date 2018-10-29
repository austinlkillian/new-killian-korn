const initialState = {
    cart: [],
    totalCost: 0
}

const ADD_TO_CART = 'ADD_TO_CART'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART:
            const {product, price} = action.payload
            return Object.assign({}, state, {
                totalCost: state.totalcost += price,
                cart: [...state.cart, product]
            })

        default:
        return state
    }
}

export function addToCart(product){
    let price = product.price * 1

    return{
        type: ADD_TO_CART,
        payload: {product, price}
    }
}