export const SERVER = "http://localhost:3500";
export const imgSrc = `${SERVER}/images`;


// MEMBER
export const login = `${SERVER}/member/api/login`;
export const signUp = `${SERVER}/member/api/sign-up`;
export const getUserData = `${SERVER}/member/api/user-list`;
export const editUserData = `${SERVER}/member/api/edit-user-list`;
export const editPasswordAPI = `${SERVER}/member/api/edit-password`;
export const getOrderHistory = `${SERVER}/member/api/order-history`;

// COURSE

export const courseDataGet = `${SERVER}/course`;
export const courseDataFkGet = `${SERVER}/course/FK-get`;
export const courseDataAdd = `${SERVER}/course/add`;
export const courseDataAddFk = `${SERVER}/course/addfk`;
export const courseDelete = `${SERVER}/course/delete`;
export const courseImages = `${SERVER}/course/upload`;
export const coursePhotos = `${SERVER}/course/uploads`;

// FOOD
export const foodDataGet = `${SERVER}/food`;
export const mapAPI = `${SERVER}/mapapi`;

// SHARING
export const getPosts = `${SERVER}/sharing/post`;

// Products

export const productsDataGet = `${SERVER}/products/api`;
// CART
export const getProduct = `${SERVER}/cart/read_product/api`;
export const getFood = `${SERVER}/cart/read_food/api`;
export const getProductCoupon = `${SERVER}/cart/product_coupon/api`;
export const getFoodCoupon = `${SERVER}/cart/food_coupon/api`;
