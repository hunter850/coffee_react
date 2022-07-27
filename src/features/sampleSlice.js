import { createSlice } from "@reduxjs/toolkit";
import { sortBy, shuffle, orderBy } from "lodash";

// redux有在createSlice裡面使用Immer library 簡單講就是可以使用更動原陣列或原物件的方式
// 不會更動原物件 原陣列的方式需要用return
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
        sampleAddItem: (state, action) => {
            state.push(action.payload);
        },
        sampleDeleteItem: (state, action) => {
            return state.filter((item) => {
                return item.sid !== action.payload;
            });
        },
        sampleChangeQuantity: (state, action) => {
            return state.map((item) => {
                if (item.sid !== action.payload.sid) return item;
                return {
                    ...item,
                    quantity: item.quantity + action.payload.num,
                };
            });
        },
        sampleSortByPrice: (state) => {
            return sortBy(state, ["price"]);
        },
        sampleSortByPriceQuantity: (state) => {
            return sortBy(state, ["price", "quantity"]);
        },
        sampleComplexSort: (state) => {
            return orderBy(
                state,
                ["price", "quantity", "sid"],
                ["asc", "desc", "asc"]
            );
        },
        sampleRandomSort: (state) => {
            return shuffle(state);
        },
    },
});

export const {
    sampleAddItem,
    sampleDeleteItem,
    sampleChangeQuantity,
    sampleSortByPrice,
    sampleSortByPriceQuantity,
    sampleComplexSort,
    sampleRandomSort,
} = sampleSlice.actions;

export default sampleSlice.reducer;
