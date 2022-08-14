import { useState } from "react";
import styles from "./css/NewContent.module.scss";

function NewContent() {
    const { wrap, title_wrap, tag_wrap, content_wrap, limit } = styles;
    const [content, setContent] = useState("");

    return (
        <div className={wrap}>
            <div className="mb-3">
                <h5>Author</h5>
            </div>
            <div>
                <form name="myForm">
                    <div className={title_wrap}>
                        <select name="" id="">
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
                    <div className="mb-3">
                        <textarea
                            value={content}
                            aria-label="撰寫內容……"
                            placeholder="撰寫內容……"
                            name=""
                            id=""
                            cols="30"
                            rows="6"
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className={limit}>
                            <span>{content.length} /500</span>
                        </div>
                    </div>
                    <input type="text" name="tag" placeholder="標籤名稱" />
                </form>
                <div className={tag_wrap}></div>
            </div>
        </div>
    );
}

export default NewContent;
