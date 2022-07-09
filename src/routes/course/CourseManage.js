import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import ManageHeader from '../../component/Course/CourseManage/ManageHeader/ManageHeader';
import List from '../../component/Course/CourseManage/List/List';
import Sort from "../../component/Course/Sort/Sort";
const CourseManage = () => {
    const el = (
        <Fragment>
            <div style={{ backgroundColor: "#E3E7E7", minWidth: '1440px' }} >
                <NavBar />
                <div className="ManageHeader">
                    <ManageHeader />
                </div>
                <Sort sortclass={'sortGrey'} />
                <div className="container" style={{ paddingBottom: 104 }}>
                    <List />
                    <List />
                    <List />
                    <List />
                    <List />
                </div>
            </div>

        </Fragment>
    );

    return el;
};

export default CourseManage;