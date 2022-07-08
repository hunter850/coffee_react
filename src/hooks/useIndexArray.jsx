

const useIndexArray = (num, ...items) => {
    const tempArray = [];
    for(let i = 0; i < num; i++) {
        const tempObj = {index: i};
        items.forEach((item, index) => {
            tempObj[`content${index}`] = item + "" + i;
        })
        tempArray.push(tempObj);
    }
    return tempArray;
}

export default useIndexArray