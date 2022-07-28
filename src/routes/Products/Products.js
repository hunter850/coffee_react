import { Fragment, useState, useEffect } from "react";
import Header from "../../component/Products/Header";
// import Sort from "../../component/Course/Sort/Sort";
import Path from "../../component/Item/Path/Path";
import NavBar from "../../component/NavBar";
import BookMark from "../../component/Products/BookMark";
import List from "../../component/Products/List";
import axios from "axios";
import { productsDataGet } from "../../config/api-path";
import { chunk } from "../../component/Course/helper/chunk";

function Products() {
    // 判斷是否點擊搜尋按鈕
    const [searchSure, setSearchSure] = useState(false);
    // 總頁數,等伺服器抓完資料才知道多少(didMount時決定)
    const [pageTotal, setPageTotal] = useState(0);
    // -------------------------------------------------
    const [searchInp, setSearchInp] = useState("");
    const [productsRows, setproductsRow] = useState([]);
    const [renderData, setRenderData] = useState([]);
    const [DataRows, setDataRows] = useState({});
    const [pageNow, setPageNow] = useState(1);

    // ---------- AXIOS ----------------------------
    const getProductsData = () => {
        return axios.get(productsDataGet).then((res) => {
            const productsData = JSON.parse(JSON.stringify(res.data));
            console.log("productsData", productsData.rows);
            console.log("res.data", res.data);
            setproductsRow(productsData.rows);
            setRenderData(productsData.rows);
            setDataRows(productsData);
        });
    };

    const postProductsData = () => {
        return axios
            .post(productsDataGet, {
                search: searchInp,
            })
            .then((res) => {});
    };

    // ---------- AXIOS ----------------------------

    useEffect(() => {
        getProductsData();
    }, []);

    // 一般搜尋框搜尋的渲染
    useEffect(() => {
        if (searchSure === true) {
            setPageNow(1);
            const pageArray = chunk(productsRows, DataRows.perPage);
            if (pageArray.length > 0) {
                setPageTotal(pageArray.length);
                setRenderData(pageArray);
            }
            setSearchSure(false);
        }
    }, [searchSure]);

    const el = (
        <Fragment>
            <div className="Course-container">
                <NavBar />
                <Path pathObj={{ path: ["．商品列表"] }} />
                <Header
                    searchInp={searchInp}
                    setSearchInp={setSearchInp}
                    productsRows={productsRows}
                    searchSure={searchSure}
                    setSearchSure={setSearchSure}
                />
                <BookMark />
                {/* <Sort /> */}
                <div className="container">
                    <div className="d-flex f-w card-wrap">
                        <List
                            DataRows={DataRows}
                            productsRows={productsRows}
                            renderData={renderData}
                        />
                    </div>

                    <div className="d-flex f-jcc">
                        {Array(DataRows.totalPages)
                            .fill(1)
                            .map((v, i) => {
                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setPageNow(i + 1);
                                        }}
                                        className={`course-page-btn ${
                                            pageNow === i + 1
                                                ? "course-page-btn-focus"
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
        </Fragment>
    );
    return el;
}

export default Products;
