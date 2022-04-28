import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { signupReducer } from "./components/signup/reducers/signupReducers"
import {
    userLoginReducer,
    userTokenReducer,
    userMeReducer
} from "./components/login/reducers/loginReducers"
import { productListReducer } from "./components/product/reducers/productReducers"
import { cartReducer } from "./components/cart/reducers/cartReducers"
import { 
    orderCreateReducer, 
    orderListReducer,
    orderDetailsReducer 
} from "./components/order/reducers/orderReducers"


import { setAxiosAuthToken, setCSRFToken } from "./utils/Utils"


const reducer = combineReducers({

    signup: signupReducer,
    userLogin: userLoginReducer,
    userToken: userTokenReducer,
    userMe: userMeReducer,
    productList: productListReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,

})
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const userTokenFromStorage = localStorage.getItem('token') ?
    localStorage.getItem('token') : null


const initialState = {
    userToken: {
        userInfo: userInfoFromStorage,
        token: userTokenFromStorage,
        isAuthenticated: userTokenFromStorage ? true : false
    },
    cart: {
        cartItems: cartItemsFromStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

if (userTokenFromStorage) {
    setAxiosAuthToken(userTokenFromStorage)
}
setCSRFToken()

export default store