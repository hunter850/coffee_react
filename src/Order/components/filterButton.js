// import React from "react";
import "./filterButton.css";
const Filterbutton = () => {
  const menuFiliter = ["全部餐點", "飲品系列", "餐點系列"];

  return (
    <>
      {menuFiliter.map((v) => {
        return <div className="filterbutton">{v}</div>;
      })}
    </>
  );
};

export default Filterbutton;
