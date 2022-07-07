import { array, number, oneOf, string, bool } from 'vue-types';
export const vertical = ['down', 'up'] as const;
export const horizontal = ['left', 'right'] as const;
export const seamlessScrollTypes = () => {
  return {
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
    delay: number().def(0)
  };
};

export default seamlessScrollTypes;
