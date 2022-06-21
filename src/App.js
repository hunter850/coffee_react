import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from './routes/frontPage/FrontPage';
import Cart from './routes/cart/Cart';
import Goods from "./routes/goods/Goods";
import Food from "./routes/food/Food";
import Lesson from "./routes/lesson/Lesson";
import Sharing from "./routes/sharing/Sharing";
import Member from "./routes/member/Member";
import Game from "./routes/game/Game";
import Points from "./routes/game/Points";
import Coupon from "./routes/game/Coupon";

const App = () => {
    const el = (
        <BrowserRouter>
            <Routes>
                <Route exact={true} path="/" element={<FrontPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/goods" element={<Goods />} />
                <Route path="/food" element={<Food />} />
                <Route path="/lesson" element={<Lesson />} />
                <Route path="/sharing" element={<Sharing />} />
                <Route path="/member" element={<Member />} />
                <Route path="/points" element={<Points />} />
                <Route path="/coupon" element={<Coupon />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </BrowserRouter>
    );

    return el;
}

export default App