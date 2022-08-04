import "./FoodAsideSummary.css";
import "./FoodAsideCount";
import FoodAsideCount from "./FoodAsideCount";
import axios from "axios";
import { useContext } from "react";
import { foodData } from "../../../config/api-path";
import AuthContext from "../../Member/AuthContext";
import { useNavigate } from "react-router-dom";
// import { useGetCart } from "../../../component/NavBar/NavWrap";

// function FoodAsideSummary({ setIsShowAside, dataFromFoodDetail }) {
function FoodAsideSummary({
    dataFromFoodDetail,
    show,
    setDataFromSummary,
    dataFromDateTime,
    dataFromDate,
    setShowDate,
    setShowMap,
    selectedAddress,
    setDataFromFoodDetail,
    setIsOpen,
}) {
    const asideClass = show ? "aside" : "aside hide";

    const navigate = useNavigate();
    // const { getCount,count } = useGetCart();
    // console.log("useGetCart", count);

    const totalPrice = dataFromFoodDetail.reduce(
        (accumulator, { menu_price_m, foodCount }) =>
            accumulator + menu_price_m * foodCount,
        0
    );
    const Auth = useContext(AuthContext);
    console.log("Auth", Auth);
    console.log("dataFromFoodDetail", dataFromFoodDetail);
    const { store_name, store_block, store_road, store_sid } = selectedAddress;

    const standardTime = dataFromDate + " " + dataFromDateTime + ":00";
    //
    const checkOut =
        store_name && dataFromDate && dataFromDateTime
            ? "pay "
            : "pay disabled";
    const handleSubmission = (e) => {
        // e.preventDefault();
        if (Auth.sid)
            axios({
                method: "post",
                url: foodData,
                data: {
                    dataFromFoodDetail,
                    standardTime,
                    store_sid,
                    member: Auth ? Auth : "沒東西",
                },

                "content-type": "application/json",
            }).then((response) => {
                // console.log(response);
                navigate("/cart");
            });
        else {
            setIsOpen(true);
            console.log("QQ");
        }
    };
    // "content-type": "application/json",

    return (
        <>
            <div className={asideClass}>
                {/* <div className="aside-area"> */}
                <div className="top">
                    <h6 className="mydetail">你的餐點詳細</h6>
                    {/* <div
                            onClick={() => {
                                setIsShowAside(false);
                            }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_2822_4517)">
                                    <path
                                        d="M50 93.75C38.3968 93.75 27.2688 89.1406 19.0641 80.9359C10.8594 72.7312 6.25 61.6032 6.25 50C6.25 38.3968 10.8594 27.2688 19.0641 19.0641C27.2688 10.8594 38.3968 6.25 50 6.25C61.6032 6.25 72.7312 10.8594 80.9359 19.0641C89.1406 27.2688 93.75 38.3968 93.75 50C93.75 61.6032 89.1406 72.7312 80.9359 80.9359C72.7312 89.1406 61.6032 93.75 50 93.75ZM50 100C63.2608 100 75.9785 94.7322 85.3553 85.3553C94.7322 75.9785 100 63.2608 100 50C100 36.7392 94.7322 24.0215 85.3553 14.6447C75.9785 5.26784 63.2608 0 50 0C36.7392 0 24.0215 5.26784 14.6447 14.6447C5.26784 24.0215 0 36.7392 0 50C0 63.2608 5.26784 75.9785 14.6447 85.3553C24.0215 94.7322 36.7392 100 50 100V100Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M29.0375 29.0375C29.3278 28.7465 29.6726 28.5156 30.0523 28.358C30.4319 28.2005 30.839 28.1194 31.25 28.1194C31.661 28.1194 32.0681 28.2005 32.4477 28.358C32.8274 28.5156 33.1722 28.7465 33.4625 29.0375L50 45.5813L66.5375 29.0375C66.828 28.747 67.173 28.5165 67.5526 28.3592C67.9322 28.202 68.3391 28.1211 68.75 28.1211C69.1609 28.1211 69.5678 28.202 69.9474 28.3592C70.327 28.5165 70.672 28.747 70.9625 29.0375C71.2531 29.328 71.4835 29.673 71.6408 30.0526C71.798 30.4322 71.8789 30.8391 71.8789 31.25C71.8789 31.6609 71.798 32.0678 71.6408 32.4474C71.4835 32.827 71.2531 33.172 70.9625 33.4625L54.4187 50L70.9625 66.5375C71.2531 66.828 71.4835 67.173 71.6408 67.5526C71.798 67.9322 71.8789 68.3391 71.8789 68.75C71.8789 69.1609 71.798 69.5678 71.6408 69.9474C71.4835 70.327 71.2531 70.672 70.9625 70.9625C70.672 71.2531 70.327 71.4835 69.9474 71.6408C69.5678 71.798 69.1609 71.8789 68.75 71.8789C68.3391 71.8789 67.9322 71.798 67.5526 71.6408C67.173 71.4835 66.828 71.2531 66.5375 70.9625L50 54.4187L33.4625 70.9625C33.172 71.2531 32.827 71.4835 32.4474 71.6408C32.0678 71.798 31.6609 71.8789 31.25 71.8789C30.8391 71.8789 30.4322 71.798 30.0526 71.6408C29.673 71.4835 29.328 71.2531 29.0375 70.9625C28.747 70.672 28.5165 70.327 28.3592 69.9474C28.202 69.5678 28.1211 69.1609 28.1211 68.75C28.1211 68.3391 28.202 67.9322 28.3592 67.5526C28.5165 67.173 28.747 66.828 29.0375 66.5375L45.5813 50L29.0375 33.4625C28.7465 33.1722 28.5156 32.8274 28.358 32.4477C28.2005 32.0681 28.1194 31.661 28.1194 31.25C28.1194 30.839 28.2005 30.4319 28.358 30.0523C28.5156 29.6726 28.7465 29.3278 29.0375 29.0375Z"
                                        fill="black"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2822_4517">
                                        <rect
                                            width="100"
                                            height="100"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div> */}
                </div>
                <div className="middle">
                    <div className="txt">
                        <div className="takeout">
                            <h6>自取門市</h6>
                            <h6
                                onClick={() => {
                                    setShowMap(true);
                                }}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M24.2219 3.03138C24.3679 3.17782 24.4499 3.37616 24.4499 3.58294C24.4499 3.78972 24.3679 3.98806 24.2219 4.1345L22.5922 5.76575L19.4672 2.64075L21.0969 1.0095C21.2434 0.863039 21.4421 0.780762 21.6493 0.780762C21.8564 0.780762 22.0551 0.863039 22.2016 1.0095L24.2219 3.02981V3.03138ZM21.4875 6.86888L18.3625 3.74388L7.71723 14.3908C7.63124 14.4767 7.5665 14.5816 7.52817 14.697L6.27036 18.4689C6.24755 18.5376 6.24431 18.6114 6.261 18.6819C6.2777 18.7524 6.31367 18.8169 6.3649 18.8681C6.41613 18.9193 6.48059 18.9553 6.55109 18.972C6.62159 18.9887 6.69534 18.9854 6.76411 18.9626L10.536 17.7048C10.6512 17.6669 10.7561 17.6027 10.8422 17.5173L21.4875 6.87044V6.86888Z"
                                        fill="#253945"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M1.5625 21.0938C1.5625 21.7154 1.80943 22.3115 2.24897 22.751C2.68851 23.1906 3.28465 23.4375 3.90625 23.4375H21.0938C21.7154 23.4375 22.3115 23.1906 22.751 22.751C23.1906 22.3115 23.4375 21.7154 23.4375 21.0938V11.7188C23.4375 11.5115 23.3552 11.3128 23.2087 11.1663C23.0622 11.0198 22.8635 10.9375 22.6562 10.9375C22.449 10.9375 22.2503 11.0198 22.1038 11.1663C21.9573 11.3128 21.875 11.5115 21.875 11.7188V21.0938C21.875 21.301 21.7927 21.4997 21.6462 21.6462C21.4997 21.7927 21.301 21.875 21.0938 21.875h4.90625C3.69905 21.875 3.50034 21.7927 3.35382 21.6462C3.20731 21.4997 3.125 21.301 3.125 21.0938V3.90625C3.125 3.69905 3.20731 3.50034 3.35382 3.35382C3.50034 3.20731 3.69905 3.125 3.90625 3.125H14.0625C14.2697 3.125 14.4684 3.04269 14.6149 2.89618C14.7614 2.74966 14.8438 2.55095 14.8438 2.34375C14.8438 2.13655 14.7614 1.93784 14.6149 1.79132C14.4684 1.64481 14.2697 1.5625 14.0625 1.5625h4.90625C3.28465 1.5625 2.68851 1.80943 2.24897 2.24897C1.80943 2.68851 1.5625 3.28465 1.5625 3.90625V21.0938Z"
                                        fill="#253945"
                                    />
                                </svg>
                            </h6>
                        </div>
                        <div className="edit">
                            <p>{store_name}</p>
                            <p className="bottom">
                                {store_road} {store_block}
                            </p>
                        </div>
                    </div>
                    <div className="txt">
                        <div className="takeout">
                            <h6>自取時間</h6>
                            <h6
                                onClick={() => {
                                    setShowDate(true);
                                }}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M24.2219 3.03138C24.3679 3.17782 24.4499 3.37616 24.4499 3.58294C24.4499 3.78972 24.3679 3.98806 24.2219 4.1345L22.5922 5.76575L19.4672 2.64075L21.0969 1.0095C21.2434 0.863039 21.4421 0.780762 21.6493 0.780762C21.8564 0.780762 22.0551 0.863039 22.2016 1.0095L24.2219 3.02981V3.03138ZM21.4875 6.86888L18.3625 3.74388L7.71723 14.3908C7.63124 14.4767 7.5665 14.5816 7.52817 14.697L6.27036 18.4689C6.24755 18.5376 6.24431 18.6114 6.261 18.6819C6.2777 18.7524 6.31367 18.8169 6.3649 18.8681C6.41613 18.9193 6.48059 18.9553 6.55109 18.972C6.62159 18.9887 6.69534 18.9854 6.76411 18.9626L10.536 17.7048C10.6512 17.6669 10.7561 17.6027 10.8422 17.5173L21.4875 6.87044V6.86888Z"
                                        fill="#253945"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M1.5625 21.0938C1.5625 21.7154 1.80943 22.3115 2.24897 22.751C2.68851 23.1906 3.28465 23.4375 3.90625 23.4375H21.0938C21.7154 23.4375 22.3115 23.1906 22.751 22.751C23.1906 22.3115 23.4375 21.7154 23.4375 21.0938V11.7188C23.4375 11.5115 23.3552 11.3128 23.2087 11.1663C23.0622 11.0198 22.8635 10.9375 22.6562 10.9375C22.449 10.9375 22.2503 11.0198 22.1038 11.1663C21.9573 11.3128 21.875 11.5115 21.875 11.7188V21.0938C21.875 21.301 21.7927 21.4997 21.6462 21.6462C21.4997 21.7927 21.301 21.875 21.0938 21.875h4.90625C3.69905 21.875 3.50034 21.7927 3.35382 21.6462C3.20731 21.4997 3.125 21.301 3.125 21.0938V3.90625C3.125 3.69905 3.20731 3.50034 3.35382 3.35382C3.50034 3.20731 3.69905 3.125 3.90625 3.125H14.0625C14.2697 3.125 14.4684 3.04269 14.6149 2.89618C14.7614 2.74966 14.8438 2.55095 14.8438 2.34375C14.8438 2.13655 14.7614 1.93784 14.6149 1.79132C14.4684 1.64481 14.2697 1.5625 14.0625 1.5625h4.90625C3.28465 1.5625 2.68851 1.80943 2.24897 2.24897C1.80943 2.68851 1.5625 3.28465 1.5625 3.90625V21.0938Z"
                                        fill="#253945"
                                    />
                                </svg>
                            </h6>
                        </div>
                        <div className="edit">
                            <p>{dataFromDate}</p>
                            <p className="bottom">{dataFromDateTime}</p>
                        </div>
                    </div>
                    <div className="wrapper">
                        {dataFromFoodDetail.map((item) => (
                            <FoodAsideCount
                                item={item}
                                key={item.timeID}
                                dataFromFoodDetail={dataFromFoodDetail}
                                setDataFromCount={setDataFromSummary}
                                removeItem={() => {
                                    const newOrder = dataFromFoodDetail.filter(
                                        (val) => {
                                            return item.timeID !== val.timeID;
                                        }
                                    );
                                    setDataFromFoodDetail(newOrder);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="payarea">
                    <div className="payarea1">
                        <p className="finaltotal">合計</p>
                        <p>${totalPrice}</p>
                    </div>
                    <div className={checkOut} onClick={handleSubmission}>
                        去結帳
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    );
}
export default FoodAsideSummary;
