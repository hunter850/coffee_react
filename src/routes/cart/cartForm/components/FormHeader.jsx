import ElementWrap from "../../../../component/Modal/ElementWrap";
import styles from "./css/formHeader.module.scss";

function FormHeader(props) {
    const { children, component = "div" } = props;
    const { form_header } = styles;
    return (
        <ElementWrap component={component} className={form_header}>
            {children}
        </ElementWrap>
    );
}

export default FormHeader;
