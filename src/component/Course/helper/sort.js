// 排序用的function
export const priceAsc = (a, b) => {
    return a.course_price - b.course_price;
};
export const priceDesc = (a, b) => {
    return b.course_price - a.course_price;
};
export const levelAsc = (a, b) => {
    return a.course_level - b.course_level;
};
export const levelDesc = (a, b) => {
    return b.course_level - a.course_level;
};
