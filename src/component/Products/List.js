import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./List.scss";
import ScrollWrap from "../../component/Item/ScrollWrap/ScrollWrap";

function List(props) {
    const {
        renderData,
        dataLoaded,
        cardStyle,
        setCardStyle,
        pageNow,
        pageTotal,
    } = props;
    // const nowPageNum = renderData[`${pageNow}`];

    let pageNum = Number(pageNow);
    useEffect(() => {
        // console.log("renderData", renderData);
        // console.log("renderData[+pageNow]", renderData[pageNum]);
        // console.log("pageNow", pageNow);
    }, [dataLoaded]);
    return (
        <>
            <div className="products_list">
                <div className="list_title">
                    <h3 className="title-font">商品列表</h3>
                    <div style={{ display: "flex" }}>
                        <div
                            onClick={() => {
                                setCardStyle("card_card");
                            }}
                            className={"products_cardstyle_svg"}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-grid-3x2-gap-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9z" />
                            </svg>
                        </div>
                        <div
                            onClick={() => {
                                setCardStyle("card_row");
                            }}
                            className={"products_cardstyle_svg"}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-list-ul"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="card_regin">
                    <ul>
                        {dataLoaded
                            ? renderData.map((va, ia) => {
                                  return renderData[ia].map((v, i) => {
                                      return (
                                          <ScrollWrap
                                              start="cardaniwrapbf"
                                              end="cardaniwrapat"
                                              offset={50}
                                              //   backAgain={true}
                                              //   backOffset={-5}
                                              component="li"
                                              key={v.products_sid}
                                          >
                                              <Link
                                                  className=""
                                                  to={`/products/detail/${v.products_sid}`}
                                                  key={v.products_sid}
                                                  style={{
                                                      marginBottom: "50px",
                                                  }}
                                              >
                                                  <Card
                                                      className=""
                                                      cardData={{
                                                          card_tag: "純苦",
                                                          card_name:
                                                              v.products_name,
                                                          card_content:
                                                              v.products_info,
                                                          card_price:
                                                              v.products_price,
                                                          card_sid:
                                                              v.products_sid,
                                                          card_img_s:
                                                              v.products_pic,
                                                          card_img_file:
                                                              v.products_with_products_categories_sid,
                                                          card_className:
                                                              cardStyle,
                                                      }}
                                                  />
                                              </Link>
                                          </ScrollWrap>
                                      );
                                  });
                              })
                            : ""}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default List;
