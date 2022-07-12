import React,{useState} from "react";
import Filterbutton from "./filterButton";
import Slideshow from "./slideshow";
import Card from "./Card";


const App =()=>{

    return(
    <>
        <div style={{width:'100%'}}>
            <Slideshow/>
            <div style={{width:'940px',margin:'0 auto'}}>
                <div style={{display:'flex'}}>
                    <Filterbutton/>
                </div>                
                <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
                    <Card/>
                </div>  
            </div>
        </div>
    </>
    )
}

export default App;