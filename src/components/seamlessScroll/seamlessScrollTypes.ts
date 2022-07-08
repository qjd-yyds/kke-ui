import { array, number, oneOf, string, bool } from 'vue-types';
export const vertical = ['down', 'up'] as const;
export const horizontal = ['left', 'right'] as const;
export type direction = typeof vertical[number] | typeof horizontal[number];
export const seamlessScrollTypes = () => {
  return {
    // 是否自动滚动,默认自动滚动
    modelValue: bool().def(false),
    // 数据源，默认为空
    list: array().def([]),
    // 滚动需要的数据个数，默认至少3个
    limitScrollNum: number().def(3),
    // 拷贝的数据次数，默认1次
    copyNum: number().def(1),
    // 控制的滚动方向，默认向上滚动
    direction: oneOf([...horizontal, ...vertical]).def('up'),
    // 启动单行滚动，默认不开启
    singleLine: bool().def(false),
    // 动画的延迟时间,默认不延迟
    delay: number().def(0),
    // 动画循环次数，-1 表示一直动画
    count: number().def(-1),
    // 步进速度
    step: number().def(1),
    // 单步停止等待时间 （默认1000ms）
    singleWaitTime: number().def(1000),
    // 单步停止的高度
    singleHeight: number().def(0),
    // 开启鼠标悬停默认关闭
    hover: bool().def(false),
    // 开启数据监听
    isWatch: bool().def(true)
  };
};

export default seamlessScrollTypes;
