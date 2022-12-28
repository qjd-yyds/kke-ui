// 勾股定理计算斜边

import {
    decrementRippleCount,
    deleteRippleCount,
    getRippleCount,
    incrementRippleCount
} from "@/driecticve/ripple/ripple-count";

const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    const deltaX = x1 - x2;
    const deltaY = y1 - y2;
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
};
// 当前点距离最长的半径
const getMaxRadius = (x: number, y: number, width: number, height: number) => {
    const topLeft = getDistance(x, y, 0, 0);
    const topRight = getDistance(x, y, width, 0);
    const bottomLeft = getDistance(x, y, 0, height);
    const bottomRight = getDistance(x, y, width, height);
    return Math.max(topLeft, topRight, bottomLeft, bottomRight);
};


export const ripple = (event: PointerEvent, el: HTMLElement, options) => {
    console.log("执行", event, el, options);
    let token: undefined | NodeJS.Timeout;
    let originalPositionValue = ""
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const height = rect.height;
    const width = rect.width;
    const radius = getMaxRadius(x, y, width, height);
    const computedStyles = window.getComputedStyle(el);
    const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius
    } = computedStyles;
    // 复制一个div 用来保存容器
    const rippleContainer = document.createElement("div");

    rippleContainer.style.top = "0";
    rippleContainer.style.left = "0";
    rippleContainer.style.width = "100%";
    rippleContainer.style.height = "100%";
    rippleContainer.style.position = "absolute";
    rippleContainer.style.borderRadius = `${ borderTopLeftRadius } ${ borderTopRightRadius } ${ borderBottomRightRadius } ${ borderBottomLeftRadius }`;
    rippleContainer.style.overflow = "hidden";
    rippleContainer.style.pointerEvents = "none";
    incrementRippleCount(el)
    // 给el添加 相对定位 修改 默认值 static
    if (computedStyles.position === 'static') {
        if (el.style.position) {
            originalPositionValue = el.style.position
        }
        el.style.position = 'relative'
    }
    // 创建一个ripple元素

    const rippleElement = document.createElement("div");

    rippleElement.style.position = "absolute";
    rippleElement.style.width = `${ radius * 2 }px`;
    rippleElement.style.height = `${ radius * 2 }px`;
    rippleElement.style.top = `${ y }px`;
    rippleElement.style.left = `${ x }px`;

    rippleElement.style.background = options.color;
    rippleElement.style.borderRadius = "50%";
    rippleElement.style.opacity = "0.1";
    rippleElement.style.transform = `translate(-50%,-50%) scale(0)`;
    rippleElement.style.transition = `transform ${ options.duration / 1000 }s ease-in-out, opacity ${ options.duration / 1000 }s ease-in-out`;

    rippleContainer.appendChild(rippleElement);

    el.appendChild(rippleContainer);

    function dissolveRipple() {
        rippleElement.style.transition = 'opacity 120ms ease in out'
        rippleElement.style.opacity = '0'
        setTimeout(() => {
            rippleContainer.remove()
            decrementRippleCount(el)
            if(!getRippleCount(el)) {
                deleteRippleCount(el)
                el.style.position = originalPositionValue
            }
        }, 100)
    }
    // 释放
    function releaseRipple(e) {
        dissolveRipple()
    }
    token = setTimeout(() => {
        rippleElement.style.transform = `translate(-50%,-50%) scale(1)`;
        rippleElement.style.opacity = options.finalOpacity;
        setTimeout(releaseRipple,options.duration)
    }, options.delay);

};

