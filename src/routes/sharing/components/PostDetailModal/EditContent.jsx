import { useMemo } from "react";
import NewContent from "../NewPost/NewContent";
import axios from "axios";
import { debounce } from "lodash";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import { getPosts } from "../../../../config/api-path";

function EditContent(props) {
    const { setEditMode, data } = props;

    const { token } = useAuth();
    const sid = data.rows.sid;
    const pattern = /<br>/g;
    const escapeContent = useMemo(
        () => data.rows.content.replace(pattern, "\r\n"),
        [data]
    );

    const handleSubmit = debounce(async (e) => {
        const fd = new FormData(e.target);

        const r = await axios({
            method: "post",
            url: `${getPosts}/${sid}/edit`,
            data: fd,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (r.status === 200) setEditMode(false);
    }, 150);

    return (
        <div style={{ flex: "1 1 0" }}>
            <NewContent
                handleSubmit={handleSubmit}
                data={data.rows}
                setEditMode={setEditMode}
                escapeContent={escapeContent}
            />
        </div>
    );
}

export default EditContent;
