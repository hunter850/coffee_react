import { BrowserRouter, Routes, Route } from "react-router-dom";
// -------- Redux ------------
import store from "./app/store";
import { Provider } from "react-redux";
// ---------------------------
import FrontPage from "./routes/frontPage/FrontPage";
// import Cart from "./routes/cart/Cart";
// import CartContextWrap from "./routes/cart/CartContextWrap";
import Cart from "./routes/cart/Cart";
import CartCreditCard from "./routes/cart/creditcard/CartCreditCard";
import CartForm from "./routes/cart/CartForm";
import CartDetail from "./routes/cart/CartDetail";
import Products from "./routes/Products/Products";
import Food from "./routes/food/Food";
import Reserve from "./routes/reserve/Reserve";
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
import Likes from "./routes/member/Likes";
import HistoryPosts from "./routes/member/HistoryPosts";
import AuthContextProvider from "./component/Member/AuthContextProvider";
import Game from "./routes/game/Game";
import Points from "./routes/game/Points";
import Coupon from "./routes/game/Coupon";
import Getcoupon from "./routes/game/Getcoupon";
import Getpoint from "./routes/game/Getpoint";
import PointsToCoupon from "./routes/game/PointsToCoupon";
import Store from "./routes/store/Store";
import AllProvider from "./Contexts/AllProvider";
import ProductsDetail from "./routes/Products/ProductsDetail";
import LatestnewsDetail from "./routes/frontPage/LatestnewsDetail";

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
                            <Route
                                path="/LatestnewsDetail"
                                element={<LatestnewsDetail />}
                            />
                            <Route path="/cart" element={<Cart />} />
                            <Route
                                path="/cart/creditcard"
                                element={<CartCreditCard />}
                            />
                            <Route path="/cart/form" element={<CartForm />} />
                            <Route
                                path="/cart/detail"
                                element={<CartDetail />}
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
                            <Route
                                path="/sharing/newpost"
                                element={<Post newPost={true} />}
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
                                path="/member/orderhistory/detail/:order_sid"
                                element={<OrderHistoryDetail />}
                            />
                            <Route path="/member/likes" element={<Likes />} />
                            <Route
                                path="/member/posts"
                                element={<HistoryPosts />}
                            />
                            <Route path="/points" element={<Points />} />
                            <Route path="/coupon" element={<Coupon />} />
                            <Route path="/game" element={<Game />} />
                            <Route path="/store" element={<Store />} />
                            <Route path="/getcoupon" element={<Getcoupon />} />
                            <Route path="/getpoint" element={<Getpoint />} />
                            <Route
                                path="/PointsToCoupon"
                                element={<PointsToCoupon />}
                            />
                            <Route
                                path="*"
                                element={<h1>404 Not Found !</h1>}
                            />
                        </Routes>
                    </AllProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </Provider>
    );

    return el;
};

export default App;
