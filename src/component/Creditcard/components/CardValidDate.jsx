import { useMemo } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import styles from "../css/cardNumberInput.module.scss";
import "../../../routes/cart/css/transition_group_animation.module.scss";

function CardValidDate({ cardMonth, cardYear }) {
    const { card_valid_date } = styles;
    const monthContent = useMemo(() => {
        switch (cardMonth) {
            case "01":
                return "01";
            case "02":
                return "02";
            case "03":
                return "03";
            case "04":
                return "04";
            case "05":
                return "05";
            case "06":
                return "06";
            case "07":
                return "07";
            case "08":
                return "08";
            case "09":
                return "09";
            case "10":
                return "10";
            case "11":
                return "11";
            case "12":
                return "12";
            case "":
                return "MM";
            default:
                return "MM";
        }
    }, [cardMonth]);
    const yearContent = useMemo(() => {
        switch (cardYear) {
            case "2022":
                return "22";
            case "2023":
                return "23";
            case "2024":
                return "24";
            case "2025":
                return "25";
            case "2026":
                return "26";
            case "2027":
                return "27";
            case "2028":
                return "28";
            case "2029":
                return "29";
            case "2030":
                return "30";
            case "2031":
                return "31";
            case "2032":
                return "32";
            case "2033":
                return "33";
            case "":
                return "YY";
            default:
                return "YY";
        }
    }, [cardYear]);

    return (
        <div className={card_valid_date}>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={monthContent}
                    timeout={250}
                    classNames="fade-slide"
                >
                    <span>{monthContent}</span>
                </CSSTransition>
            </SwitchTransition>
            <span> / </span>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={yearContent}
                    timeout={250}
                    classNames="fade-slide"
                >
                    <span>{yearContent}</span>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}

export default CardValidDate;
