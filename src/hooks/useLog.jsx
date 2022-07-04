import { useEffect } from "react"

const useLog = (value) => {
    useEffect(() => {
        console.log(value);
    }, [value])
}

export default useLog