const initialState = {
    cart: [],
    totalCost: 0,
    cartQuantity: 0
}

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const ADD_ITEM_QUANTITY = 'ADD_ITEM_QUANTITY'
const SUB_ITEM_QUANTITY = 'SUB_ITEM_QUANTITY'

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case ADD_TO_CART:
            const { product, price, quantity } = action.payload

            return Object.assign({}, state, {
                cart: [...state.cart, product],
                totalCost: Math.round((state.totalCost + (price * quantity)) * 100) / 100,
                cartQuantity: state.cartQuantity + quantity
            })

        case REMOVE_FROM_CART:
            const { remItem } = action.payload

            return Object.assign({}, state, {
                cart: state.cart.filter(stateItem => {
                    if (stateItem.product_id !== remItem.product_id) {
                        return stateItem
                    }
                }),
                totalCost: state.cart.length > 0 ? 0 : Math.round((state.totalCost - (remItem.price * remItem.quantity)) * 100) / 100,
                cartQuantity: state.cart.length > 0 ? 0 : state.cartQuantity - remItem.quantity
            })

        case ADD_ITEM_QUANTITY:
            const { addItem } = action.payload

            return Object.assign({}, state, {
                cart: state.cart.map(stateItem => {
                    if (stateItem.product_id === addItem.product_id) {
    
                        stateItem.quantity++
                        return stateItem
    
                    } else {
                        return stateItem
                    }
                }),
                totalCost: Math.round((state.totalCost + addItem.price) * 100) / 100,
                cartQuantity: state.cartQuantity + 1
            })

        case SUB_ITEM_QUANTITY:
            const { subItem } = action.payload

            state.cart.map(stateItem => {
                if (stateItem.product_id === subItem.product_id) {

                    return stateItem.quantity > 0 ? stateItem.quantity-- : 0

                }
            })

            return Object.assign({}, state, {
                totalCost: state.totalCost > 0 ? Math.round((state.totalCost - subItem.price) * 100) / 100 : 0,
                cartQuantity: state.cartQuantity > 0 ? state.cartQuantity - 1 : 0
            })


        default:
            return state

    }
}

export function addToCart(product, quantity) {
    let price = product.price * 1
    product.quantity = quantity
    return {
        type: ADD_TO_CART,
        payload: { product, price, quantity }
    }
}

export function removeFromCart(remItem) {
    return {
        type: REMOVE_FROM_CART,
        payload: { remItem }
    }
}

export function addItemQuantity(addItem) {
    return {
        type: ADD_ITEM_QUANTITY,
        payload: { addItem }
    }
}

export function subItemQuantity(subItem) {
    return {
        type: SUB_ITEM_QUANTITY,
        payload: { subItem }
    }
}