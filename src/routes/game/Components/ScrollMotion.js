import { motion } from "framer-motion";
import React from "react";

const containerVariants = {
    show: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.05,
        },
    },
    hide: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const itemVariants = {
    fadeIn: {
        hide: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.5, ease: "easeIn" } },
    },
    fadeInUp: {
        hide: {
            opacity: 0,
            y: 20,
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeIn",
            },
        },
    },
    fadeInRight: {
        hide: {
            opacity: 0,
            x: -50,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: "easeIn",
            },
        },
    },
    fadeInLeft: {
        hide: {
            opacity: 0,
            x: 50,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: "easeIn",
            },
        },
    },
};

const calcItemVariants = (
    type = "",
    duration = 1,
    ease = "easeIn",
    x = [0, 0],
    y = [0, 0]
) => {
    const typesMap = {
        up: "fadeInUp",
        left: "fadeInLeft",
        right: "fadeInRight",
    };

    const vType = Object.keys(typesMap).includes(type) ? typesMap[type] : "";

    const newVariant = vType ? itemVariants[vType] : itemVariants["fadeIn"];

    if (Number(duration) !== 1 && Number(duration) > 0) {
        newVariant.show.transition.duration = Number(duration);
    }

    const easeList = [
        "linear",
        "easeOut",
        "easeInOut",
        "circIn",
        "circOut",
        "circInOut",
        "backIn",
        "backOut",
        "backInOut",
        "anticipate",
    ];

    if (easeList.includes(ease)) {
        newVariant.show.transition.ease = ease;
    }

    if (vType === "fadeInUp" && y[0] !== y[1]) {
        newVariant.hide.y = y[0];
        newVariant.show.y = y[1];
    }

    if ((vType === "fadeInRight" || vType === "fadeInLeft") && x[0] !== x[1]) {
        newVariant.hide.x = x[0];
        newVariant.show.x = x[1];
    }

    return newVariant;
};

export function ScrollMotionContainer({
    element = "div",
    once = false,
    amount = "some",
    children,
    ...otherProps
}) {
    const myComponent = (element) => {
        switch (element) {
            case "ul":
                return motion.ul;
            case "p":
                return motion.p;
            case "section":
                return motion.section;
            case "span":
                return motion.span;
            case "div":
            default:
                return motion.div;
        }
    };

    const myProps = {
        ...otherProps,
        variants: containerVariants,
        initial: "hide",
        whileInView: "show",
        viewport: { once, amount },
    };

    return React.createElement(myComponent(element), myProps, children);
}

export function ScrollMotionItem({
    element = "div",
    type = "",
    duration = 1,
    ease = "easeIn",
    x = [0, 0],
    y = [0, 0],
    children,
    ...otherProps
}) {
    const myComponent = (element) => {
        switch (element) {
            case "span":
                return motion.span;
            case "li":
                return motion.li;
            case "img":
                return motion.img;
            case "p":
                return motion.p;
            case "a":
                return motion.a;
            case "h1":
                return motion.h1;
            case "h2":
                return motion.h2;
            case "div":
            default:
                return motion.div;
        }
    };

    const myProps = {
        ...otherProps,
        variants: calcItemVariants(type, duration, ease, x, y),
    };

    return React.createElement(myComponent(element), myProps, children);
}
