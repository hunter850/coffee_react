import { BrowserRouter, Routes, Route } from "react-router-dom";
// -------- Redux ------------
import store from "./app/store";
import { Provider } from "react-redux";
// ---------------------------
import FrontPage from "./routes/frontPage/FrontPage";
// import Cart from "./routes/cart/Cart";
// import CartContextWrap from "./routes/cart/CartContextWrap";
import Cart from "./routes/cart/cart/Cart";
import CartCreditCard from "./routes/cart/CartCreditCard";
import Products from "./routes/Products/Products";
import Food from "./routes/food/Food";
import Reserve from "./routes/food/Reserve";
import Course from "./routes/course/Course";
import CourseDetailed from "./routes/course/CourseDetailed";
import CourseManage from "./routes/course/CourseManage";
import CourseAdd from "./routes/course/CourseAdd";
import OrderCompleted from "./routes/course/OrderCompleted";
import Post from "./routes/sharing/Post";
import Member from "./routes/member/Member";
import Login from "./routes/member/Login";
import UserInfo from "./routes/member/UserInfo";
import OrderHistory from "./routes/member/OrderHistory";
import OrderHistoryDetail from "./routes/member/OrderHistoryDetail";
import AuthContextProvider from "./component/Member/AuthContextProvider";
import Game from "./routes/game/Game";
import Points from "./routes/game/Points";
import Coupon from "./routes/game/Coupon";
import Getcoupon from "./routes/game/Getcoupon";
import Getpoint from "./routes/game/Getpoint";
import Store from "./routes/store/Store";
import AllProvider from "./Contexts/AllProvider";
import ProductsDetail from "./routes/Products/ProductsDetail";
import PostDetail from "./routes/sharing/PostDetail";

const App = () => {
    const el = (
        <Provider store={store}>
            <BrowserRouter>
                <AuthContextProvider>
                    <AllProvider>
                        <Routes>
                            <Route
                                exact={true}
                                path="/"
                                element={<FrontPage />}
                            />
                            <Route path="/cart" element={<Cart />} />
                            <Route
                                path="/cart/creditcard"
                                element={<CartCreditCard />}
                            />
                            <Route path="/products" element={<Products />} />
                            <Route
                                path="/products/detail/:products_sid"
                                element={<ProductsDetail />}
                            />
                            <Route path="/food" element={<Food />} />
                            <Route path="/reserve" element={<Reserve />} />
                            <Route path="/course" element={<Course />} />
                            <Route
                                path="/course/manage"
                                element={<CourseManage />}
                            />
                            <Route
                                path="/course/detailed/:sid"
                                element={<CourseDetailed />}
                            />
                            <Route path="/course/add">
                                <Route element={<CourseAdd />} path="" />
                                <Route element={<CourseAdd />} path=":sid" />
                            </Route>
                            <Route
                                path="/course/orders"
                                element={<OrderCompleted />}
                            />
                            <Route
                                path="/sharing/:post_sid"
                                element={<Post />}
                            />
                            <Route path="/sharing" element={<Post />} />

                            <Route path="/member" element={<Member />} />
                            <Route path="/member/login" element={<Login />} />
                            <Route
                                path="/member/userinfo"
                                element={<UserInfo />}
                            />
                            <Route
                                path="/member/orderhistory"
                                element={<OrderHistory />}
                            />
                            <Route
                                path="/member/orderhistory/detail"
                                element={<OrderHistoryDetail />}
                            />
                            <Route path="/points" element={<Points />} />
                            <Route path="/coupon" element={<Coupon />} />
                            <Route path="/game" element={<Game />} />
                            <Route path="/store" element={<Store />} />
                            <Route path="/getcoupon" element={<Getcoupon />} />
                            <Route path="/getpoint" element={<Getpoint />} />
                        </Routes>
                    </AllProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </Provider>
    );

    return el;
};

export default App;
