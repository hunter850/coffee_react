import { Fragment, useState } from "react";
import Path from "../../component/Item/Path/Path";
import NavBar from "../../component/NavBar";
import DetailPage from "../../component/Products/Detail/DetailPage";
import axios from "axios";
import { productsDataGet } from "../../config/api-path";

function ProductsDetail() {
    const [productsRows, setproductsRow] = useState([]);
    const [renderData, setRenderData] = useState([]);
    const [DataRows, setDataRows] = useState({});

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

    const [products_name] = useState("");
    const el = (
        <Fragment>
            <div className="Course-container">
                <NavBar />
                <Path pathObj={{ path: ["．商品列表．", products_name] }} />

                <div className="container">
                    <DetailPage renderData={renderData} />
                </div>
            </div>
        </Fragment>
    );
    return el;
}

export default ProductsDetail;
