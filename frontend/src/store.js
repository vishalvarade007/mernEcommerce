import {createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import { myProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, reviewReducer } from "./Reducers/productReducer";
import { userReducer,profileReducer, forgetPasswordReducer, allUsersReducer, userDetailsReducer } from "./Reducers/userReducer";
import { cartReducer } from "./Reducers/cartReducer";
import {allOrdesrReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer} from "./Reducers/orderReducer";

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgetPassword:forgetPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrderReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    myProduct:myProductReducer,
    allOrders:allOrdesrReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    reviews:reviewReducer,
});

const middleware = [thunk];

let inital_state = {
    cart:{
        cartItems:localStorage.getItem('cartItems') ?
                  JSON.parse(localStorage.getItem('cartItems')) :[],
        shippingInfo:localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')):{}       
    },
};

export const store = createStore(
    reducer,
    inital_state,
    composeWithDevTools(applyMiddleware(...middleware))
);