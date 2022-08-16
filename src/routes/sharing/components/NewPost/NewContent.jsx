import { useState, useEffect, useRef } from "react";

import { useAuth } from "../../../../component/Member/AuthContextProvider";
import { avatarDIR } from "../../../../config/api-path";
import styles from "./scss/NewContent.module.scss";

function NewContent(props) {
    const { handleSubmit } = props;
    const myForm = useRef(null);
    const { sid, nickname: member_nickname, avatar } = useAuth();

    const [content, setContent] = useState("");
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
                            cols="30"
                            rows="8"
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className={limit}>
                            <span>{content.length} /500</span>
                        </div>
                    </div>
                    <input type="text" name="tag" placeholder="標籤名稱" />
                    <button>Submit</button>
                </form>
                <div className={tag_wrap}>TAGS</div>
            </div>
        </div>
    );
}

export default NewContent;
