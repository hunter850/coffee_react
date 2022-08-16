import { useState, useCallback, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useAuth } from "../../../../component/Member/AuthContextProvider";
import { avatarDIR, previewAPI } from "../../../../config/api-path";
import Tag from "../Tag";
import styles from "./scss/NewContent.module.scss";
import trans from "./scss/PreviewTransition.module.scss";

function NewContent(props) {
    const { handleSubmit } = props;
    const myForm = useRef(null);
    const { sid, nickname: member_nickname, avatar } = useAuth();
    const { tag_transition } = trans;
    const {
        wrap,
        author,
        avatar_wrap,
        info,
        nickname,
        grey_span,
        title_wrap,
        tag_wrap,
        limit,
    } = styles;

    const [content, setContent] = useState("");
    const [preview, setPreview] = useState("");
    const [previewData, setPreviewData] = useState([]);
    const [tagsValue, setTagsValue] = useState([]);

    const sendDataDebounce = useCallback(
        debounce((val) => {
            const pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]+$/;
            const replaced = val.replace(pattern, "").trim();
            console.log(val);
            if (replaced.length === 0) {
                setPreviewData([]);
                return;
            }

            axios(previewAPI, {
                params: { queryString: replaced, type: "tag" },
            }).then((r) => {
                const rows = r.data.rows;
                const name = rows.map((v) => v.name);
                setPreviewData(name);
            });
        }, 150),
        [preview]
    );
    const handlePreview = (e) => {
        setPreview(e.target.value);
        sendDataDebounce(e.target.value);
    };

    return (
        <div className={wrap}>
            <div className={author}>
                <div className={avatar_wrap}>
                    <img
                        src={`${avatarDIR}/${avatar || "missing-image.jpg"}`}
                        alt="avatar"
                    />
                </div>
                <div className={info}>
                    <span className={nickname}>{member_nickname}</span>
                    <span className={grey_span}>#{sid}</span>
                </div>
            </div>

            <div>
                <form
                    name="myForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    ref={myForm}
                >
                    <div className={title_wrap}>
                        <select name="topic_sid" id="">
                            <option value="1">課程</option>
                            <option value="2">商品</option>
                            <option value="3">其它</option>
                        </select>
                        <input
                            type="text"
                            name="title"
                            placeholder="請輸入標題"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            name="content"
                            value={content}
                            aria-label="撰寫內容……"
                            placeholder="撰寫內容……"
                            // cols="30"
                            // rows="8"
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className={limit}>
                            <span>{content.length} /500</span>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="preview"
                        placeholder="標籤名稱"
                        value={preview}
                        onChange={(e) => handlePreview(e)}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        hidden
                        name="tagsValue"
                        value={tagsValue}
                        onChange={() => { }}
                    />
                    <button>Submit</button>
                    <TransitionGroup component="div" className={tag_wrap}>
                        {previewData.map((v, i) => {
                            return (
                                <CSSTransition
                                    timeout={500}
                                    classNames={tag_transition}
                                    key={i}
                                >
                                    <Tag>{v}</Tag>
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                </form>
            </div>
        </div>
    );
}

export default NewContent;
