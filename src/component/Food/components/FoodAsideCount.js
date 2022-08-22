import React from "react";
import { icechoice, sugarchoice } from "../../../config/constant";
import { FaTrashAlt } from "react-icons/fa";

function FoodAsideCount({ item, setDataFromCount, removeItem }) {
    const {
        foodCount,
        menu_name,
        sugar,
        ice,
        menu_price_m,
        menu_sid,
        menu_photo,
        timeID,
    } = item;
    const subCount = menu_price_m * foodCount;

    const ice1 = icechoice.find(({ id }) => {
        return id === ice;
    });
    const sugar1 = sugarchoice.find(({ id }) => {
        return id === sugar;
    });
    const displayNone = sugar ? "display" : "display none";

    return (
        <>
            <div key={menu_sid} className="detail">
                <img
                    src={`http://localhost:3500/images/food/${menu_photo}`}
                    alt=""
                />
                <div className="center">
                    <div className="takeout">
                        <p>{menu_name}</p>
                        <div>
                            <FaTrashAlt size={"1.15rem"} onClick={removeItem} />
                        </div>
                    </div>
                    <p className={displayNone}>
                        {ice && ice1.name} / {sugar && sugar1.name}
                    </p>
                    <div className="calculate">
                        <div
                            className="minusplus"
                            onClick={() => {
                                // return foodCount > 1
                                //     ? setDataFromCount(timeID, foodCount - 1)
                                //     : false;

                                if (foodCount > 1) {
                                    return setDataFromCount(
                                        timeID,
                                        foodCount - 1
                                    );
                                } else {
                                    return removeItem();
                                }
                            }}
                        >
                            -
                        </div>
                        <h6 className="count">{foodCount}</h6>
                        <div
                            className="minusplus"
                            onClick={() => {
                                setDataFromCount(timeID, foodCount + 1);
                            }}
                        >
                            +
                        </div>
                        <div className="grow"></div>
                        <div>$ {subCount}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FoodAsideCount;
