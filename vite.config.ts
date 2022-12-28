import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

const lessVars = {
    default: `~@components/style/default.less`
};
// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
                // additionalData: `${lessVars}`,
                // modifyVars: {
                //   hack: `true; @import (reference) "${resolve(__dirname, 'src/components/style/default.less')}";` // src/css/common.less 是你需要全局变量 （你定义的定义的方法 和 变量等）
                // }
            }
        }
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src")
        }
    },
    plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
            mergeProps: false,
            enableObjectSlots: false
        })
    ],
    server: {
        port: 8000,
        host: true, // 解决端口冲突 需要添加这个
        open: true
    }
});
