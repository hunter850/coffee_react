export const SERVER = "http://localhost:3500";
export const imgSrc = `${SERVER}/images`;
export const avatarDIR = `${SERVER}/avatar`;
// NAV

export const getCartCount = `${SERVER}/cart/cart_count/api`;

// MEMBER
export const login = `${SERVER}/member/api/login`;
export const signUp = `${SERVER}/member/api/sign-up`;
export const doVerification = `${SERVER}/member/api/user-verify`;
export const getUserData = `${SERVER}/member/api/user-list`;
export const editUserData = `${SERVER}/member/api/edit-user-list`;
export const editPasswordAPI = `${SERVER}/member/api/edit-password`;
export const getOrderHistory = `${SERVER}/member/api/order-history`;
export const getOrderHistoryDetail = `${SERVER}/member/api/order-history-detail`;
export const uploadAvatar = `${SERVER}/member/api/avatar-upload`;
export const getUserLikes = `${SERVER}/member/api/member-likes`;
export const delUserLikes = `${SERVER}/member/api/member-delete-likes`;
export const getUserPosts = `${SERVER}/member/api/posts-history`;
export const getUserCoupons = `${SERVER}/member/api/coupons`;
export const getUserTotalPoints = `${SERVER}/member/api/total-points`;
export const getUserCanUsePoints = `${SERVER}/member/api/canUse-points`;

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
export const sendMail = `${SERVER}/food/send_mail`;

// SHARING
export const sharingIMGS = `${SERVER}/images/sharing`;
export const getPosts = `${SERVER}/sharing/post`;
export const newPostAPI = `${SERVER}/sharing/post/new`;
export const postModified = `${SERVER}/sharing/post`;
export const replyAPI = `${SERVER}/sharing/reply`;
export const commentAPI = `${SERVER}/sharing/comment`;
export const memberLikeAPI = `${SERVER}/sharing/memberlike`;
// SHARING/serach
export const previewAPI = `${SERVER}/sharing/search/previewAPI`;
export const popTagAPI = `${SERVER}/sharing/search/popTag`;
export const searchPost = `${SERVER}/sharing/search/searchPost`;

// Products

export const productsDataGet = `${SERVER}/products/api`;
export const sendCartPost = `${SERVER}/products/api/detail`;
export const addUserLike = `${SERVER}/products/api/userLike`;
export const UserLikeDel = `${SERVER}/products/api/delUserLike`;
export const getProductstag = `${SERVER}/products/api/getProductstag`;

// CART
export const getProduct = `${SERVER}/cart/read_product/api`;
export const getFood = `${SERVER}/cart/read_food/api`;
export const getProductCoupon = `${SERVER}/cart/product_coupon/api`;
export const getFoodCoupon = `${SERVER}/cart/food_coupon/api`;
export const cartCheck = `${SERVER}/cart/check/api`;
export const cartDetail = `${SERVER}/cart/detail/api`;
export const cartForm = `${SERVER}/cart/form/api`;
