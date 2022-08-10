import { Fragment } from "react";
import useData from "../../../../hooks/useData";
import styles from "./css/personalInfoForm.module.scss";

function PersonalInfoForm(props) {
    const { formData, setFormData } = props;
    const {
        cart_form,
        name_id,
        phone_id,
        email_id,
        pay_way_id,
        deliver_way_id,
        address_id,
        card_id,
    } = styles;
    const [nowList] = useData("nowList");
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formData);
    };
    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    return (
        <Fragment>
            <form onSubmit={submitHandler} className={cart_form}>
                <label htmlFor={name_id}>姓名</label>
                <input
                    value={formData.name}
                    onChange={changeHandler}
                    name="name"
                    type="text"
                    id={name_id}
                    // autoComplete="off"
                />
                <label htmlFor={phone_id}>手機</label>
                <input
                    value={formData.phone}
                    onChange={changeHandler}
                    name="phone"
                    type="text"
                    id={phone_id}
                    // autoComplete="off"
                />
                <label htmlFor={email_id}>電子信箱</label>
                <input
                    value={formData.email}
                    onChange={changeHandler}
                    name="email"
                    type="text"
                    id={email_id}
                    // autoComplete="off"
                />
                <label htmlFor={pay_way_id}>付款方式</label>
                <select
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
                <label htmlFor={deliver_way_id}>收貨方式</label>
                <select
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
                {/* {nowList === "productList" && (
                    <>
                    </>
                )} */}
                <label htmlFor={address_id}>地址</label>
                <input
                    value={formData.address}
                    onChange={changeHandler}
                    name="address"
                    type="text"
                    id={address_id}
                    // autoComplete="off"
                />
                <label htmlFor={card_id}>信用卡</label>
                <input
                    value={formData.card}
                    onChange={changeHandler}
                    name="card"
                    type="text"
                    id={card_id}
                    // autoComplete="off"
                />
            </form>
        </Fragment>
    );
}

export default PersonalInfoForm;
