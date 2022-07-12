import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import React,{useState} from "react";

import Filterbutton from "../../component/Food/components/filterButton";
import Slideshow from "../../component/Food/components/slideshow";
import Card from "../../component/Food/components/Card";
import Path from "../../component/Item/Path/Path";


function Food() {
    return (
        <Fragment>
            <NavBar />
            <Path pathObj={{ path: ["．點餐"] }} />
            <Slideshow/>

            <div className="container" style={{minWidth: "1440px"}}>
                <div>
                    <div style={{display:'flex'}}>
                        <Filterbutton/>
                    </div>       
                    
                             
                    <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
                        <Card/>
                    </div>  
                </div>
        </div>






       
        </Fragment>
    );
}

export default Food;




