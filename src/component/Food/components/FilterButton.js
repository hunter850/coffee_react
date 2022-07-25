import "./FilterButton.css";

const Filterbutton = ({ id, name, setFoodFilter }) => {
    return (
        <div
            className="filterbutton"
            onClick={() => {
                setFoodFilter(id);
            }}
        >
            {name}
        </div>
    );
};

export default Filterbutton;
