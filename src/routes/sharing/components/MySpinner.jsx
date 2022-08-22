function MySpinner() {
    return (
        <div
            style={{
                backgroundColor: "rgba(66, 66, 66, 0.45)",
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: "1000",
                top: 0,
                left: 0,
            }}
        ></div>
    );
}

export default MySpinner;
