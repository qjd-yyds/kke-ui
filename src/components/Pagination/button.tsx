import { defineComponent } from 'vue';

export default defineComponent({
  name: 'button',
  emits: ['click'],
  setup(props, { emit, slots }) {
    return () => <li onClick={e => emit('click', e)}>{slots?.default()}</li>;
  }
});
