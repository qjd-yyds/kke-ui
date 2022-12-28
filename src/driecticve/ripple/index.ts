import { App, Directive } from "vue";
import { getHooks } from "./getHooks";
import { ripple } from "@/driecticve/ripple/ripple";

const optionMap = new WeakMap<HTMLElement, any>();
const DEFAULT_PLUGIN_OPTIONS = {
    directive: "ripple",
    color: "currentColor",
    initialOpacity: 0.1,
    finalOpacity: 0.2,
    duration: 350,
    easing: "ease-out",
    delay: 60,
    disabled: false,
    center: false
};
const rippleDirective = (app: App) => {
    const hooks = getHooks(app);
    app.directive("ripple", {
        [hooks.mounted](el: HTMLElement, binding) {
            optionMap.set(el, binding.value ?? {});
            // 监听按下操作
            el.addEventListener("pointerdown", (event) => {
                const options = optionMap.get(el);
                if (options === false) return;
                if (options.disabled) return;
                ripple(event, el, {
                    ...DEFAULT_PLUGIN_OPTIONS,
                    ...options
                });
            });
        },
        [hooks.updated](
            el: HTMLElement,
            binding
        ) {
            optionMap.set(el, binding.value ?? {})
        }
    });
};

export default rippleDirective;