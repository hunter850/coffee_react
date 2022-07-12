import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import React,{useState} from "react";
import Filterbutton from "../../component/Food/components/FilterButton";
import Slideshow from "../../component/Food/components/Slideshow";
import Card from "../../component/Food/components/FoodCard";
import Path from "../../component/Item/Path/Path";


function Food() {
    return (
        <Fragment>
            <NavBar />
            <Path pathObj={{ path: ["．點餐"] }} />
            <Slideshow/>

            <div className="container" style={{maxWidth: "1440px"}}>
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




