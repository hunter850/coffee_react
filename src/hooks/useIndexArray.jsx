import { useMemo } from "react";
import { v4 } from "uuid";

const useIndexArray = (num, ...items) => {
    const output = useMemo(() => {
        const tempArray = [];
        for (let i = 0; i < num; i++) {
            const tempObj = { index: i };
            items.forEach((item, index) => {
                tempObj[`content${index}`] = item + "" + i;
            });
            tempObj.id = v4();
            tempArray.push(tempObj);
        }
        return tempArray;
    }, [num, items]);
    return output;
};

export default useIndexArray;
