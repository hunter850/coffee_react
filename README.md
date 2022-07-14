### Path 組件使用說明

```js
<Path pathObj={{path:['．課程資訊','．愛心拉花']}}/>
<Path pathObj={{path:['．{頁面名稱}','．{頁面名稱}']}}/>
```

### Btn 組件使用說明

```js
// 組件範例
// 用法1: 選擇需要的單一屬性傳入,格式如下
<Btn backgroundColor={'#B79973'} color={'#fff'} width={'100px'}>
    課程內容
</Btn>

// 需要的屬性照著範例輸入,不需要的空著即可
```
### Modal 組件使用說明
```js
// 組件範例 基本必傳一組useState false關閉modal true開啟modal
const [isOpen, setIsOpen] = useSate(false);
<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <h4>Modal內容</h4>
    <p>Modal內容</p>
</Modal>
```
```js
// bordPadding設定modal padding內縮
// bordY 設定modal進場 Y 方向的滑動距離
// time 動畫時間(s)
// 不props 預設 bordPadding={"24px 36px"} bordY={-30} time={0.5}
<Modal isOpen={isOpen} setIsOpen={setIsOpen} bordPadding={"30px"} bordY={-60} time={1}>
    <h4>Modal內容</h4>
    <p>Modal內容</p>
</Modal>
```