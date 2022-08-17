import { Fragment, useMemo, useCallback } from "react";
import InputMask from "react-input-mask";
import styles from "../css/cardNumberInput.module.scss";

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
        cardFrameBlur,
        cardNumberFocus,
        cardNameFocus,
        cardValidFocus,
        confirmButton,
    } = props;

    const {
        form_wrap,
        form_container,
        id_number,
        form_number_label,
        form_number_input,
        id_name,
        form_name_label,
        form_name_input,
        form_bottom,
        card_valid,
        card_date,
        card_month,
        id_card_month,
        month_label,
        month_select,
        card_year,
        year_select,
        card_cvv,
        id_cvv,
        cvv_label,
        cvv_input,
        card_submit,
    } = styles;

    const handleNumberInput = useCallback(
        (event) => {
            setCardNumber(event.target.value.trim());
        },
        [setCardNumber]
    );
    const handleNameInput = useCallback(
        (event) => {
            if (event.target.value.length < 100)
                setCardName(event.target.value);
        },
        [setCardName]
    );
    const monthHandler = useCallback(
        (event) => {
            setCardMonth(event.target.value);
        },
        [setCardMonth]
    );
    const yearHandler = useCallback(
        (event) => {
            setCardYear(event.target.value);
        },
        [setCardYear]
    );
    const cvvHandler = useCallback(
        (event) => {
            setCardCvv(event.target.value);
        },
        [setCardCvv]
    );

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
            <div onSubmit={cardSubmitHandler} className={form_wrap}>
                <div className={form_container}>
                    <label htmlFor={id_number} className={form_number_label}>
                        卡號
                    </label>
                    <InputMask
                        mask={numberMask}
                        value={cardNumber}
                        onChange={handleNumberInput}
                        onFocus={cardNumberFocus}
                        onBlur={cardFrameBlur}
                        maskChar={""}
                        className={form_number_input}
                        id={id_number}
                    />
                    <label htmlFor={id_name} className={form_name_label}>
                        持卡人姓名
                    </label>
                    <input
                        type="text"
                        id={id_name}
                        className={form_name_input}
                        value={cardName}
                        onChange={handleNameInput}
                        onFocus={cardNameFocus}
                        onBlur={cardFrameBlur}
                        autoComplete="off"
                    />
                    <div className={form_bottom}>
                        <div
                            className={card_valid}
                            style={
                                confirmButton
                                    ? {}
                                    : { width: "100%", padding: "0px" }
                            }
                        >
                            <div className={card_date}>
                                <div className={card_month}>
                                    <label
                                        htmlFor={id_card_month}
                                        className={month_label}
                                    >
                                        Valid Date
                                    </label>
                                    <select
                                        value={cardMonth}
                                        onChange={monthHandler}
                                        onFocus={cardValidFocus}
                                        onBlur={cardFrameBlur}
                                        name="credit_card_month"
                                        id={id_card_month}
                                        className={month_select}
                                    >
                                        <option value="" disabled>
                                            -月份-
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
                                <div className={card_year}>
                                    <select
                                        value={cardYear}
                                        onChange={yearHandler}
                                        onFocus={cardValidFocus}
                                        onBlur={cardFrameBlur}
                                        className={year_select}
                                    >
                                        <option value="" disabled>
                                            -年份-
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
                            <div className={card_cvv}>
                                <label htmlFor={id_cvv} className={cvv_label}>
                                    CVV
                                </label>
                                <InputMask
                                    mask="9999"
                                    maskChar={""}
                                    id={id_cvv}
                                    className={cvv_input}
                                    value={cardCvv}
                                    onChange={cvvHandler}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                />
                            </div>
                        </div>
                        {confirmButton && (
                            <button type="submit" className={card_submit}>
                                確認送出
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CardForm;
