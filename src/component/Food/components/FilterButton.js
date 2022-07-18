// import React from "react";
import "./FilterButton.css";

const Filterbutton = ({ setDataFromMenuFilter }) => {
    let menuFiliter = [
        { id: 1, name: "全部餐點" },
        { id: 2, name: "飲品系列" },
        { id: 3, name: "餐點系列" },
    ];
    return (
        <>
            {menuFiliter.map(({ name, id }) => {
                return (
                    <div
                        className="filterbutton"
                        key={`menuFiliter${id}`}
                        onClick={() => {
                            setDataFromMenuFilter(id);
                        }}
                    >
                        {name}
                    </div>
                );
            })}
        </>
    );
};

export default Filterbutton;
