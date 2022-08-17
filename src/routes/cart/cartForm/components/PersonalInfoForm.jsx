import { Fragment } from "react";
// import useData from "../../../../hooks/useData";
import styles from "./css/personalInfoForm.module.scss";

const fakeData = {
    name: "王曉明",
    phone: "0912345678",
    email: "mfee26coffee@gmail.com",
    payWay: "信用卡",
    deliverWay: "郵寄",
    address: "新竹縣湖口鄉達生九街13號",
    card: "5242556789134567",
};

function PersonalInfoForm(props) {
    const { formData, setFormData } = props;
    const {
        cart_form,
        label_basic,
        input_basic,
        name_id,
        phone_id,
        email_id,
        pay_way_id,
        deliver_way_id,
        address_id,
        card_id,
    } = styles;
    // const [nowList] = useData("nowList");
    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    return (
        <Fragment>
            <form className={cart_form}>
                <label htmlFor={name_id} className={label_basic}>
                    姓名
                </label>
                <input
                    value={formData.name}
                    onChange={changeHandler}
                    className={input_basic}
                    name="name"
                    type="text"
                    id={name_id}
                // autoComplete="off"
                />
                <label htmlFor={phone_id} className={label_basic}>
                    手機
                </label>
                <input
                    value={formData.phone}
                    onChange={changeHandler}
                    className={input_basic}
                    name="phone"
                    type="text"
                    id={phone_id}
                // autoComplete="off"
                />
                <label htmlFor={email_id} className={label_basic}>
                    電子信箱
                </label>
                <input
                    value={formData.email}
                    onChange={changeHandler}
                    className={input_basic}
                    name="email"
                    type="text"
                    id={email_id}
                // autoComplete="off"
                />
                <label htmlFor={pay_way_id} className={label_basic}>
                    付款方式
                </label>
                <select
                    className={input_basic}
                    name="payWay"
                    id={pay_way_id}
                    onChange={changeHandler}
                    value={formData.payWay}
                >
                    <option value="" disabled>
                        -- 選擇付款方式 --
                    </option>
                    <option value="ATM轉帳">ATM轉帳</option>
                    <option value="信用卡">信用卡</option>
                    <option value="門市付現">門市付現</option>
                </select>
                <label htmlFor={deliver_way_id} className={label_basic}>
                    收貨方式
                </label>
                <select
                    className={input_basic}
                    name="deliverWay"
                    id={deliver_way_id}
                    onChange={changeHandler}
                    value={formData.deliverWay}
                >
                    <option value="" disabled>
                        -- 選擇收貨方式 --
                    </option>
                    <option value="ATM轉帳">郵寄</option>
                    <option value="門市取貨">門市取貨</option>
                </select>
                <label htmlFor={address_id} className={label_basic}>
                    地址
                </label>
                <input
                    value={formData.address}
                    onChange={changeHandler}
                    className={input_basic}
                    name="address"
                    type="text"
                    id={address_id}
                // autoComplete="off"
                />
                <label htmlFor={card_id} className={label_basic}>
                    信用卡
                </label>
                <input
                    value={formData.card}
                    onChange={changeHandler}
                    className={input_basic}
                    name="card"
                    type="text"
                    id={card_id}
                // autoComplete="off"
                />
            </form>
            <button onClick={() => setFormData(fakeData)}>fake</button>
        </Fragment>
    );
}

export default PersonalInfoForm;
