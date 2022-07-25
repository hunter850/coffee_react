/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import Carousel from "../../component/Course/CourseDetailed/Carousel/Carousel";
import Banner from "../../component/Course/CourseDetailed/Banner/Banner";
import CoursePath from "../../component/Course/CourseDetailed/CoursePath/CoursePath";
import CourseContent from "../../component/Course/CourseDetailed/CourseContent/CourseContent";
import axios from "axios";
import { courseDataGet } from "../../config/api-path";
// import { courseDataFkGet } from "../../config/api-path";

const CourseDetailed = () => {
    // 每一個區塊離top多遠的狀態
    const [object, setObject] = useState(0);
    const [material, setMaterial] = useState(0);
    const [signup, setSignup] = useState(0);
    const [notice, setNotice] = useState(0);
    const [item, setItem] = useState(0);
    // 儲存Line Pay跳轉url
    const [url, setUrl] = useState('');

    //確認每次進頁面跳到0,0的位子
    const [topZeroSure, setTopZeroSure] = useState(false);

    // 得到的sid與資料庫sid相同的資料
    const [courseDetailedData, setCourseDetailedData] = useState([]);

    // 外鍵資料
    // const [courseDataFk, setCourseDataFk] = useState([]);

    // 確認是否有拿到資料
    const [start, setStart] = useState(false);

    //選擇人數的增減控制器 - 狀態提升
    const [count, setCount] = useState(1);

    // 對照sid當筆資料的價格 - 狀態提升
    const [courseDataPrice, setCourseDataPrice] = useState(0);

    // 取得點擊哪一張卡片進來詳細頁的sid
    const { sid } = useParams();

    // Line Pay 訂單請求發送 - click事件(報名課程)
    const sendOrder = () => {
        if (start === true) {
            const { course_name, course_price } = courseDetailedData[0];

            const orders = {
                amount: course_price * count,
                currency: 'TWD',
                packages: [
                    {
                        id: sid,
                        amount: course_price * count,
                        products: [
                            {
                                name: course_name,
                                quantity: count,
                                price: course_price,
                            }
                        ]
                    }
                ],
                orderId: sid
            };
            axios({
                method: 'post',
                url: `http://localhost:3500/course/createOrder/${JSON.stringify(orders)}`,
            })
                .then((res) => {
                    console.log(res.data);
                    setUrl(res.data);
                });
        }
    };

    // 外鍵資料獲取
    // const getCourseDataFk = () => {
    //     axios.get(courseDataFkGet)
    //         .then((res) => {
    //             const newCourseDataFk = res.data.filter((v, i) => {
    //                 return Number(v.course_sid) === Number(sid);
    //             });
    //             setCourseDataFk(newCourseDataFk);
    //             console.log(newCourseDataFk);
    //         });
    // };

    const getCourseDetailedData = () => {
        axios.get(courseDataGet)
            .then((res) => {
                // console.log(res.data);
                const newCourseGetData = res.data.filter((v, i) => {
                    return Number(v.course_sid) === Number(sid);
                });
                // 從get來的資料中只篩選出指定sid當筆資料
                setCourseDetailedData(newCourseGetData);
                // 確認得到資料了才給渲染,否則會出錯
                setStart(true);
                setCourseDataPrice(start ? courseDetailedData[0].course_price : '');
            });
    };

    // 外鍵 - 取得當前sid外鍵資料
    // useEffect(() => {
    //     getCourseDataFk();
    // }, []);

    // 完成付款後頁面自動跳轉
    useEffect(() => {
        if (url !== '') {
            window.location.href = url;
        }
    }, [url]);

    useEffect(() => {
        //一進頁面到top 0
        window.scrollTo(0, 0);
        setTopZeroSure(true);
    }, []);

    // 取得當前sid資料
    useEffect(() => {
        getCourseDetailedData();
    }, [sid, start]);

    const el = (
        <Fragment>
            <div className="CourseDetailed-container">
                <NavBar />
                <Path
                    pathObj={{
                        path: [
                            "．課程資訊",
                            `．${start ? courseDetailedData[0].course_name : ""
                            }`,
                        ],
                    }}
                    backgroundColor={"#fff"}
                    url={["/course"]}
                />
                <Carousel />
                <Banner courseDetailedData={courseDetailedData} start={start} />
            </div>
            <div style={{ backgroundColor: "#FBFBFA" }}>
                <div className="container d-flex CourseContent-wrap">
                    <CoursePath object={object} material={material} signup={signup} notice={notice} item={item} topZeroSure={topZeroSure} />
                    <CourseContent count={count} setCount={setCount} courseDataPrice={courseDataPrice} object={object} material={material} signup={signup} notice={notice} item={item} setObject={setObject} setMaterial={setMaterial} setSignup={setSignup} setNotice={setNotice} setItem={setItem} topZeroSure={topZeroSure} sendOrder={sendOrder} />
                </div>
            </div>
        </Fragment>
    );

    return el;
};

export default CourseDetailed;
