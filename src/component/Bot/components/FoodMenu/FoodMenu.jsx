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
                                        pathname: "/food",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    全部餐點
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/food",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    咖啡系列
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/food",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    其他飲品
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/food",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    千層蛋糕
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="FoodMenuTd">
                                <Link
                                    to={{
                                        pathname: "/food",
                                        search: "",
                                    }}
                                    className="FoodMenuTdLink"
                                >
                                    輕食沙拉
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
