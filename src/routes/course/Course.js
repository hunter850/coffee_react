/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar/NavBar";
import Chatbot from "../../component/Bot/ChatBot";
import Card from "../../component/Item/Card/Card";
import Path from "../../component/Item/Path/Path";
import Header from "../../component/Course/Header/Header";
import Sort from "../../component/Course/Sort/Sort";
import axios from "axios";
import { courseDataGet } from "../../config/api-path";
import "./Course.css";
import numberConvertString from "../../component/Course/helper/numberConvertString";
import {
    priceAsc,
    priceDesc,
    levelAsc,
    levelDesc,
} from "../../component/Course/helper/sort";
import { chunk } from "../../component/Course/helper/chunk";
import { sortDataFun } from "../../component/Course/helper/sortDataFun";
import Modal from "../../component/Modal/Modal";
import Footer from '../../component/Footer';
import ScrollWrap from "../../component/Item/ScrollWrap/ScrollWrap";
import { useStyleChange } from '../../Contexts/SuperProvider';

const Course = () => {
    const [isOpen, setIsOpen] = useState(false);
    // 排序下拉選單的狀態 - 狀態提升放這邊
    const [sortData, setSortData] = useState("");
    // Header搜尋框的狀態 - 狀態提升放這邊
    const [searchInp, setSearchInp] = useState("");
    // 主要渲染畫面的資料
    const [courseData, setCourseData] = useState([]);
    // 備份的資料,提供給難度排序(因為資料庫來的是數字,所以需要使用深拷貝出來還未被轉成中文的)跟搜尋框清空時使用
    const [courseDataCopy, setCourseDataCopy] = useState([]);
    // 備份的資料,提供給價格排序跟一般搜尋使用
    const [dataDisplay, setDataDisplay] = useState([]);
    //預設第一頁
    const [pageNow, setPageNow] = useState(1);
    //預設一頁幾筆
    const [perPage, setPerPage] = useState(8);
    // 總頁數,等伺服器抓完資料才知道多少(didMount時決定)
    const [pageTotal, setPageTotal] = useState(0);

    const styleChange = useStyleChange();

    const getCourseData = () =>
        axios
            .get(courseDataGet)
            .then((res) => {
                // 深拷貝一組沒有把數字轉換成中文的資料, 難度排序時使用
                const newSortData = JSON.parse(JSON.stringify(res.data));
                const newCourseData = res.data;
                // 將資料庫的course_level數字轉換成中文
                numberConvertString(newCourseData);
                // 將資料分別存進兩個狀態
                setDataDisplay(newCourseData);
                setCourseDataCopy(newSortData);
                // 首次渲染的資料操作
                const pageArray = chunk(newCourseData, perPage);
                if (pageArray.length > 0) {
                    setPageTotal(pageArray.length);
                    setCourseData(pageArray);
                }

                // 排序 - 價錢低到高
                sortDataFun(
                    "priceAsc",
                    priceAsc,
                    dataDisplay,
                    perPage,
                    sortData,
                    setPageTotal,
                    setCourseData,
                    chunk
                );
                // 排序 - 價錢高到低
                sortDataFun(
                    "priceDesc",
                    priceDesc,
                    dataDisplay,
                    perPage,
                    sortData,
                    setPageTotal,
                    setCourseData,
                    chunk
                );
                // 排序 - 難度初級到高級
                sortDataFun(
                    "levelAsc",
                    levelAsc,
                    courseDataCopy,
                    perPage,
                    sortData,
                    setPageTotal,
                    setCourseData,
                    chunk,
                    numberConvertString
                );
                // 排序 - 難度高級到初級
                sortDataFun(
                    "levelDesc",
                    levelDesc,
                    courseDataCopy,
                    perPage,
                    sortData,
                    setPageTotal,
                    setCourseData,
                    chunk,
                    numberConvertString
                );
            })
            .catch((err) => {
                console.log(err.response);
            });



    // 向資料庫發請求,獲取資料
    useEffect(() => {
        getCourseData();
    }, [sortData]);

    // 搜尋框為空值時重置原始資料
    useEffect(() => {
        if (searchInp === "") {
            setSortData("");
            numberConvertString(courseDataCopy);
            const pageArray = chunk(courseDataCopy, perPage);
            if (pageArray.length > 0) {
                setPageTotal(pageArray.length);
                setCourseData(pageArray);
            }
        }
    }, [searchInp]);

    useEffect(() => {
        if (styleChange === 0) {
            window.scrollTo({ top: 0 });
        }
    }, [styleChange]);

    // 一般搜尋框搜尋的渲染
    const courseSearch = () => {
        setPageNow(1);
        if (searchInp !== "") {
            const newCourseData = dataDisplay.filter((v, i) => {
                return v.course_name.includes(searchInp);
            });
            const pageArray = chunk(newCourseData, perPage);
            if (pageArray.length > 0) {
                setPageTotal(pageArray.length);
                setCourseData(pageArray);
            } else {
                setIsOpen(true);
            }
        }
    };
    // 動態渲染資料
    const CourseData = (<div className="d-flex f-w card-wrap">
        {
            courseData.map((value, index) => {
                return courseData[index].map((v, i) => {
                    return (
                        <ScrollWrap
                            start={sortData === '' ? `coffee-cardaniwrapbf` : ''}
                            end={sortData === '' ? `coffee-cardaniwrapat` : ''}
                            offset={150}
                            key={v.course_sid}
                        >
                            <Link
                                to={`/course/detailed/${v.course_sid}`}
                            >
                                <Card
                                    courseData={{
                                        course_level: v.course_level,
                                        course_name: v.course_name,
                                        course_content:
                                            v.course_content,
                                        course_price: v.course_price,
                                        course_sid: v.course_sid,
                                        course_img_s: v.course_img_s,
                                    }}
                                />
                            </Link>
                        </ScrollWrap>
                    );
                });
            })}
    </div>);

    const el = (
        <Fragment>
            <div className="Course-container">
                <NavBar />
                <Path pathObj={{ path: ["．課程資訊"] }} />
                <Header
                    searchInp={searchInp}
                    setSearchInp={setSearchInp}
                    dataDisplay={dataDisplay}
                    setDataDisplay={setDataDisplay}
                    courseData={courseData}
                    setCourseData={setCourseData}
                    courseSearch={courseSearch}
                />
                <Sort
                    courseData={courseData}
                    sortData={sortData}
                    setSortData={setSortData}
                />
                <div className="container">
                    {courseData.length > 0 ? CourseData : ''}
                </div>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Modal.Body
                    style={{
                        textDecoration: "none",
                        color: "var(--BLUE)",
                        padding: "40px",
                    }}
                >
                    <h4>很抱歉，我們找不到"{searchInp}"相關的課程。</h4>
                </Modal.Body>
            </Modal>
            <Chatbot />
            <Footer />
        </Fragment>
    );
    return el;
};

export default Course;
