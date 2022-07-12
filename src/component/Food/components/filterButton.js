// import React from "react";
import "./filterButton.css";

const Filterbutton = () => {
  let menuFiliter = ["全部餐點", "飲品系列", "餐點系列"];

  return (
    <>
      {menuFiliter.map((v,i) => {
        return <div className="filterbutton" key={i}>{v}</div>;
      })}
    </>
  );
};

export default Filterbutton;
