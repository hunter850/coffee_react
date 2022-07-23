import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./routes/frontPage/FrontPage";
import Cart from "./routes/cart/Cart";
import CartCreditCard from "./routes/cart/CartCreditCard";
import Goods from "./routes/goods/Goods";
import Food from "./routes/food/Food";
import Reserve from "./routes/food/Reserve";
import Course from "./routes/course/Course";
import CourseDetailed from "./routes/course/CourseDetailed";
import CourseManage from "./routes/course/CourseManage";
import CourseAdd from "./routes/course/CourseAdd";
import Sharing from "./routes/sharing/Sharing";
import Member from "./routes/member/Member";
import Game from "./routes/game/Game";
import Points from "./routes/game/Points";
import Coupon from "./routes/game/Coupon";
import Getcoupon from "./routes/game/Getcoupon";
import Getpoint from "./routes/game/Getpoint";
import Store from "./routes/store/Store";
import AllProvider from "./Contexts/AllProvider";

const App = () => {
    const el = (
        <BrowserRouter>
            <AllProvider>
                <Routes>
                    <Route exact={true} path="/" element={<FrontPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/cart/creditcard"
                        element={<CartCreditCard />}
                    />
                    <Route path="/goods" element={<Goods />} />
                    <Route path="/food" element={<Food />} />
                    <Route path="/reserve" element={<Reserve />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/course/manage" element={<CourseManage />} />
                    <Route
                        path="/course/detailed/:sid"
                        element={<CourseDetailed />}
                    />
                    <Route path="/course/add/:sid" element={<CourseAdd />} />
                    <Route path="/sharing" element={<Sharing />} />
                    <Route path="/member" element={<Member />} />
                    <Route path="/points" element={<Points />} />
                    <Route path="/coupon" element={<Coupon />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/getcoupon" element={<Getcoupon />} />
                    <Route path="/getpoint" element={<Getpoint />} />
                </Routes>
            </AllProvider>
        </BrowserRouter>
    );

    return el;
};

export default App;
