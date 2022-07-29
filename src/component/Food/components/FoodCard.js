import "./FoodCard.css";
import "./FoodAdd.css";

function FoodCard({
    handleShowFoodDetailSelect,
    setIsShow,
    allfood,
    handleCakeCount,
    // foodCount,
}) {
    const {
        menu_name,
        menu_nutrition,
        menu_price_m,
        menu_sid,
        menu_categories,
        menu_photo,
    } = allfood;

    return (
        <>
            <div className="food_card" key={menu_sid}>
                <div className="food_card_top">
                    <img
                        className="photo"
                        src={`http://localhost:3500/images/food/${menu_photo}`}
                        alt="logo"
                    />
                    <div className="food_card_level">{menu_categories}</div>
                </div>
                <div className="food_card_down">
                    <div className="food_card_txt">
                        <p className="menu_name">{menu_name}</p>
                        <p className="font-min1">{menu_nutrition}</p>
                        <div className="font-min2">
                            <p className="menu_price_m">NT${menu_price_m}</p>
                            <div
                                className="foodadd"
                                onClick={() => {
                                    if (
                                        menu_categories === "1" ||
                                        menu_categories === "2"
                                    ) {
                                        handleShowFoodDetailSelect(allfood);
                                        setIsShow(true);
                                    }
                                    if (
                                        menu_categories === "3" ||
                                        menu_categories === "4"
                                    ) {
                                        handleCakeCount(allfood);
                                    }
                                }}
                            >
                                加入
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FoodCard;
