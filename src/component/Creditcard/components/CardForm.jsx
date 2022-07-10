import { Fragment, useMemo } from "react";
import InputMask from "react-input-mask";

function CardForm(props) {
    const {
        cardNumber,
        setCardNumber,
        cardName,
        setCardName,
        cardMonth,
        setCardMonth,
        cardYear,
        setCardYear,
        cardCvv,
        setCardCvv,
        cardSubmitHandler,
        focusHandler,
        blurHandler,
    } = props;

    const handleNumberInput = (event) => {
        setCardNumber(event.target.value.trim());
    };
    const handleNameInput = (event) => {
        if (event.target.value.length < 100) setCardName(event.target.value);
    };
    const monthHandler = (event) => {
        setCardMonth(event.target.value);
    };
    const yearHandler = (event) => {
        setCardYear(event.target.value);
    };
    const cvvHandler = (event) => {
        setCardCvv(event.target.value);
    };

    const numberMask = useMemo(() => {
        if (
            cardNumber[0] === "3" &&
            (cardNumber[1] === "4" || cardNumber[1] === "7")
        ) {
            return "999999999999999";
        } else {
            return "9999999999999999";
        }
    }, [cardNumber]);

    return (
        <Fragment>
            <form
                onSubmit={cardSubmitHandler}
                style={{ marginTop: "-50px", width: "520px" }}
            >
                <div
                    style={{
                        padding: "80px 26px 30px",
                        width: "520px",
                        margin: "auto",
                        border: "1px solid black",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                    }}
                >
                    <label
                        htmlFor="card_number"
                        style={{
                            marginBottom: "9px",
                            display: "inline-block",
                            fontSize: "20px",
                        }}
                    >
                        卡號
                    </label>
                    <InputMask
                        mask={numberMask}
                        value={cardNumber}
                        onChange={handleNumberInput}
                        maskChar={""}
                        style={{
                            height: "36px",
                            fontSize: "16px",
                            width: "100%",
                            borderRadius: "3px",
                            padding: "0px 9px",
                            marginBottom: "20px",
                        }}
                        id="card_number"
                    />
                    <label
                        htmlFor="card_name"
                        style={{
                            marginBottom: "9px",
                            display: "inline-block",
                            fontSize: "20px",
                        }}
                    >
                        持卡人姓名
                    </label>
                    <input
                        type="text"
                        id="card_name"
                        style={{
                            height: "36px",
                            fontSize: "16px",
                            width: "100%",
                            borderRadius: "3px",
                            padding: "0px 9px",
                            marginBottom: "20px",
                        }}
                        value={cardName}
                        onChange={handleNameInput}
                        autoComplete="off"
                    />
                    <div
                        className="form_bottom"
                        style={{ width: "100%", display: "flex" }}
                    >
                        <div
                            className="card_valid"
                            style={{
                                width: "70%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingRight: "30px",
                            }}
                        >
                            <div
                                className="card_date"
                                style={{
                                    width: "66.66%",
                                    display: "flex",
                                    paddingRight: "10px",
                                }}
                            >
                                <div
                                    className="card_month"
                                    style={{
                                        width: "50%",
                                        paddingRight: "10px",
                                    }}
                                >
                                    <label
                                        htmlFor="credit_card_month"
                                        style={{
                                            width: "100%",
                                            fontSize: "20px",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Valid Date
                                    </label>
                                    <select
                                        value={cardMonth}
                                        onChange={monthHandler}
                                        name="credit_card_month"
                                        id="credit_card_month"
                                        style={{
                                            width: "100%",
                                            height: "36px",
                                            padding: "0px 9px",
                                        }}
                                    >
                                        <option value="" disabled>
                                            - 月份 -
                                        </option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div
                                    className="card_year"
                                    style={{
                                        width: "50%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "end",
                                    }}
                                >
                                    <select
                                        value={cardYear}
                                        onChange={yearHandler}
                                        name="credit_card_year"
                                        id="credit_card_year"
                                        style={{
                                            width: "100%",
                                            height: "36px",
                                            padding: "0px 9px",
                                        }}
                                    >
                                        <option value="" disabled>
                                            - 年份 -
                                        </option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                        <option value="2031">2031</option>
                                        <option value="2032">2032</option>
                                        <option value="2033">2033</option>
                                    </select>
                                </div>
                            </div>
                            <div
                                className="card_cvv"
                                style={{ width: "33.33%" }}
                            >
                                <label
                                    htmlFor="cvv"
                                    style={{ width: "100%", fontSize: "20px" }}
                                >
                                    CVV
                                </label>
                                <InputMask
                                    mask="9999"
                                    maskChar={""}
                                    id="cvv"
                                    style={{
                                        width: "100%",
                                        height: "36px",
                                        padding: "0px 9px",
                                    }}
                                    value={cardCvv}
                                    onChange={cvvHandler}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: "30%",
                                height: "36px",
                                marginTop: "26.4px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#253945",
                                borderRadius: "3px",
                                color: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            確認送出
                        </button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}

export default CardForm;
