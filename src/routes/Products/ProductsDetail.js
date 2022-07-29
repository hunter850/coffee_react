import { Fragment, useEffect, useState } from "react";
import Path from "../../component/Item/Path/Path";
import NavBar from "../../component/NavBar";
import DetailPage from "../../component/Products/Detail/DetailPage";
import axios from "axios";
import { productsDataGet } from "../../config/api-path";
import { useParams } from "react-router-dom";

function ProductsDetail() {
    const { products_sid } = useParams();

    const [productsRows, setproductsRows] = useState([]);
    const [renderData, setRenderData] = useState([]);
    const [dataRows, setDataRows] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [productsCount, setproductsCount] = useState(1);

    const getProductsData = () => {
        return axios.get(productsDataGet).then((res) => {
            const productsData = JSON.parse(JSON.stringify(res.data));
            setproductsRows(productsData.rows);
            setRenderData(productsData.rows);
            setDataRows(productsData);

            console.log(
                productsRows.filter((v, i) => {
                    return +v.products_sid === +products_sid;
                })
            );
            const nowData = productsData.rows.filter((v, i) => {
                return +v.products_sid === +products_sid;
            });
            setRenderData(nowData);
            console.log(nowData);
            setDataLoaded(true);
        });
    };

    // RenderData---------------------------------------------
    // const sample = {
    //     products_forsale: 1,
    //     products_info:
    //         "AA TOP最高等級的肯亞咖啡豆其濃郁的黑梅香氣,口感豐富且尾韻悠長,轉化為肯亞特有的甜,一入口紅酒般的餘韻在口中揮之不去",
    //     products_intro:
    //         "產地:非洲\r\n處理法:水洗\r\n風味:黑梅/李子/葡萄\r\nAA TOP最高等級的肯亞咖啡豆其濃郁的黑梅香氣,口感豐富且尾韻悠長,轉化為肯亞特有的甜,一入口紅酒般的餘韻在口中揮之不去",
    //     products_name: "肯亞AA TOP(十包一入)",
    //     products_number: "1658890257",
    //     products_onsale: 0,
    //     products_pic: "bag1-1.jpg",
    //     products_picMuti: "bag1-1.jpg,bag1-2.jpg,bag1-3.jpg",
    //     products_price: 370,
    //     products_sid: 1,
    //     products_spec:
    //         "成分：100% 阿拉比卡咖啡豆\r\n商品規格：10g x 10包 　\r\n製造地：台灣\r\n保存期限：18個月，製造日期如包裝標示\r\n儲存方法：咖啡豆均屬新鮮烘焙，因此我們建議您最佳賞味期間內飲用完畢\r\n咖啡因含量：41.1mg / 包\r\n",
    //     products_stack: 3000,
    //     products_with_products_categories_sid: 1,
    // };
    //----------------------------------------------------------

    useEffect(() => {
        getProductsData();
    }, [dataLoaded]);

    const el = (
        <Fragment>
            <div className="Course-container">
                <NavBar />

                <Path
                    pathObj={{
                        path: [
                            "．商品列表",
                            `．${
                                dataLoaded ? renderData[0].products_name : ""
                            }`,
                        ],
                    }}
                    url={["/products"]}
                />
                <div className="container">
                    <DetailPage
                        renderData={renderData}
                        dataLoaded={dataLoaded}
                        productsCount={productsCount}
                        setproductsCount={setproductsCount}
                    />
                </div>
            </div>
        </Fragment>
    );
    return el;
}

export default ProductsDetail;
