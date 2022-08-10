import { Fragment, useState, useEffect } from "react";
import Header from "../../component/Products/Header";
// import Sort from "../../component/Course/Sort/Sort";
import Path from "../../component/Item/Path/Path";
import NavBar from "../../component/NavBar/NavBar";
import BookMark from "../../component/Products/BookMark";
import List from "../../component/Products/List";
import axios from "axios";
import { productsDataGet } from "../../config/api-path";
import { chunk } from "../../component/Course/helper/chunk";
import "./Products.scss";

import ChatBot from "../../component/Bot/ChatBot";

function Products() {
    // 總頁數,等伺服器抓完資料才知道多少(didMount時決定)
    const [pageTotal, setPageTotal] = useState(0);
    // -------------------------------------------------
    const [searchInp, setSearchInp] = useState("");
    const [renderData, setRenderData] = useState([]);
    const [DataRows, setDataRows] = useState({});
    const [fetchData, setFetchData] = useState({});
    const [pageNow, setPageNow] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [cardStyle, setCardStyle] = useState("card_card");
    const [isOpen, setIsOpen] = useState(false);

    let saveTotalData = [];
    let fetchingData = [];
    let pageData = [];
    // ---------- AXIOS ----------------------------
    const getProductsData = () => {
        return axios.get(productsDataGet).then((res) => {
            const productsData = JSON.parse(JSON.stringify(res.data));
            saveTotalData = productsData.totalData;
            fetchingData = productsData;
            pageData = productsData.rows;
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
        async function fetchFunc() {
            await getProductsData();
            await setDataRows(saveTotalData);
            await setFetchData(fetchingData);
            const pagechunk = await chunk(saveTotalData, 8);
            // await console.log("pagechunk", pagechunk);
            await setRenderData(pagechunk);
            await setPageTotal(pagechunk.length);
            await setDataLoaded(true);
        }
        fetchFunc();
    }, [setDataLoaded]);

    // DataRows 全部產品資料
    // (62) [{...},{...},{...},{...},{...}...]
    // renderData 一頁內的內容
    // (8) [{...},{...},{...},{...},{...},{...},{...},{...},]
    // fetchData 來自後端的全部資料
    //
    useEffect(() => {
        // const pagechunk = chunk(DataRows, 8);
        // console.log("renderData", renderData);
        // setRenderData(pagechunk[+pageNow - 1]);
    }, [pageNow]);

    const el = (
        <Fragment>
            <div className="Course-container products_page">
                <NavBar />
                <Path pathObj={{ path: ["．商品列表"] }} />
                <Header
                    searchInp={searchInp}
                    setSearchInp={setSearchInp}
                    DataRows={DataRows}
                    setDataRows={setDataRows}
                    setRenderData={setRenderData}
                    setPageNow={setPageNow}
                    setPageTotal={setPageTotal}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
                <BookMark
                    DataRows={DataRows}
                    renderData={renderData}
                    setRenderData={setRenderData}
                    dataLoaded={dataLoaded}
                    setPageTotal={setPageTotal}
                    setPageNow={setPageNow}
                />
                <div className="container">
                    <div className="d-flex f-w card-wrap">
                        <List
                            dataLoaded={dataLoaded}
                            DataRows={DataRows}
                            renderData={renderData}
                            cardStyle={cardStyle}
                            setCardStyle={setCardStyle}
                            pageNow={pageNow}
                            pageTotal={pageTotal}
                        />
                    </div>

                    {/* <div className="d-flex f-jcc">
                        {Array(pageTotal)
                            .fill(1)
                            .map((v, i) => {
                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setPageNow(i);
                                        }}
                                        className={`course-page-btn ${
                                            pageNow === i
                                                ? "course-page-btn-focus"
                                                : ""
                                        }`}
                                    >
                                        {i + 1}
                                    </div>
                                );
                            })}
                    </div> */}
                </div>
            </div>
            <ChatBot />
        </Fragment>
    );
    return el;
}

export default Products;
