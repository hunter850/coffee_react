import PicRender from "./PicRender";
import Productinfo from "./Productinfo";
import "./DetailPage.scss";
import DetailBtm from "./DetailBtm";

function DetailPage(props) {
    const { renderData } = props;
    const el = (
        <div className="DetailPage">
            <div className="DetailTop">
                <PicRender renderData={renderData} />
                <Productinfo renderData={renderData} />
            </div>
            <DetailBtm renderData={renderData} />
        </div>
    );
    return el;
}

export default DetailPage;
