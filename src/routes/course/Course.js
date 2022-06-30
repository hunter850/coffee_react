import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import Card from "../../component/Card/Card";
import '../../component/Card/Card.css';

const Course = () => {
    const el = (
        <Fragment>
            <NavBar />
            <h2>課程</h2>
            <Card test={{lv:'初級',title:'愛心拉花',txt:'課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.',price:'1000'}} />
            
        </Fragment>
    )

    return el;
}

export default Course