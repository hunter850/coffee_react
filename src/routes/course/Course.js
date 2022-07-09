import { Fragment } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Card from "../../component/Item/Card/Card";
import Path from "../../component/Item/Path/Path";
import Header from "../../component/Course/Header/Header";
import Sort from "../../component/Course/Sort/Sort";











const Course = () => {

    const el = (

        <Fragment>
            <div style={{ backgroundColor: "#FCFAF7", minWidth: '1440px' }} >
                <NavBar />
                <Path pathObj={{ path: ['．課程資訊'] }} />
                <Header />
                <Sort />
                <div className="container">
                    <div className="d-flex f-w wrap">

                        <Link to="/course/detailed/001">
                            <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        </Link>

                        <Link to="/course/manage">
                            <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        </Link>

                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
    return el;
};

export default Course;