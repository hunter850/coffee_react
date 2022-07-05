import { Fragment } from "react"
import NavBar from "../../component/NavBar"
import Card from "../../component/Card/Card"
import Path from "../../component/Path/Path"
import Header from "../../component/Course/Header/Header"
import Sort from "../../component/Course/Sort/Sort"
import Btn from '../../component/Btn/Btn'





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
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                        <Card test={{ lv: '初級', title: '愛心拉花', txt: '課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.', price: '1000' }} />
                    </div>
                </div>
                <Btn style={{ backgroundColor: '#B79973', color: '#fff', txt: '報名課程' }} />
            </div>
        </Fragment>
    )
    return el
}

export default Course