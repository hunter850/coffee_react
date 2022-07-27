import PicRender from "./PicRender";
import Productinfo from "./Productinfo";
import "./DetailTop.scss";

function DetailTop() {
    const el = (
        <div className="DetailTop">
            <PicRender />
            <Productinfo />
        </div>
    );
    return el;
}

export default DetailTop;
