import { useState, useMemo } from "react";

const useArray = (defaultValue) => {
    const [array, setArray] = useState(
        Array.isArray(defaultValue) ? defaultValue : []
    );
    const obj = useMemo(() => {
        return {
            value: array,
            cpush: function (item) {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    tempArray.push(item);
                    setArray(tempArray);
                } catch {
                    setArray((pre) => [...pre, item]);
                }
                return this;
            },
            cpop: function () {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    tempArray.pop();
                    setArray(tempArray);
                } catch {
                    setArray((pre) => {
                        const tempArray = [...pre];
                        tempArray.pop();
                        return tempArray;
                    });
                }
                return this;
            },
            cunshift: function (item) {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    tempArray.unshift(item);
                    setArray(tempArray);
                } catch {
                    setArray((pre) => [item, ...pre]);
                }
                return this;
            },
            cshift: function () {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    tempArray.shift();
                    setArray(tempArray);
                } catch {
                    setArray((pre) => {
                        const tempArray = [...pre];
                        tempArray.shift();
                        return tempArray;
                    });
                }
                return this;
            },
            cslice: function (begin, end) {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    if (end) {
                        return tempArray.slice(begin, end);
                    } else {
                        return tempArray.slice(begin);
                    }
                } catch {
                    if (end) {
                        return this.value.slice(begin, end);
                    } else {
                        return this.value.slice(begin);
                    }
                }
            },
            clength: function () {
                return this.value.length;
            },
            csplice: function (start, deleteCount, ...items) {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    if (items.length === 0) {
                        tempArray.splice(start, deleteCount);
                        setArray(tempArray);
                    } else {
                        tempArray.splice(start, deleteCount, ...items);
                        setArray(tempArray);
                    }
                } catch {
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
                }
                return this;
            },
            cmap: function (callback) {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    return tempArray.map(callback);
                } catch {
                    return this.value.map(callback);
                }
            },
            creverse: function () {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    tempArray.reverse();
                    setArray(tempArray);
                } catch {
                    setArray((pre) => [...pre].reverse());
                }
                return this;
            },
            cclear: function () {
                setArray([]);
                return this;
            },
            cto: function (array) {
                try {
                    const tempArray = JSON.parse(JSON.stringify(array));
                    setArray(tempArray);
                } catch {
                    setArray(() => [...array]);
                }
                return this;
            },
            cfilter: function (callback) {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    return tempArray.filter(callback);
                } catch {
                    return this.value.filter(callback);
                }
            },
            cselect: function (callback) {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    setArray(tempArray.filter(callback));
                } catch {
                    console.log("error array did not change.");
                }
                return this;
            },
            cfindIndex: function (callback) {
                try {
                    const tempArray = JSON.parse(JSON.stringify(this.value));
                    return tempArray.findIndex(callback);
                } catch {
                    return this.value.findIndex(callback);
                }
            },
        };
    }, [array]);
    return obj;
};

export default useArray;
