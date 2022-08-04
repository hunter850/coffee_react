export const SERVER = "http://localhost:3500";
export const imgSrc = `${SERVER}/images`;
// NAV

export const getCartCount = `${SERVER}/cart/cart_count/api`;

// MEMBER
export const login = `${SERVER}/member/api/login`;
export const signUp = `${SERVER}/member/api/sign-up`;
export const getUserData = `${SERVER}/member/api/user-list`;
export const editUserData = `${SERVER}/member/api/edit-user-list`;
export const editPasswordAPI = `${SERVER}/member/api/edit-password`;
export const getOrderHistory = `${SERVER}/member/api/order-history`;
export const uploadAvatar = `${SERVER}/member/api/avatar-upload`;
export const getUserLikes = `${SERVER}/member/api/member-likes`;

// COURSE

export const courseDataGet = `${SERVER}/course`;
export const courseDataGetSid = `${SERVER}/course/data`;
export const courseDataFkGet = `${SERVER}/course/FK-get`;
export const courseDataAdd = `${SERVER}/course/add`;
export const courseDataAddFk = `${SERVER}/course/addfk`;
export const courseDataEdit = `${SERVER}/course/edit`;
export const courseDataEditFk = `${SERVER}/course/editFk`;
export const courseDelete = `${SERVER}/course/delete`;
export const courseImages = `${SERVER}/course/upload`;
export const linePayApi = `${SERVER}/course/createOrder`;

// FOOD
export const foodDataGet = `${SERVER}/food`;
export const mapAPI = `${SERVER}/mapapi`;
export const foodData = `${SERVER}/food/addfooddata`;

// SHARING
export const getPosts = `${SERVER}/sharing/post`;

// Products

export const productsDataGet = `${SERVER}/products/api`;
export const sendCartPost = `${SERVER}/products/api/detail`;
export const addUserLike = `${SERVER}/products/api/userLike`;
export const UserLikeDel = `${SERVER}/products/api/delUserLike`;

// CART
export const getProduct = `${SERVER}/cart/read_product/api`;
export const getFood = `${SERVER}/cart/read_food/api`;
export const getProductCoupon = `${SERVER}/cart/product_coupon/api`;
export const getFoodCoupon = `${SERVER}/cart/food_coupon/api`;
