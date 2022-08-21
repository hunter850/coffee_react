import styles from "./scss/CancelBtn.module.scss";

function CancelBtn({ goPrev }) {
    return (
        <div
            onClick={goPrev}
            style={{
                position: "absolute",
                cursor: "pointer",
                lineHeight: "48px",
                textAlign: "center",
            }}
            className={styles.btn}
        >
            <svg
                aria-label="關閉"
                color="#ffffff"
                fill="#ffffff"
                height="20"
                role="img"
                viewBox="0 0 48 48"
                width="20"
            >
                <title>關閉</title>
                <path
                    clipRule="evenodd"
                    d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"
                    fillRule="evenodd"
                ></path>
            </svg>
        </div>
    );
}

export default CancelBtn;
