import { Fragment } from "react";
import Header from "../../component/Products/Header";
// import Sort from "../../component/Course/Sort/Sort";
import Path from "../../component/Item/Path/Path";
import NavBar from "../../component/NavBar";
import BookMark from "../../component/Products/BookMark";
import List from "../../component/Products/List";

function Products() {
    const el = (
        <Fragment>
            <div className="Course-container">
                <NavBar />
                <Path pathObj={{ path: ["．商品列表"] }} />
                <Header />
                <BookMark />
                {/* <Sort /> */}
                <div className="container">
                    <div className="d-flex f-w card-wrap">
                        <List />
                    </div>

                    <div className="d-flex f-jcc">
                        {/* {Array(pageTotal)
                            .fill(1)
                            .map((v, i) => {
                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setPageNow(i + 1);
                                        }}
                                        className={`course-page-btn ${
                                            pageNow === i + 1
                                                ? "course-page-btn-focus"
                                                : ""
                                        }`}
                                    >
                                        {i + 1}
                                    </div>
                                );
                            })} */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
    return el;
}

export default Products;
