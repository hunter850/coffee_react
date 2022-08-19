import { Fragment, useEffect, useState } from "react";
import "./PicRender.scss";
import Magnifier from "react-magnifier";

function PicRender(props) {
    const { renderData, dataLoaded, tagData } = props;
    // console.log(renderData);
    // console.log(
    //     dataLoaded ? renderData[0].products_picMuti.split(",") : "還沒讀"
    // );
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
                <Magnifier
                    src={dataLoaded ? imgSelect : ""}
                    alt="main product's pic"
                    onChange={() => {
                        setimgSelect(imgSelect);
                    }}
                    mgShowOverflow={false}
                    zoomFactor={2}
                    width={"100%"}
                    height={"380px"}
                    mgWidth={100}
                    mgHeight={100}
                />
                {/* <img
                    src={dataLoaded ? imgSelect : ""}
                    alt="main product's pic"
                    onChange={() => {
                        setimgSelect(imgSelect);
                    }}
                /> */}
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
            <div className="tagWrap">
                <p>標籤：</p>
                {tagData
                    .filter((v, i) => {
                        return v.products_sid === renderData[0].products_sid;
                    })
                    .map((v, i) => {
                        return (
                            <div className="card_tag" key={i}>
                                {v.products_style_filter_categories}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
    return el;
}

export default PicRender;
