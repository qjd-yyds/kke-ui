import { computed, CSSProperties, defineComponent, onMounted, ref } from 'vue';
import scrollProps, { horizontal } from './seamlessScrollTypes';
export const SeamlessScroll = defineComponent({
  name: 'SeamlessScroll',
  props: scrollProps(),
  setup(props, { slots, emit, attrs, expose }) {
    const scrollRef = ref<HTMLDivElement>(null);
    const realBoxRef = ref<HTMLDivElement>(null);
    const slotListRef = ref<HTMLDivElement>(null);
    const isScroll = computed(() => props.list.length >= props.limitScrollNum); // 判断是否可以滚动
    // 需要移动的距离
    const xPos = ref(0);
    const yPos = ref(0);
    const realBoxStyle = computed<CSSProperties>(() => {
      return {
        width: 'auto',
        transform: `transform(${xPos.value}px,${yPos.value}px)`,
        overflow: 'hidden',
        transition: `${props.delay}ms`,
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
    const initMove = () => {
      if (isHorizontal.value) {
        return;
      }
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
      if(isScroll.value) {
        console.log("滚动");
      }
    });
    return () => (
      <div ref={scrollRef} class={attrs.class}>
        <div ref={realBoxRef} style={realBoxStyle.value}>
          {getHtml()}
        </div>
      </div>
    );
  }
});
