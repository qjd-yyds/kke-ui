const RIPPLE_COUNT = "vRippleCountInternal";
export const getRippleCount = (el: HTMLElement) => {
    return parseInt(el.dataset[RIPPLE_COUNT] ?? "0", 10);
};
export const setRippleCount = (el: HTMLElement, count: number) => {
    el.dataset[RIPPLE_COUNT] = count.toString();
};
export const incrementRippleCount = (el: HTMLElement) => {
    const count = getRippleCount(el);
    setRippleCount(el, count + 1);
};
export function decrementRippleCount(el: HTMLElement): void {
    const count = getRippleCount(el)
    setRippleCount(el, count - 1)
}
export function deleteRippleCount(el: HTMLElement): void {
    delete el.dataset[RIPPLE_COUNT]
}
