import { Fragment } from "react";
import "./PicRender.scss";

function PicRender() {
    const el = (
        <div>
            <div className="productPic">
                <img
                    src="http://localhost:3500/images/products/bag-50/bag-09-01.jpg"
                    alt="main product's pic"
                />
            </div>
            <div className="littlePic">
                {Array(3)
                    .fill(1)
                    .map((v, i) => {
                        return (
                            <Fragment key={i}>
                                <img
                                    src={
                                        "http://localhost:3500/images/products/bag-50/bag-09-01.jpg"
                                    }
                                    alt="small product's pic"
                                />
                            </Fragment>
                        );
                    })}
            </div>
        </div>
    );
    return el;
}

export default PicRender;
