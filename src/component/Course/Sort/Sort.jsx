import React from "react";
import './Sort.css'



export default function Sort (){
    return(
        <div className="container ">
            <div className="Sort-wrap d-flex">
                <div className="sort-txt"><p>搜尋結果符合條件<span className="num-color">10</span>項目</p></div>
                <div>
                <select className="sort">
                    <option >排序方式</option>
                    <option >初級&nbsp;&gt;&nbsp;高級</option>
                    <option >高級&nbsp;&gt;&nbsp;初級</option>
                    <option >價錢低&nbsp;&gt;&nbsp;高</option>
                    <option >價錢高&nbsp;&gt;&nbsp;低</option>
                </select>
                </div>
            </div>
        </div>
    )
}