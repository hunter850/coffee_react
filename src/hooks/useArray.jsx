import { useState, useMemo } from "react";

const useArray = (defaultValue) => {
    const [array, setArray] = useState(
        Array.isArray(defaultValue) ? defaultValue : []
    );
    const obj = useMemo(() => {
        return {
            value: array,
            cpush: function (item) {
                setArray((pre) => [...pre, item]);
                return this;
            },
            cpop: function () {
                setArray((pre) => {
                    const tempArray = [...pre];
                    tempArray.pop();
                    return tempArray;
                });
                return this;
            },
            cunshift: function (item) {
                setArray((pre) => [item, ...pre]);
                return this;
            },
            cshift: function () {
                setArray((pre) => {
                    const tempArray = [...pre];
                    tempArray.shift();
                    return tempArray;
                });
                return this;
            },
            cslice: function (begin, end) {
                if (end) {
                    return this.value.slice(begin, end);
                } else {
                    return this.value.slice(begin);
                }
            },
            clength: function () {
                return this.value.length;
            },
            csplice: function (start, deleteCount, ...items) {
                if (items.length === 0) {
                    setArray((pre) => {
                        const tempArray = [...pre];
                        tempArray.splice(start, deleteCount);
                        return tempArray;
                    });
                } else {
                    setArray((pre) => {
                        const tempArray = [...pre];
                        tempArray.splice(start, deleteCount, ...items);
                        return tempArray;
                    });
                }
                return this;
            },
            cmap: function (callback) {
                return this.value.map(callback);
            },
            creverse: function () {
                setArray((pre) => [...pre].reverse());
                return this;
            },
            cclear: function () {
                setArray([]);
                return this;
            },
            cto: function (array) {
                setArray(() => array);
                return this;
            },
            cfilter: function (callback) {
                return this.value.filter(callback);
            },
        };
    }, [array]);
    return obj;
};

export default useArray;
