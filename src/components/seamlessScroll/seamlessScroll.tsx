import { throttle } from '@/utils';
import { computed, CSSProperties, defineComponent, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue';
import scrollProps, { horizontal, type direction } from './seamlessScrollTypes';
export const SeamlessScroll = defineComponent({
  name: 'SeamlessScroll',
  props: scrollProps(),
  emits: ['count'],
  setup(props, { slots, emit, attrs, expose }) {
    const scrollRef = ref<HTMLDivElement>(null);
    const realBoxRef = ref<HTMLDivElement>(null);
    const slotListRef = ref<HTMLDivElement>(null);
    const singleWaitTimeout = ref<NodeJS.Timeout>(null);
    const reqFrame = ref<number>(null);
    const isScroll = computed(() => props.list.length >= props.limitScrollNum); // 判断是否可以滚动
    const hoverStop = computed(() => props.hover && props.modelValue && isScroll.value); // 判断是否鼠标悬停停止滚动
    // 滚动容器的宽高
    const realBoxWidth = ref(0);
    const realBoxHeight = ref(0);
    // 需要移动的距离
    const xPos = ref(0);
    const yPos = ref(0);
    const isHover = ref(false);
    const _count = ref(0); //  循环的次数
    const realBoxStyle = computed<CSSProperties>(() => {
      const ease =
        typeof props.ease === 'string'
          ? props.ease
          : `cubic-bezier(${props.ease.x1},${props.ease.y1},${props.ease.x2},${props.ease.y2})`;
      const transition = `all ${ease} ${props.delay}ms`;
      return {
        width: realBoxWidth.value ? `${realBoxWidth.value}px` : 'auto',
        transform: `translate(${xPos.value}px,${yPos.value}px)`,
        transition,
        overflow: 'hidden',
        display: props.singleLine ? 'flex' : 'block'
      };
    });
    const isHorizontal = computed(() => horizontal.includes(props.direction as any)); // 是否是横向
    const floatStyle = computed<CSSProperties>(() => {
      return isHorizontal.value
        ? {
            float: 'left',
            overflow: 'hidden',
            display: props.singleLine ? 'flex' : 'block',
            flexShrink: props.singleLine ? 0 : 1
          }
        : {
            overflow: 'hidden'
          };
    });
    const step = computed(() => {
      const _step = props.step;
      if (isHorizontal.value) {
        console.log('横向');
      } else {
        console.log('纵向');
      }
      return _step;
    });
    const cancel = () => {
      cancelAnimationFrame(reqFrame.value);
      reqFrame.value = null;
    };
    const animation = (_direction: direction, _step: number, isWheel?: boolean) => {
      reqFrame.value = requestAnimationFrame(() => {
        const h = realBoxHeight.value / (props.copyNum + 1);
        const w = realBoxWidth.value / (props.copyNum + 1);
        if (_direction === 'up') {
          if (Math.abs(yPos.value) >= h) {
            yPos.value = 0;
            _count.value++;
            emit('count', _count.value);
          }
          // 每次刷新更新数据
          yPos.value -= _step;
        } else if (_direction === 'down') {
          if (yPos.value >= 0) {
            yPos.value = h * -1;
            _count.value++;
            emit('count', _count.value);
          }
          yPos.value += _step;
        } else if (_direction === 'left') {
          if (Math.abs(xPos.value) >= w) {
            xPos.value = 0;
            _count.value++;
            emit('count', _count.value);
          }
          xPos.value -= _step;
        } else if (_direction === 'right') {
          if (xPos.value >= 0) {
            xPos.value = w * -1;
            _count.value++;
            emit('count', _count.value);
          }
          xPos.value += _step;
        }
        if (isWheel) {
          return;
        }
        let { singleWaitTime } = props;
        singleWaitTimeout.value && clearTimeout(singleWaitTimeout.value);
        if (!!props.singleHeight) {
          // 纵向自动单步滚动
          if (Math.abs(yPos.value) % props.singleHeight < _step) {
            singleWaitTimeout.value = setTimeout(() => {
              move();
            }, singleWaitTime);
          } else {
            move();
          }
        } else {
          move();
        }
      });
    };
    const move = () => {
      cancel();
      if (isHover.value || !isScroll.value || _count.value === props.count) {
        // 暂停
        return;
      }
      // 调用此方法判断不同的方向进行滚动
      animation(props.direction, step.value, false);
    };
    // 初始化滚动
    const initMove = () => {
      if (isHorizontal.value) {
        // 初始化容器也滚动的宽度
        let slotsListWidth = slotListRef.value.offsetWidth;
        slotsListWidth = slotsListWidth * (props.copyNum + 1);
        realBoxWidth.value = slotsListWidth;
      }
      // 防止init后数据不能滚动
      if (isScroll.value) {
        realBoxHeight.value = realBoxRef.value.offsetHeight;
        if (props.modelValue) {
          move();
        }
      } else {
        // cancel()
        console.log('不滚动');
      }
    };
    // 开始滚动
    const startMove = () => {
      isHover.value = false;
      move();
    };
    // 停止滚动
    const stopMove = () => {
      isHover.value = true;
      cancel();
    };
    const { default: $default, html } = slots;
    const copyNum = new Array(props.copyNum).fill(null); // 拷贝的列表数量
    // 初始化内容，根据内容渲染数据的条数和重复数
    const getHtml = () => {
      return (
        <>
          <div ref={slotListRef} style={floatStyle.value}>
            {$default?.()}
          </div>
          {isScroll.value &&
            copyNum.map((_, index) => {
              return (
                <div style={floatStyle.value} key={index}>
                  {$default && $default()}
                </div>
              );
            })}
        </>
      );
    };
    onMounted(() => {
      if (isScroll.value) {
        initMove();
      }
    });
    onBeforeMount(() => {
      cancel();
      clearTimeout(singleWaitTimeout.value);
    });
    // 滚动事件
    const onWheel = throttle((e: WheelEvent) => {
      cancel();
      const { deltaY } = e;
      const singleHeight = !!props.singleHeight ? props.singleHeight : 15;
      if (deltaY < 0) {
        animation('down', singleHeight, true);
      } else {
        animation('up', singleHeight, true);
      }
    }, 10);
    // 当自动滚动状态发生变化
    watch(
      () => props.modelValue,
      n => {
        if (n) {
          startMove();
        } else {
          stopMove();
        }
      }
    );
    // 当滚动次数条件发生变化
    watch(
      () => props.count,
      n => {
        if (n) {
          startMove();
        }
      }
    );
    const reset = () => {
      cancel();
      isHover.value = false;
      initMove();
    };
    // 当列表发生变化
    watch(
      () => props.list,
      () => {
        if (props.isWatch) {
          nextTick(() => {
            reset();
          });
        }
      },
      {
        deep: true
      }
    );
    return () => {
      return (
        <div ref={scrollRef} class={attrs.class}>
          <div
            ref={realBoxRef}
            style={realBoxStyle.value}
            onMouseenter={() => {
              if (hoverStop.value) {
                stopMove();
              }
            }}
            onMouseleave={() => {
              if (hoverStop.value) {
                startMove();
              }
            }}
            onWheel={e => {
              if (hoverStop.value) {
                onWheel(e);
              }
            }}
          >
            {getHtml()}
          </div>
        </div>
      );
    };
  }
});
