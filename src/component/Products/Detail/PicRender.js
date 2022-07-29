import { Fragment, useEffect, useState } from "react";
import "./PicRender.scss";

function PicRender(props) {
    const { renderData, dataLoaded } = props;
    console.log(renderData);
    console.log(
        dataLoaded ? renderData[0].products_picMuti.split(",") : "還沒讀"
    );
    useEffect(() => {
        if (dataLoaded) {
            let imgLink = `http://localhost:3500/images/products/${renderData[0].products_with_products_categories_sid}/${renderData[0].products_pic}`;
            setimgSelect(imgLink);
        }
    }, [dataLoaded]);

    const [imgSelect, setimgSelect] = useState("");

    const el = (
        <div>
            <div className="productPic">
                <img
                    src={dataLoaded ? imgSelect : ""}
                    alt="main product's pic"
                    onChange={() => {
                        setimgSelect(imgSelect);
                    }}
                />
            </div>
            <div className="littlePic">
                {dataLoaded
                    ? renderData[0].products_picMuti.split(",").map((v, i) => {
                          return (
                              <Fragment key={i}>
                                  <img
                                      onClick={(e) => {
                                          setimgSelect(e.target.src);
                                      }}
                                      src={
                                          dataLoaded
                                              ? `http://localhost:3500/images/products/${
                                                    renderData[0]
                                                        .products_with_products_categories_sid
                                                }/${
                                                    renderData[0].products_picMuti.split(
                                                        ","
                                                    )[i]
                                                }`
                                              : ""
                                      }
                                      alt="small product's pic"
                                  />
                              </Fragment>
                          );
                      })
                    : ""}
            </div>
        </div>
    );
    return el;
}

export default PicRender;
