import { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import { debounce, difference } from "lodash";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useAuth } from "../../../../component/Member/AuthContextProvider";
import { avatarDIR, previewAPI } from "../../../../config/api-path";
import Tag from "../Tag";
import styles from "./scss/NewContent.module.scss";
import trans from "./scss/PreviewTransition.module.scss";

function NewContent(props) {
    const { handleSubmit, data, setEditMode } = props;

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
        form_wrap,
        form_upper,
        form_bottom,
        cancel_btn,
        dis_btn,
        btn,
        plus,
    } = styles;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [preview, setPreview] = useState("");
    const [previewData, setPreviewData] = useState([]);
    const [myTag, setMyTag] = useState([]);
    const [topic, setTopic] = useState(0);

    useEffect(() => {
        if (data) {
            const { title, topic_sid, content, tags } = data;
            setTitle(title);
            setTopic(topic_sid);
            setContent(content);
            setMyTag(tags);
        }
    }, []);

    const sendDataDebounce = useCallback(
        debounce((val) => {
            const pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]+$/;
            const replaced = val.replace(pattern, "").trim();
            if (replaced.length === 0) {
                setPreviewData([]);
                return;
            }

            axios(previewAPI, {
                params: { queryString: replaced, type: "tag" },
            }).then((r) => {
                const rows = r.data.rows;
                const nameArray = rows.map((v) => v.name);
                // nameArray篩掉myTag裡已有的value
                const diff = difference(nameArray, myTag);

                setPreviewData(diff);
            });
        }, 150),
        [preview, myTag]
    );
    const handlePreview = (e) => {
        setPreview(e.target.value);
        sendDataDebounce(e.target.value);
    };

    const selectTag = (val) => {
        const v = val.trim();
        if (myTag.length > 5 || myTag.indexOf(val) > -1 || v === "") return;
        setPreviewData((pre) => {
            return pre.filter((el) => el !== v);
        });
        setMyTag((pre) => {
            return [...pre, v];
        });
    };

    const removeTag = (v) => {
        setMyTag((pre) => {
            return pre.filter((el) => el !== v);
        });
        setPreviewData((pre) => {
            return [...pre, v];
        });
    };

    const beDisable = useMemo(() => {
        if (content.trim() === "" || title.trim() === "") {
            return true;
        } else {
            return false;
        }
    }, [content]);

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

            <form
                name="myForm"
                className={form_wrap}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                    return false;
                }}
            >
                <div className={form_upper}>
                    <div className={title_wrap}>
                        <select
                            name="topic_sid"
                            id=""
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        >
                            <option value="1">課程</option>
                            <option value="2">商品</option>
                            <option value="3">其它</option>
                        </select>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            placeholder="請輸入標題"
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyPress={(e) => {
                                e.key === "Enter" && e.preventDefault();
                            }}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            name="content"
                            value={content}
                            aria-label="撰寫內容……"
                            placeholder="撰寫內容……"
                            onChange={(e) => {
                                if (e.target.value.length <= 500)
                                    setContent(e.target.value);
                            }}
                        />
                        <div className={tag_wrap} style={{ minHeight: "60px" }}>
                            {myTag.map((v, i) => {
                                return (
                                    <div key={i} onClick={() => removeTag(v)}>
                                        <Tag className="myTag">
                                            {v}
                                            <span className={plus}>×</span>
                                        </Tag>
                                    </div>
                                );
                            })}
                        </div>
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
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                selectTag(e.target.value);
                                setPreview("");
                            }
                        }}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        hidden
                        name="myTag"
                        value={myTag}
                        onChange={() => { }}
                    />
                    <TransitionGroup component="div" className={tag_wrap}>
                        {previewData.map((v) => {
                            return (
                                <CSSTransition
                                    timeout={500}
                                    classNames={tag_transition}
                                    key={v}
                                >
                                    <div onClick={() => selectTag(v)}>
                                        <Tag className="prevTag">
                                            {v}
                                            <span className={plus}>＋</span>
                                        </Tag>
                                    </div>
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                </div>
                <div className={form_bottom}>
                    {data && (
                        <button
                            className={cancel_btn}
                            onClick={() => {
                                setEditMode(false);
                            }}
                        >
                            取消
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={beDisable}
                        className={beDisable ? dis_btn : btn}
                    >
                        發布文章
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewContent;
