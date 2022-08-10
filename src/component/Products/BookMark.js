import React, { useEffect } from "react";
import Btn from "../Item/Btn/Btn";
import "./BookMark.scss";
import "../../component/Course/helper/chunk";
import { chunk } from "lodash";

function BookMark(props) {
    const {
        DataRows,
        dataLoaded,
        setRenderData,
        setPageTotal,
        setPageNow,
        setProductsScroll,
    } = props;

    // const setRenderData = () => {};
    // console.log("BM", DataRows);
    const sortBycate = (cateNum) => {
        // console.log("BM", DataRows);
        if (DataRows.length > 0) {
            const newRender = DataRows.filter((v, i) => {
                return (
                    DataRows[i].products_with_products_categories_sid ===
                    cateNum
                );
            });
            // console.log(newRender);
            const resetPage = chunk(newRender, 8);
            // console.log("resetPage", resetPage);
            setRenderData(resetPage);
            setPageTotal(resetPage.length);
            setPageNow(0);
        }
    };

    // useEffect(() => {
    //     // sortBycate(2);
    // }, [dataLoaded]);
    return (
        <>
            <ul className="products_Bookmark">
                <li>
                    <Btn
                        children={"全部"}
                        width={"76px"}
                        onClick={() => {
                            const resetPage = chunk(DataRows, 8);
                            setPageTotal(resetPage.length);
                            setPageNow(0);
                            setRenderData(resetPage);
                            setProductsScroll(true);
                        }}
                    />
                </li>
                <li>
                    <Btn
                        children={"濾掛式咖啡"}
                        width={"130px"}
                        onClick={() => {
                            sortBycate(1);
                            setProductsScroll(true);
                        }}
                    />
                </li>
                <li>
                    <Btn
                        children={"咖啡豆"}
                        width={"94px"}
                        onClick={() => {
                            sortBycate(2);
                            setProductsScroll(true);
                        }}
                    />
                </li>
                <li>
                    <Btn
                        children={"周邊及器具"}
                        width={"130px"}
                        onClick={() => {
                            sortBycate(3);
                            setProductsScroll(true);
                        }}
                    />
                </li>
                <li>
                    <Btn
                        children={"禮盒"}
                        width={"76px"}
                        onClick={() => {
                            sortBycate(4);
                            setProductsScroll(true);
                        }}
                    />
                </li>
                <li>
                    <Btn
                        children={"禮券及餐券"}
                        width={"130px"}
                        onClick={() => {
                            sortBycate(5);
                            setProductsScroll(true);
                        }}
                    />
                </li>
            </ul>
        </>
    );
}

export default BookMark;
