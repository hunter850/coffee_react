import { createSlice } from "@reduxjs/toolkit";
import { sortBy, shuffle, orderBy } from "lodash";

// redux有在createSlice裡面使用Immer library 簡單講就是可以使用更動原陣列或原物件的方式
// 注意只能在createSlice 或 createReducer內部有這樣的機制 在這之外請遵守react的imutable的規則
// 參考官網https://redux.js.org/tutorials/essentials/part-3-data-flow 搜尋 Immer library就能找到解釋
export const sampleSlice = createSlice({
    name: "sample",
    initialState: [
        { sid: 1, product_id: 25, quantity: 2, price: 240 },
        { sid: 2, product_id: 10, quantity: 1, price: 180 },
        { sid: 5, product_id: 13, quantity: 1, price: 250 },
        { sid: 9, product_id: 8, quantity: 4, price: 130 },
    ],
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        },
        deleteItem: (state, action) => {
            state.value = state.value.filter((item) => {
                return item.sid !== action.payload;
            });
        },
        sortByPrice: (state) => {
            state.value = sortBy(state.value, ["price"]);
        },
        sortByPriceQuantity: (state) => {
            state.value = sortBy(state.value, ["price", "quantity"]);
        },
        complexSort: (state) => {
            state.value = orderBy(
                state.value,
                ["price", "quantity", "sid"],
                ["asc", "desc", "asc"]
            );
        },
        randomSort: (state) => {
            state.value = shuffle(state.value);
        },
    },
});

export const {
    addItem,
    deleteItem,
    sortByPrice,
    sortByPriceQuantity,
    complexSort,
    randomSort,
} = sampleSlice.actions;

export default sampleSlice.reducer;
