import "./GoogleMap.css";
import GoogleMapDemo from "./GoogleMapDemo";

function GoogleMap() {
    return (
        <>
            <div className="google-lightbox">
                <div className="google-detail">
                    <div className="top">
                        <h6>選擇自取門市</h6>
                    </div>
                    <div className="middle">
                        <h6>地點依縣市尋找</h6>
                        <div className="choice">
                            <select className="country">
                                <option>請選擇縣市</option>
                                <option>1</option>
                            </select>
                            <select className="country">
                                <option>1</option>
                                <option>1</option>
                            </select>
                        </div>
                        <div className="address">地址顯示</div>
                    </div>

                    <div className="middle2">
                        <GoogleMapDemo />
                    </div>

                    <div className="bottomarea">
                        <div className="bottoms">
                            <h6>下一步</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GoogleMap;
