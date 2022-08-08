import { Fragment, useState } from "react";
import Btn from "../../../component/Item/Btn/Btn";
import styles from "./css/cartForm.module.scss";

function CartForm() {
    const { name_id, phone_id, email_id, address_id } = styles;
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        payWay: "",
    });
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formData);
    };
    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    return (
        <Fragment>
            <form onSubmit={submitHandler}>
                <label htmlFor={name_id}>姓名</label>
                <input
                    value={formData.name}
                    onChange={changeHandler}
                    name="name"
                    type="text"
                    id={name_id}
                />
                <label htmlFor={phone_id}>手機</label>
                <input
                    value={formData.phone}
                    onChange={changeHandler}
                    name="phone"
                    type="text"
                    id={phone_id}
                />
                <label htmlFor={email_id}>電子信箱</label>
                <input
                    value={formData.email}
                    onChange={changeHandler}
                    name="email"
                    type="text"
                    id={email_id}
                />
                <label htmlFor={address_id}>地址</label>
                <input
                    value={formData.address}
                    onChange={changeHandler}
                    name="address"
                    type="text"
                    id={address_id}
                />
                <Btn type="submit">確認</Btn>
            </form>
        </Fragment>
    );
}

export default CartForm;
