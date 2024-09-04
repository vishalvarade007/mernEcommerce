import React, { useEffect } from 'react';
import './App.css';
import { Header } from './Components/layout/Header/Header';
import webfont from 'webfontloader';
import { Footer } from './Components/layout/Footer/footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './Components/Home/home';
import { ProductDetails } from './Components/Product/ProductDetails';
import { Products } from './Components/Product/Products';
import { Search } from './Components/Product/Search';
import { LoginSignup } from './Components/User/LoginSignup';
import { store } from './store';
import { loadUser } from './Actions/userAction';
import { UserOptions } from './Components/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import { Profile } from './Components/User/Profile';
import { ProtectedRoute } from './Components/Route/ProtectedRoute';
import { UpdateProfile } from './Components/User/UpdateProfile';
import { UpdatePassword } from './Components/User/UpdatePassword';
import { ForgetPassword } from './Components/User/ForgetPassword';
import { ResetPassword } from './Components/User/ResetPassword';
import { Cart } from './Components/Cart/Cart';
import { Shipping } from './Components/Cart/Shipping';
import { ConfirmOrder } from './Components/Cart/ConfirmOrder';
import { OrderSuccess } from './Components/Cart/orderSuccess';
import { Payment } from './Components/Cart/Payment';
import { MyOrders } from './Components/Order/MyOrders';
import { OrderDetails } from './Components/Order/OrderDetails';
import {Dashboard} from "./Components/admin/Dashboard";
import {ProductList} from "./Components/admin/ProductList";
import { NewProduct } from './Components/admin/NewProduct';
import { UpdateProduct } from './Components/admin/UpdateProduct';
import {OrderList} from "./Components/admin/OrderList";
import {ProcessOrder} from "./Components/admin/ProcessOrder";
import {UserList} from "./Components/admin/UserList";
import {UpdateUser} from "./Components/admin/UpdateUser";
import {ProductReviews} from "./Components/admin/ProductReviews";
import {Contact} from "./Components/layout/Contact";
import {About} from "./Components/layout/About/About";
import {NotFound} from "./Components/layout/NotFound/NotFound";
import { useAlert } from 'react-alert';

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const location = useLocation();
    const alert = useAlert();

    useEffect(() => {
        webfont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });
        const hasShownNotification = sessionStorage.getItem('hasShownNotification');

        if (!hasShownNotification) {
            alert.show("Please wait 60 seconds to load the data", { type: 'info' });

            sessionStorage.setItem('hasShownNotification', 'true');

            setTimeout(() => {
                alert.removeAll();
            }, 60000);
        }
     
        store.dispatch(loadUser());
        
    }, [alert]);

    window.addEventListener("contextmenu",(e)=>e.preventDefault());

    return (
        <div>
            <Header />
            {user && isAuthenticated && <UserOptions user={user} />}
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/myproduct/:id" element={<ProductDetails />} />
                <Route path="/products/:keyword" element={<Products />} />
                <Route exact path="/search" element={<Search />} />
                <Route exact path="/login" element={<LoginSignup />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route exact path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                <Route exact path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
                <Route exact path="/password/forget" element={<ForgetPassword />} />
                <Route exact path="/password/reset/:token" element={<ResetPassword />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
                <Route exact path="/process/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                <Route exact path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                <Route exact path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
                <Route exact path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
                <Route exact path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
                <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
                <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
                <Route exact path="/admin/product" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
                <Route exact path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
                <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} />
                <Route exact path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>} />
                <Route exact path="/admin/users" element={<ProtectedRoute isAdmin={true}><UserList /></ProtectedRoute>} />
                <Route exact path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
                <Route exact path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReviews /></ProtectedRoute>} />
                <Route exact path="*" element={<NotFound/>} />

            </Routes>
            {location.pathname !== '/admin/product' && <Footer />}
        </div>
    );
}

export default App;
