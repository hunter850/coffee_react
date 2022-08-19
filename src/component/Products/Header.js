import "./Header.scss";
import { chunk } from "../Course/helper/chunk";
import { useEffect } from "react";

function Header(props) {
    const {
        searchInp,
        setSearchInp,
        DataRows,
        setDataRows,
        setRenderData,
        setPageNow,
        setPageTotal,
        setIsOpen,
        isOpen,
        setListModal,
        listModal,
        setModalMod,
    } = props;
    const headerSearch = () => {
        if (searchInp !== "") {
            // console.log("DataRows", DataRows);
            const newSearchData = DataRows.filter((v, i) => {
                return v.products_name.includes(searchInp);
            });
            // console.log("newSearchData", newSearchData);

            if (newSearchData.length > 0) {
                // console.log("newSearchData1", newSearchData);
                const pagechunk = chunk(newSearchData, 8);
                setRenderData(pagechunk);
                setPageNow(0);
                setPageTotal(pagechunk.length);
            } else {
                // console.log("newSearchData2", newSearchData);
                const pagechunk2 = chunk(DataRows, 8);
                setRenderData(pagechunk2);
                setPageNow(0);
                setPageTotal(pagechunk2.length);
                setModalMod(true);
                setListModal(`
                沒有名稱為${searchInp}的商品`);
                setIsOpen(true);

                // alert("為0");
            }
        }
    };

    useEffect(() => {
        if (!searchInp) {
            const pagechunk2 = chunk(DataRows, 8);
            setRenderData(pagechunk2);
            setPageNow(0);
            setPageTotal(pagechunk2.length);
        }
    }, [searchInp]);

    return (
        <>
            <div className="ProductsHeader">
                <div>
                    <div className="ProductsHeader-title"></div>
                    <div className="ProductsHeader-input">
                        <div className="ProductsSearch-wrap">
                            <input
                                type="text"
                                placeholder="請輸入想尋找的商品"
                                value={searchInp}
                                onChange={(e) => {
                                    setSearchInp(e.target.value);
                                }}
                            />
                            <div
                                className="ProductsSearch-btn"
                                onClick={headerSearch}
                            >
                                <svg
                                    width="32"
                                    height="33"
                                    viewBox="0 0 32 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g filter="url(#filter0_d_1908_2814)">
                                        <circle
                                            cx="13.375"
                                            cy="13.375"
                                            r="8.375"
                                            stroke="white"
                                            strokeWidth="2"
                                        />
                                        <line
                                            x1="20.4142"
                                            y1="20.5"
                                            x2="25"
                                            y2="25.0858"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </g>
                                    <defs>
                                        <filter
                                            id="filter0_d_1908_2814"
                                            x="0"
                                            y="0"
                                            width="32"
                                            height="32.0859"
                                            filterUnits="userSpaceOnUse"
                                            colorInterpolationFilters="sRGB"
                                        >
                                            <feFlood
                                                floodOpacity="0"
                                                result="BackgroundImageFix"
                                            />
                                            <feColorMatrix
                                                in="SourceAlpha"
                                                type="matrix"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                result="hardAlpha"
                                            />
                                            <feOffset dx="1" dy="1" />
                                            <feGaussianBlur stdDeviation="2.5" />
                                            <feComposite
                                                in2="hardAlpha"
                                                operator="out"
                                            />
                                            <feColorMatrix
                                                type="matrix"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                            />
                                            <feBlend
                                                mode="normal"
                                                in2="BackgroundImageFix"
                                                result="effect1_dropShadow_1908_2814"
                                            />
                                            <feBlend
                                                mode="normal"
                                                in="SourceGraphic"
                                                in2="effect1_dropShadow_1908_2814"
                                                result="shape"
                                            />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
