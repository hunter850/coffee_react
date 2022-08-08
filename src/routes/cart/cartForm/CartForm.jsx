import { Fragment, useState } from "react";
import styles from "./css/cartForm.module.scss";

function CartForm() {
    const { address_id } = styles;
    const [formData, setFormData] = useState({
        address: "",
        payWay: "",
    });
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formData);
    };
    const changeHandler = (event) => {
        console.log(event.target.name);
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    return (
        <Fragment>
            <form onSubmit={submitHandler}>
                <label htmlFor={address_id}></label>
                <input
                    value={formData.address}
                    onChange={changeHandler}
                    name="address"
                    type="text"
                    id={address_id}
                />
                <button type="submit">確認</button>
            </form>
        </Fragment>
    );
}

export default CartForm;
