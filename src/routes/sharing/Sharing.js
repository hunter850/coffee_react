// import { wrap } from "lodash";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import { getPosts, imgSrc } from "./../../config/api-path";
import NavBar from "../../component/NavBar";
import styles from "./css/sharing.module.scss";

function Sharing() {
    const { sharing_wrap } = styles;
    const [rows, setRows] = useState([]);

    const getData = async () => {
        const r = await axios(getPosts);

        setRows(r.data.rows);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            <NavBar />
            <h2>分享牆</h2>
            <h5>{JSON.stringify(rows[0])}</h5>
            <div className={sharing_wrap} style={{ display: "flex" }}>
                {rows.map((v, i) => {
                    return (
                        <div key={i}>
                            <img
                                src={`${imgSrc}/sharing/${v["img_name"]}`}
                                alt={`pic${v.sid}`}
                                className="post_img"
                            />
                            <p>{v.title}</p>
                        </div>
                    );
                })}
            </div>
        </Fragment>
    );
}

export default Sharing;
