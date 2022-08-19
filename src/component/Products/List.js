import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./List.scss";
import ScrollWrap from "../../component/Item/ScrollWrap/ScrollWrap";
import { sendCartPost } from "../../config/api-path";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

import AuthContext from "../Member/AuthContext";
import { useNav } from "../../Contexts/NavProvider";
import Btn from "../Item/Btn/Btn";

function List(props) {
    const {
        renderData,
        dataLoaded,
        cardStyle,
        setCardStyle,
        pageNow,
        pageTotal,
        isOpen,
        setIsOpen,
        listModal,
        setListModal,
        tagData,
        setModalMod,
        modalMod,
    } = props;
    // const nowPageNum = renderData[`${pageNow}`];

    const Auth = useContext(AuthContext);
    const { getCount } = useNav();
    const navigate = useNavigate();

    const sendCart = (sid, renderArray, renderNum) => {
        // console.log(sid);
        // console.log({ ...renderData[renderArray][renderNum] });
        return axios
            .post(`${sendCartPost}/${sid}`, {
                ...renderData[renderArray][renderNum],
                quantity: 1,
                member: Auth ? Auth : "沒東西",
            })
            .then((res) => {
                const fetchCartData = JSON.parse(JSON.stringify(res.data));
                // console.log(fetchCartData);

                getCount();
            });
    };

    const listSendCart = (sid, renderArray, renderNum) => {
        if (Auth.authorized) {
            // console.log("sid", sid);
            // console.log("sendCartPost", sendCartPost);
            // console.log(`${sendCartPost}/${sid}`);
            // console.log("renderArray", renderArray);
            // console.log("renderNum", renderNum);
            // console.log(
            //     "renderData[renderArray][renderNum]",
            //     renderData[renderArray][renderNum]
            // );
            setModalMod(true);
            sendCart(sid, renderArray, renderNum);
            setListModal("已加入購物車");
            setIsOpen(true);
        } else {
            setModalMod(false);
            setListModal("請先登入");
            setIsOpen(true);
        }
    };

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
                                      // ------------------------------------------- tag test -----------------------------
                                      /* console.log(
                                          tagData.filter((val, ind) => {
                                              return (tagData.products_sid =
                                                  v.products_sid);
                                          })
                                      ); */

                                      /* console.log(
                                          "tsid",
                                          tagData.filter((val) => {
                                              return (
                                                  val.products_sid ===
                                                  v.products_sid
                                              );
                                          })
                                      ); */

                                      /* console.log("v", v.products_sid); */

                                      // ------------------------------------------- tag test -----------------------------
                                      return (
                                          <ScrollWrap
                                              start="cardaniwrapbf"
                                              end="cardaniwrapat"
                                              offset={50}
                                              //   backAgain={true}
                                              //   backOffset={-5}
                                              component="li"
                                              key={v.products_sid}
                                              //   mode="renderPosition"
                                          >
                                              <Link
                                                  className={cardStyle}
                                                  to={`/products/detail/${v.products_sid}`}
                                                  key={v.products_sid}
                                                  style={{
                                                      marginBottom: "50px",
                                                  }}
                                              >
                                                  <Card
                                                      className=""
                                                      cardData={{
                                                          card_tag: "",
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
                                                      }}
                                                      tagData={tagData}
                                                  />
                                                  <div
                                                      className="card_sendCart"
                                                      onClick={(e) => {
                                                          e.preventDefault();
                                                          listSendCart(
                                                              v.products_sid,
                                                              ia,
                                                              i
                                                          );
                                                      }}
                                                  >
                                                      <svg
                                                          width="20"
                                                          height="20"
                                                          viewBox="0 0 20 18"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                          <path
                                                              d="M18.3375 10.5738L19.9789 3.35157C20.0974 2.83011 19.7011 2.33355 19.1663 2.33355H5.52806L5.20979 0.777648C5.13049 0.389835 4.78924 0.111328 4.39337 0.111328H0.833334C0.37309 0.111328 0 0.484419 0 0.944662V1.50022C0 1.96046 0.37309 2.33355 0.833334 2.33355H3.25983L5.69899 14.2584C5.11545 14.594 4.72222 15.2232 4.72222 15.9447C4.72222 17.0186 5.59278 17.8891 6.66667 17.8891C7.74056 17.8891 8.61111 17.0186 8.61111 15.9447C8.61111 15.4004 8.38726 14.9087 8.02695 14.5558H15.3064C14.9461 14.9087 14.7222 15.4004 14.7222 15.9447C14.7222 17.0186 15.5928 17.8891 16.6667 17.8891C17.7406 17.8891 18.6111 17.0186 18.6111 15.9447C18.6111 15.1748 18.1636 14.5095 17.5146 14.1945L17.7062 13.3516C17.8247 12.8301 17.4283 12.3336 16.8936 12.3336H7.57351L7.34625 11.2224H17.5249C17.914 11.2224 18.2513 10.9532 18.3375 10.5738Z"
                                                              fill="#fff"
                                                          />
                                                      </svg>
                                                  </div>
                                              </Link>
                                          </ScrollWrap>
                                      );
                                  });
                              })
                            : ""}
                    </ul>
                </div>
            </div>
            {modalMod ? (
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <h4
                        style={{
                            color: "var(--BLUE)",
                            padding: "24px 36px",
                        }}
                    >
                        {listModal}
                    </h4>
                </Modal>
            ) : (
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <Link
                        to="/member/login"
                        style={{
                            textDecoration: "none",
                            color: "var(--BLUE)",
                            padding: "24px 36px",
                            textAlign: "center",
                        }}
                    >
                        <h4>{listModal}</h4>
                        <Btn
                            style={{
                                width: "75px",
                                fontSize: "14px",
                                marginTop: "12px",
                            }}
                            onClick={() => {
                                navigate("/member/login");
                            }}
                        >
                            確認
                        </Btn>
                    </Link>
                </Modal>
            )}
        </>
    );
}

export default List;
