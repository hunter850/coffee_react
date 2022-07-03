import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import Card from "../../component/Card/Card";
import Path from "../../component/Path/Path";





const Course = () => {
        
    const el = (
        
        <Fragment>
            <NavBar />
            <Path pathObj={{path:{p1:'．課程資訊',p2:'．愛心拉花'}}}/>
            <div className="container"> 
                <h2>課程</h2>
                <div className="d-flex f-w wrap">
                    <Card test={{lv:'初級',title:'愛心拉花',txt:'課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.',price:'1000'}} />
                    <Card test={{lv:'初級',title:'愛心拉花',txt:'課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.',price:'1000'}} />
                    <Card test={{lv:'初級',title:'愛心拉花',txt:'課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.',price:'1000'}} />
                    <Card test={{lv:'初級',title:'愛心拉花',txt:'課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.',price:'1000'}} />
                    <Card test={{lv:'初級',title:'愛心拉花',txt:'課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.',price:'1000'}} />
                    <Card test={{lv:'初級',title:'愛心拉花',txt:'課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.',price:'1000'}} />
                    <Card test={{lv:'初級',title:'愛心拉花',txt:'課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.',price:'1000'}} />
                    <Card test={{lv:'初級',title:'愛心拉花',txt:'課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.',price:'1000'}} />     
                </div>
            </div>
            
        </Fragment>
    )
    return el;
}

export default Course