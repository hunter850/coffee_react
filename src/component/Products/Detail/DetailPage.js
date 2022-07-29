import PicRender from "./PicRender";
import Productinfo from "./Productinfo";
import "./DetailPage.scss";
import DetailBtm from "./DetailBtm";

function DetailPage(props) {
    const { renderData, dataLoaded, productsCount, setproductsCount } = props;
    const el = (
        <div className="DetailPage">
            <div className="DetailTop">
                <PicRender renderData={renderData} dataLoaded={dataLoaded} />
                <Productinfo
                    renderData={renderData}
                    dataLoaded={dataLoaded}
                    productsCount={productsCount}
                    setproductsCount={setproductsCount}
                />
            </div>
            <DetailBtm renderData={renderData} dataLoaded={dataLoaded} />
        </div>
    );
    return el;
}

export default DetailPage;
