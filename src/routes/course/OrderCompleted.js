/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// import "./OrderCompleted.scss";
import NavBar from "../../component/NavBar/NavBar";
import axios from "axios";
import { courseDataGet } from "../../config/api-path";
import { useEffect, useState } from "react";
import Footer from "../../component/Footer";
import OrderDetails from "./components/OrderDetails";

function OrderCompleted() {
    // 存當筆訂單的資料
    const [courseData, setCourseData] = useState({});
    // 取得網址裡的sid
    const getSid = window.location.href;
    const url = new URL(getSid);
    url.searchParams.get("orderId");
    const courseSid = url.searchParams.get("orderId");
    const orderNumber = parseInt(new Date() / 1000);
    // 取得當筆訂單的資訊
    const getCourseData = () => {
        axios.get(courseDataGet).then((res) => {
            res.data.map((v, i) => {
                if (Number(v.course_sid) === Number(courseSid)) {
                    return setCourseData(v);
                }
            });
        });
    };
    useEffect(() => {
        getCourseData();
    }, []);

    return (
        <>
            <NavBar />
            <div className="container">
                <OrderDetails>
                    <OrderDetails.Wrap>
                        <OrderDetails.Header>
                            <h6>您購買的課程為</h6>
                            <br />
                            <h6 style={{ color: "#253945" }}>
                                {courseData.course_name}
                            </h6>
                            <br />
                            <h5>注意事項:</h5>
                        </OrderDetails.Header>
                        <OrderDetails.Body>
                            <br />
                            ‧為防範新型冠狀病毒及配合政府防疫，講師與工作人員已完成疫苗三劑施打，主辦單位課程措施如下，請學員務必配合：
                            <br />
                            <br />
                            ‧杯測教學時，主辦單位為每位學員備有獨立杯測桌、杯測勺、陶瓷濃縮杯等相關器材，不會與其他學員交叉杯測。
                            <br />
                            <br />
                            ‧課程人數（含講師與工作人員）不超過8位；課程地點寬敞，並開設多處窗戶以保持環境通風。
                            <br />
                            <br />
                            ‧入場前，請先進行額溫量測。若體溫超過37.5度，不予入場，並辦理全額退費。
                            <br />
                            <br />
                            ‧授課期間，請學員自備口罩，除飲食外需全程配戴。
                            <br />
                            <br />
                            ‧請使用主辦單位提供之酒精清潔手部。
                            <br />
                            <br />
                            ‧如遇颱風、自然天災等不可抗拒之因素，依台北市政府任一單位公告停課即延期，本單位將通知擇日補課。
                            <br />
                            <br />
                        </OrderDetails.Body>
                    </OrderDetails.Wrap>
                    <OrderDetails.Footer>
                        <div>訂單編號</div>
                        <div>{orderNumber}</div>
                    </OrderDetails.Footer>
                </OrderDetails>
            </div>
            <Footer />
        </>
    );
}

export default OrderCompleted;
