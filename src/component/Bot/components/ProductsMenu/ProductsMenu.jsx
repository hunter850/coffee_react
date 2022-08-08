import React from "react";
import { Link } from "react-router-dom";


const FoodMenu = () => {
    return (
        <>
            <div className="tbl-header">
                <table
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    className="FoodMenuTable"
                >
                    <thead>
                        <tr>
                            <th className="FoodMenuTh" colspan="0">
                                點擊查看選項
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/products",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    濾掛式咖啡
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/products",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    咖啡豆
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/products",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    咖啡用具
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/products",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    周邊及器具
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/products",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    禮盒
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/products",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    電子禮物卡
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default FoodMenu;
