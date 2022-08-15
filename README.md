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
// 1.輪播圖請傳入一個帶有圖片連結的陣列,沒限制輪播張數,如使用router屬性 "陣列請帶上檔名就好"
// 2.height直接帶數字就好,預設為500
// 3.width預設100%
// 4.router可以不用輸入,初始路徑http://localhost:3500/images,如不使用router可以不用輸入,陣列請帶上完整路徑
// 5.isAuto={false} , 關閉自動輪播 , 如果沒設定預設為開啟
// 此組件路徑在 coffee_react\src\component\Course\CourseDetailed\Carousel\Carousel.jsx
<Carousel
    imgs={[
        "https://picsum.photos/id/249/1440/500",
        "https://picsum.photos/id/1014/1440/500",
        "https://picsum.photos/id/120/1440/500",
        "https://picsum.photos/id/216/1440/500",
        "https://picsum.photos/id/227/1440/500",
    ]}
    // 此範例為使用router屬性所要帶的陣列格式
    // imgs={[
    //     "43f80f6e4c0675fd0dde0def963a0f3b.jpg",
    //     "38aecb3ddaaf82eb59cda7acde393780.jpg",
    //     "73c9ba4ec7f6c5af179f5fc994057424.jpg",
    //     "2421496a84b1b5134a89744e09a85c83.jpg",
    //     "f83c89cb0f3f09a323f1e3fae18f9d6d.jpg",
    // ]}
    height={300}
    width={100}
    router={"/course"}
    isAuto={false}
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

++步驟:引入 ChatBot，再加入到 return 內，如下

```js
import { Fragment } from "react";
import NavBar from "../../component/NavBar/NavBar";
import ChatBot from "../../component/Bot/ChatBot";
function Game() {
    return (
        <Fragment>
            <NavBar />
            <h2>遊戲</h2>
            <ChatBot />
        </Fragment>
    );
}

export default Game;
```

### ScrollWrap 組件使用說明

```js
import ScrollWrap from "./component/Item/ScrollWrap/ScrollWrap";
// 只要用ScrollWrap包起來 加上start跟end的class scrollbar捲動到那個位置就會自動加class做進場動畫
<ScrollWrap start="beforeEnterClass" end="afterEnterClass">
    <div className="yourClass">box</div>
</ScrollWrap>;
```

```js
import ScrollWrap from "./component/Item/ScrollWrap/ScrollWrap";
// start 進場前的class
// end 進場後的class (記得加transition)
// offset 捲超過多少px才觸發動畫
// backAgain 往回捲也觸發動畫
// backOffset 往回捲多少px才觸發動畫
// component 最外層的tag 預設是Fragment
<ScrollWrap start="beforeEnterClass" end="afterEnterClass" offset={100} backAgain={true} backOffset={-100} component="ul">
    {myArray.map((item, index) => (<li className="yourClass">list</li>))}
</ScrollWrap>
// 寫在子層的class權重比ScrollWrap的from to還高(子層class優先)
<ScrollWrap start="beforeEnterClass" end="afterEnterClass" offset={100} backAgain={true} backOffset={-100} component="ul">
    <li className="yourClass" start="class1" end="class2">list</li>
    <li className="yourClass" start="class3" end="class4">list</li>
    <li className="yourClass" start="class5" end="class6">list</li>
</ScrollWrap>
```
