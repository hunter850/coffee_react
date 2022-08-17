/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Fragment, useState, useEffect } from "react";
import NavBar from "../../component/NavBar/NavBar";
import ManageHeader from "../../component/Course/CourseManage/ManageHeader/ManageHeader";
import List from "../../component/Course/CourseManage/List/List";
import Sort from "../../component/Course/Sort/Sort";
import axios from "axios";
import { courseDataGet } from "../../config/api-path";
import numberConvertString from "../../component/Course/helper/numberConvertString";
import {
    priceAsc,
    priceDesc,
    levelAsc,
    levelDesc,
} from "../../component/Course/helper/sort";
import { chunk } from "../../component/Course/helper/chunk";
import { sortDataFun } from "../../component/Course/helper/sortDataFun";
import MessageBox from '../../component/Item/MessageBox/MessageBox';
import Modal from "../../component/Modal/Modal";
import Footer from "../../component/Footer";
import { useAuth } from "../../component/Member/AuthContextProvider";
import Course from './Course';

const CourseManage = () => {
    const user_sid = Number(useAuth().sid);
    // 取得點擊的sid
    const [sid, setSid] = useState(0);
    // Modal控制器
    const [isOpen, setIsOpen] = useState(false);
    // 確定警示框點擊確定或取消 -1 是預設 0是false 1是true
    const [myBoolean, setMyBoolean] = useState(-1);
    // 獲取資料
    const [courseManageData, setCourseManageData] = useState([]);
    // 排序用的資料
    const [courseManageSortData, setCourseManageSortData] = useState([]);
    // 深拷貝的資料
    const [courseManageDataCopy, setCourseManageDataCopy] = useState([]);
    // 排序的狀態
    const [sortData, setSortData] = useState('');
    // 預設第一頁
    const [pageNow, setPageNow] = useState(1);
    // 預設一頁幾筆
    const [perPage, setPerPage] = useState(7);
    // 總頁數,等伺服器抓完資料才知道多少(didMount時決定)
    const [pageTotal, setPageTotal] = useState(0);
    // Header搜尋框的狀態 - 狀態提升放這邊
    const [searchInp, setSearchInp] = useState("");
    // 判斷是否點擊搜尋按鈕
    const [searchSure, setSearchSure] = useState(false);
    // 判斷是否刪除資料
    const [confirmDelete, setConfirmDelete] = useState(false);
    // 上一次渲染時的頁數
    const oldPageNow = pageNow;
    const courseManageDataGet = async () => {
        const res = await axios.get(courseDataGet);
        const newCourseData = JSON.parse(JSON.stringify(res.data));
        // lv資料數字轉中文
        numberConvertString(res.data);
        // setCourseManageData(res.data);
        // 深拷貝過的資料,保留lv的數字,供等級排序使用
        setCourseManageDataCopy(newCourseData);
        setCourseManageSortData(res.data);
        // 將資料切割成每一頁要展示的陣列,渲染出來
        const pageArray = chunk(res.data, perPage);

        // 如果切完的陣列長度少於上次渲染的頁數,將頁數跳至陣列長度的頁數
        // 如果長度.頁數相等則在當前頁面
        if (pageArray.length < oldPageNow) {
            setPageNow(pageArray.length);
        } else {
            setPageNow(oldPageNow);
        }

        if (pageArray.length > 0) {
            setPageTotal(pageArray.length);
            setCourseManageData(pageArray);
        }

        // 排序 - 價錢低到高
        sortDataFun('priceAsc', priceAsc, courseManageSortData, perPage, sortData, setPageTotal, setCourseManageData, chunk);
        // 排序 - 價錢高到低
        sortDataFun('priceDesc', priceDesc, courseManageSortData, perPage, sortData, setPageTotal, setCourseManageData, chunk);
        // 排序 - 難度初級到高級
        sortDataFun('levelAsc', levelAsc, courseManageDataCopy, perPage, sortData, setPageTotal, setCourseManageData, chunk, numberConvertString);
        // 排序 - 難度高級到初級
        sortDataFun('levelDesc', levelDesc, courseManageDataCopy, perPage, sortData, setPageTotal, setCourseManageData, chunk, numberConvertString);
    };

    useEffect(() => {
        courseManageDataGet();
        // 將確認刪除資料的狀態初始化
        setConfirmDelete(false);
    }, [sortData, confirmDelete, myBoolean]);

    // 一般搜尋框搜尋的渲染
    const courseSearch = () => {
        setPageNow(1);
        if (searchInp !== "") {
            const newCourseData = courseManageSortData.filter((v, i) => {
                return v.course_name.includes(searchInp);
            });
            const pageArray = chunk(newCourseData, perPage);
            if (pageArray.length > 0) {
                setPageTotal(pageArray.length);
                setCourseManageData(pageArray);
            } else {
                setIsOpen(true);
            }
        }
    };

    // 搜尋框為空值時重置原始資料
    useEffect(() => {
        if (searchInp === "") {
            setSortData('');
            numberConvertString(courseManageDataCopy);
            const pageArray = chunk(courseManageDataCopy, perPage);
            if (pageArray.length > 0) {
                setPageTotal(pageArray.length);
                setCourseManageData(pageArray);
            }
        }
    }, [searchInp]);
    // 警示窗點了確定還是取消
    const returnBoolean = (boolean) => {
        if (boolean === true) {
            setMyBoolean(1);
        } else {
            setMyBoolean(0);
            setSid(0);
        }
    };

    const searchError = <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Body
            style={{
                textDecoration: "none",
                color: "var(--BLUE)",
                padding: "40px",
            }}
        >
            <h4>很抱歉，我們找不到"{searchInp}"相關的課程。</h4>
        </Modal.Body>
    </Modal>;


    const detailedModal = <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeButton={false} style={{ overflow: "visible" }}>
        <Modal.Body style={{ padding: '0' }}>
            <MessageBox returnBoolean={returnBoolean} courseManageDataCopy={courseManageDataCopy} sid={sid} isOpen={isOpen} />
        </Modal.Body>
    </Modal>;

    const el = (
        <Fragment>
            <div className="CourseManage-wrap">
                <div className="CourseManage-container">
                    <NavBar />
                    {sid !== 0 && isOpen === true ? detailedModal : ''}
                    <div className="ManageHeader">
                        <ManageHeader courseManageSortData={courseManageSortData} searchInp={searchInp} setSearchInp={setSearchInp} setCourseManageSortData={setCourseManageSortData} setSearchSure={setSearchSure} courseSearch={courseSearch} />
                    </div>
                    <Sort sortclass={"sortGrey"} courseData={courseManageData} setSortData={setSortData} sortData={sortData} />
                    <div className="container" style={{ paddingBottom: 60 }}>
                        {courseManageData.length > 0 &&
                            courseManageData[pageNow - 1].map((v, i) => {
                                return (
                                    <List
                                        key={v.course_sid}
                                        courseData={{
                                            course_level: v.course_level,
                                            course_name: v.course_name,
                                            course_price: v.course_price,
                                            course_img_s: v.course_img_s,
                                            course_sid: v.course_sid
                                        }}
                                        setConfirmDelete={setConfirmDelete}
                                        setIsOpen={setIsOpen}
                                        isOpen={isOpen}
                                        setMyBoolean={setMyBoolean}
                                        myBoolean={myBoolean}
                                        setSid={setSid}
                                        sid={sid}
                                        confirmDelete={confirmDelete}
                                    />
                                );
                            })}
                    </div>
                    <div className="d-flex f-jcc">
                        {Array(pageTotal)
                            .fill(1)
                            .map((v, i) => {
                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setPageNow(i + 1);
                                        }}
                                        className={`course-page-btn ${pageNow === i + 1
                                            ? "course-manage-page-btn-focus"
                                            : ""
                                            }`}
                                    >
                                        {i + 1}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            {searchInp !== "" && sid === 0 ? searchError : ''}
            <Footer />
        </Fragment>
    );

    return (user_sid === 2 ? el : <Course />);
};

export default CourseManage;
