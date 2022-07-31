### Path 組件使用說明

```js
<Path pathObj={{path:['．課程資訊','．愛心拉花']}}/>
<Path pathObj={{path:['．{頁面名稱}','．{頁面名稱}']}}/>

 <Path pathObj={{path:['．{頁面名稱}','．{頁面名稱}']}}
       backgroundColor={"#fff"}
       url={["/course"]} />
    // 使用url參數需"注意",用這個範例來說明
    // 首頁．課程資訊．皮卡丘拉花
    //1. 上面所給的/course是給．課程資訊使用的連結,故是要在使用三級路由的地方給這個參數,首頁的部分我已經給預設所以不用下參數,第三層設計上也是不不需要連結的,因為當前就在這個頁面
    //2.backgroundColor這個屬性可以配合自己的背景色微調,預設為#fcfaf7
    //重要提醒 : 使用這個url參數必須傳入一個"陣列" 例:  url={["/course","/course-test"]} 依此類推
    //使用上不懂的地方可以詢問
```

### Btn 組件使用說明

```js
// 組件範例
// 用法1: 選擇需要的單一屬性傳入,格式如下
<Btn backgroundColor={"#B79973"} color={"#fff"} width={"100px"}>
    課程內容
</Btn>

// 需要的屬性照著範例輸入,不需要的空著即可
```

### Modal 組件使用說明

```js
// 組件範例 基本必傳一組useState false關閉modal true開啟modal
import Modal from "./compnents/Modal";
const [isOpen, setIsOpen] = useSate(false);
<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <h4>Modal內容</h4>
    <p>Modal內容</p>
</Modal>;
```

```js
// bordY 設定modal進場 Y 方向的滑動距離
// time 動畫時間(s)
// closeButton 設定是否要有叉叉按鈕
// 不props 預設 bordY={-30} time={0.5} closeButton={true}
const [isOpen, setIsOpen] = useSate(false);
<Modal
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    bordY={-60}
    time={1}
    closeButton={false}
>
    <h4>Modal內容</h4>
    <p>Modal內容</p>
</Modal>;
```

```js
// 懶人包: 有不想要的屬性可以全部 inline style 自己設定改掉, body有超出modal高度會有scrollbar能用 不會爆版 建議至少要用body

// component 設定最外層tag 預設 "div", null為使用Fragment
// header預設 minHeight: "24px" , width: "100%", textAlign: "center", overflow: "hidden"
// body預設 padding: "0px 36px", maxHeight: "calc(90vh - 132px)", overflow: "auto", width: "100%"
// footer預設 minHeight: "24px" , width: "100%", overflow: "hidden"
<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <Modal.Header component={null} style={{backgroundColor: "red"}} className="hello">
        <h4>這裡放標題</h4>
    </Modal.Header>
    <Modal.Body component="div">
        <p>這裡放內文</p>
    </Modal.Body>
    <Modal.Footer component="span">
        <button>這裡放footer</button>
        <button>這裡放footer</button>
    </Modal.Footer>
</Modal>

//全都預設
<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <Modal.Header>
        <h4>這裡放標題</h4>
    </Modal.Header>
    <Modal.Body>
        <p>這裡放內文</p>
    </Modal.Body>
    <Modal.Footer>
        <button>這裡放footer</button>
    </Modal.Footer>
</Modal>
```

### Carousel 組件使用說明

```js
// 1.輪播圖請傳入一個帶有圖片路徑的陣列,沒限制輪播張數
// 2.height直接帶數字就好,預設為500
// 3.width預設100%
// 此組件路徑在 coffee_react\src\component\Course\CourseDetailed\Carousel\Carousel.jsx
<Carousel
    imgs={[
        "https://picsum.photos/id/249/1440/500",
        "https://picsum.photos/id/1014/1440/500",
        "https://picsum.photos/id/120/1440/500",
        "https://picsum.photos/id/216/1440/500",
        "https://picsum.photos/id/227/1440/500",
    ]}
    height={300}
    width={100}
/>
```

### Tag 組件使用說明

```js
 tagContext預設文字為: 標籤,
 tagBgc預設顏色: #ccc,
 tagPaddingX預設左右方向padding: 10px

// 引入時導入相關參數, 如沒導入也有預設
```

### 放置客服教學(有空再放就好了，不放應該也沒關係(?))

++步驟1: 在頁面import這些(後四個import注意路徑的相對位置)
```
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../../component/Bot/config";
import MessageParser from "../../component/Bot/MessageParser.js";
import ActionProvider from "../../component/Bot/ActionProvider.js";
import "../../component/Bot/Bot.css";

```
++步驟2: 在頁面主要function內加入這兩行
```
const [botOpen, setBotOpen] = useState(false);
const [chatBot, setChatBot] = useState(null);
```

++步驟3: 加入useEffect以下內容 (假如你的頁面沒有使用useEffect，記得在最上方 import {useEffect} from "react";)
```
useEffect(() => {
    if (botOpen) {
        setChatBot(
            <>
                <div className="Chatbot_header">
                    <img
                        src={require("../../images/Coupon/ChatroomTitle.png")}
                        alt=""
                        width="120px"
                        height="40px"
                        style={{ margin: "0 auto" }}
                    />
                </div>
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            </>
        );
    } else {
        setChatBot(null);
    }
}, [botOpen]);

```
++步驟4: 在在頁面主要function 的 return 加入以下內容
```
return (
    <div className="BotContainer">
        {chatBot}
        <button
            className="BotBTN react-chatbot-kit-chat-btn-send"
            onClick={() => setBotOpen(!botOpen)}
        >
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 66 66"
            >
                {" "}
                <image
                    id="image0"
                    width="66"
                    height="66"
                    x="0"
                    y="0"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAA
                            CXBIWXMAAAsTAAALEwEAmpwYAAAPLUlEQVR42s1beVyU1fr/nnfeGYZxgGEXlH0nZVEUTHK5XdTQ
                            0h9aahaZy7037VN2zepmtyzvr6xbmXptUVMjLb2uueDCmoAImhoosu/LsAoD8w6zvef+YfrBZJkZ
                            Buz7F7znmec85zvnPOc85/0OwTCAUuqVX1AUkZJ5yb+0qspNrda4MozAVcAwMgpeAgAEREV5tDME
                            TUTAVPh5echnz5xe4OvungOglhBChzJGMkQDF9TWNkacSE5ZXFhaEVNeVRVcVlkNvZ43LjhC4O0+
                            mgb6+RT7eY0+GR0ZcSIkODibEKL7QxMhl8u9z6RfXH06OS2mQd7k19ahEOt0D8ZMCIH7qFFwsJOB
                            MAx4Xo/2DgWq6xrQmz0AMAwDmY2VJsjXtzJsbNDhZ+c+sdfR0bHUXDPFLESk5eaOrCqv3XjyfOrc
                            gpJSR51O36udnUyGOTP+hHmxMRjp5AiJpSUIuRMCp+pGTV09EpPTcfD4Sai61X0HTQjGjQ3uio6M
                            2P9c3PxPZDLL8odKhEKhcPjxeOJbP51NWl5aWSOjtPcvRyQUYv6TT+BvLzwLmY31wH47u/DFjt04
                            euoc+vJ5FwG+XsopURHb161a+TEhpG1YiaCUkv/s+WFGZVXV52fSMoK12r6XrIVIhL/EL8KK5xYZ
                            1QfP8/j2h0P4es8+6PT6fm0lEkuEPhJYtOrFxW9GhoWdNiWHsCaQYH345NmNh04mvtQgbxIOZD87
                            ZrrRJAB3csKKJc+gXt6Io6fO9mvLcSpkX74WUF1bd+SFZ+K+p5SuNJYMo2ZERV1d4O79h746djpp
                            mlqjGdDe090N/921DRYikdFE3IWS47Bg2SrUy5sMJjAudkbGgrlzl40f41tqaD+MoYaF5eUBH27+
                            6sLB44kGkQAAq15cMigSAGCERIKVzy822J7neRw+dfaxr/fsTTuemBhsViLq6uR/Xv//nyelZ+U4
                            DpS8eiIidGy/7UWl5Thw7CQKS8r6TYpR48MgkVgaRWD6xZzR3x9JTDyd8vMUsxBRXFwZtPaDTfvz
                            CorcjAlEZmMNezvbPtuT0jOx9JU38NGWr/D86rX4OTunT1t7W1u4ODkZRQQA5BUUeSQcPPp9c3Pz
                            +EERUV5TE/L5zt1Jv+TdNDoKgUDQb/uhE4ngOA4AoNFocD41o29jArBs//76wtX8AveVb7x3llLq
                            2Z9dn7sGpdR2xWtvf5qR+8soUwJQd6ux+4dDfbY3tbTc+1tiKUZEeIhJAzUENwtLHFa9ueF7SumT
                            hJB2g4mglDJ7DhzZlHM9L8aYnNATXRyHLTv2DGgnsRTj1b8uQ9zsmX37UnJoamkdFBlpWZeiN+/Y
                            vRVAfG/tvS6N7bv3z/0m4cBStdqw3cFUeHu4Y+fmj7Bo3px+7XKvXsft9o5B9aXneew7dOL5rMvX
                            5hpEBKXU+WZJ2Za29o7B7XsDIGZaNBK2f4YxgQH92qm61diRcMAsfXYqOew7dGzn+cxM19+3PbA0
                            Nu/cu/HCxUtG7RDGQCRksWpZPBbOjYVEIhnQ/sjJMyivqjZb/8kZ2Y4ymc0/KKVrCCH3zu73zYj8
                            khKfMykXlmq0Zi/37yFyfDheWBg3IAmUUpxOSsPWXd+ZPYaCwtLllZWV9x1y7psR51My36+srh2w
                            fhgMWJYFw/R/fFFrNNiRcADfHTgMrc78X0pBSallwrHT7wKIu/vsXkQ1TU2+aZmXFg4lCYagpbUN
                            /9y0Gbv2HRgSEu4iNSM7Ri5vjXqAiOSUC+uLysqNrkbNjff+/QXOpf485P00NrVIt+zeO/8+Iiil
                            gtMpP8803a350N3PzZQ5oed51NXLF1NKre4R0dx8e0ZJeaXLwyZhuFFYWu564dLlp4DfkuW+I8fi
                            OVX3sHR+Lf8mlq95s8/2iuraYSPidoeCpGRkLwSwn6WU2jy7au244eq8vUOBK9fzQQiBjbUVJJaW
                            UHR2oUupHDYCeqK8qmY6pVTAZl29GtTS2uY7nJ1bS6XY8MYaRI4Pg3SEBKrubqRkZOPjrV9D0dk5
                            rETcuFUs7dJoApm2lrZJNfVyg2+qBgshy+KdtS/j8SmPQjrizqHKUizGnJjpeH31ymElAQCUKhWy
                            L+ZMYi7/WhCoH+CW2Jzw9/XCjKmP9do2Y1o0fDw9hp2MG0Vl45na+oYhqyt6g72tLQjT+52xhYUF
                            bKylw05EQ2NzIMNx3Q7D2WlpRRUUnV29tjW3tKKqtn7YiVCqVF6MTqeTDWen9fJGvPfJZqjV9x+c
                            NFotPt72DVrbbg87EWqNxoXleX7Y52JqRjbiX34dTz8VC3tbGVrabuOnM8m4UVg07CQAAMdxIpYC
                            4ofReWFJGTZ+tu2hDPz3UHWrwfJ63ZBoJIA7dwqUN35HIoQBYRhQngeldzQVhBHce3M+FHGyrEik
                            HSoimisKoVK0wdj7X4ZhEL/8BSTsSQD/m8RAZCnBSP/QAe8yTIFIKATLChjVUJBAKUVncwPSju6A
                            QGBc8GILEcaNCcCqedFQct3geR4rX/8XGquKwYolEFqIMULmAGImUqRSCc8KGEE7APehIYPH+o+2
                            D1qNQkHR0nIboT5OcHJxQ1lVHfKuZcLBwx9Se+dBLxmxWNzCisUWhr1mNgEEBG+/8iIGu7R5SrHm
                            n59ibfxMjI2KgbOTA5IzLmPNO//G7XoV7EZ5Dcq/zEpayVpLpTVDRQQIMGNaFJhBMsFTCkdHOyx6
                            aycsxfvwSKA39nyxAd9t+wCxS16F2tYRFhLTTwF2MptCJuyRIIM1BA8TBAQyj2DIfEJR1KjC1Hkr
                            4D5qJJYunIPOloZB+ZbZ2eYyri7Ol21lA+ua/ghgBAIwrBDWTqPQ0qlGSsZlzJgaBY3S9NKdZVlM
                            HDc2j/H3GJXv5+1psgirL5hzy+9t+xWwQrS1d0AitgDPG6ff7IlAX28+xN8/n/H09Gz2dnfLNDcR
                            AAGlgJIb/O6s0+ug0ehAyJ3tsrurAyKqxszpk3Dp2g1YjLAy2feYQN8cQkg7QwjRz5o57bg5DyqU
                            56HTqCEQCnHz1uDrB45Toq6+AfLiPNTdvILWshv4YuM6yKyt8J9vD0IiM62AFrIsvDzcfgB+u7x9
                            NDT0qI+H+/aSikrj9Dm9oF1eg87GGlgLddDrtEhPPYfIsCAQgRAgpog9KLIvZsPLVYYfN69Fh06M
                            AB9PSEdIsOLvG6GkIjhay0yKdWywv2JKRNhZ4LfrfEJIR3Tk+EG+VaGwYdVY7N6IH+cDc/wonCUU
                            u49eQG1RDkqup0NekgPaJQeo4Wtap2rHd/89Aa5bi6LqVqjVGuw5eAqT5y5H1o0KOHoGgGFMU9P4
                            eHmc9fHxKQN6vPucPWv6h6eSUmc2t942Kc1xHbfh2F2A1xYIkVLG40yxDp/NEuK5I0147Jm3IIAe
                            GggxYVwwtq9fCpeAqIFniKYLSUnncOLCDVg5jcbrn/8AXq+HSCyB1H40nF1Nzw2OdrY0LCg44a6W
                            +15iCPH3z5o6KSrXVMeK5npEuOih0lHsytVgzWQRtFo9HEcQJC8XI2WlFDvmCtFSlo8V7+4EVTb2
                            7YzyQHcbqgtz8f6Xx2Dj4glbV084+zwCF/8Q2Lv7DipBAkB05ITrTz81M+3u//dmBCGEv/pr0frE
                            lPRkTmV8ptcoOxHuwkKnB/7sJ8QcfxZrTnRjjDOLLVkaXKvXobiZh1JDoakpAK/h8MB8oDygVoAq
                            5aisrsETq7egUcXCydt7UIP+PVxGOvELZsf8ixDC3X1231YRHuKf+sT0qRmmFDECkQXy6rVQqrSI
                            9QH25nK40gAsCyNo79Rg8iiKzbOEeC5UgBD/0SBaBfjWW6DtZaDt5eBbi8A35UHdWoLP9vyESfGb
                            0KKzhINngNGxDIQx/j4pE8aFnu757IER1zY2hi5f83Z6eWW1zBCnGq4LTeW3oNV0g2i74WkDqHmg
                            pgOwEQNOPfQgegrUKACBSIQwP7deBdDV9a2oa24HI2BhYSm9F2X4xEjcbmtFZcnvKgIC2I32MngL
                            9fPy4NavWT1t8sTwyz2fPyADGO3s/OunX+7evK+pZYOS4wacGlq1ChKWYvHCefDxcIOnuwskFmIA
                            5vvlEWEIgv28wfM8bpVUQMfzqK6To7isCodPJqNbxUFiwNcmEgqxbNGCj39Pwm98PghKqeS19z48
                            dzopPXog5zqNGq01ZVB3dkDEEjjYWmNMkC/CxgRgfEgQQoP9YGMthcDEM7eeUnR1cSgqr8L1m8XI
                            vpyPG4UlaG3vRBenhlAihd0oL4OS57xZMYWfvLsunBDywBvvPqPr6Ojw/esbG87/knfD4GKf1+ug
                            12qhVnZCzXVC3dUBtaoLMqklpJYWJhHBqTRQqNRgWAuIRlhBbCWDhUQKVigCI2ANLmomhoXIN65b
                            Pc3b27vXo26/XlIzc+O++GbXj7dKK0yWGmpUSnDV+fh2w1LYWBl/cF2/7RjKuyQYYW+8FvsuXEY6
                            c++s/dvTM6KjE/uy6ZcISik5fu5c3KYtuw61tXeYNLd1Gg2qrl2A9QjTTu9dXDecA8IhsbEz6fOO
                            Drbqv7+0/JUFsTN39Gdn0OCOnjm/esvOhK31DY0mVWZ6rRYmJ09CIDBiCfSEg4Od5vm4J19d9eJz
                            Xw/YjaFOr+bfXLbug0++qq6tH1JFrrng7T6ae+2lZS/PmvbYwIJwY4gAgOxfrj+zddfezb/8WuBq
                            qlh9OBA1LrQpKnLcitXxz5409DNGz7fqhoYJn2zb8WXSz1kRPP/HIkMkFCL28Snl8Qvn/d/YwMA8
                            Yz5r6s8dLRMO//TB4RNn1xSWlj10bSYAuLmOVK1aFv/1nyaNf9/Ozs5oKb/JN4uUUkFKVu6jp88m
                            bbpw6cpEhVL5UAhxtLelQX6+ma+uWPLR2ODgs6b+RHrQV6yUUtHJ8ymx6Vm5W1OzLrmZ447SEFiK
                            xZgYHlK8KG7OB49PjjpMCBmUUtVsd82UUjbj4pUFPyWlrMi/VTS9orp2SARqfl4edJSLc/KLT88/
                            MCky/EDPUvoPQURPKBQK/7SsS0uPn0mNlbe0BFfW1Al1JgrMWZaFm+tIGuDjnR/g63V85ZKnf7Sw
                            sCg0d8xDpo0A7iTV8ro6t8ycK+Ftze0Rza2tYxuamtzbFV1Oer1eptaoBRqtDqB3BmwpFvFCkUhh
                            b2vT6GhnV2VtbXVZIhZfixw/tnBCaGg1IWTIRJj/A2SvMbDZtB1+AAAAJXRFWHRkYXRlOmNyZWF0
                            ZQAyMDIyLTA3LTMwVDEwOjI1OjUwKzAwOjAwUMLiKgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0w
                            Ny0zMFQxMDoyNTo1MCswMDowMCGfWpYAAAAASUVORK5CYII="
                />
            </svg>
        </button>
    </div>
)
```