const isArray = Array.isArray;
const isRegExp = val => {
  return Object.prototype.toString.call(val) === '[object RegExp]';
};
const remove = (arr, item) => {
  if (arr.length) {
    const i = arr.indexOf(item);
    if (i > -1) {
      arr.splice(i, 1);
    }
  }
};
const pruneCache = (keepAliveInstance, filter) => {
  // 从keepalive组件中获取缓存的组件数据和keys列表
  // 循环获取缓存的key 进行卸载
  const { cache, keys, _vnode } = keepAliveInstance;
  for (let key in cache) {
    if (cache[key]) {
      const name = cache[key].name;
      // 使用name去匹配,不满足这个条件的就卸载
      if (name && !filter(name)) {
        console.log('卸载===>', name);
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
};
const pruneCacheEntry = (cache, key, keys, current) => {
  const entry = cache[key];
  if (entry && (!current || current.tag !== entry.tag)) {
    entry.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
};
// 获取第一个组件的实例并且返回
function getFirstChildren(children) {
  if (isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      // 如果是组件，或者异步组件，返回这个组件
      if (c && (c.componentOptions || (c.isComment && c.asyncFactory))) {
        return c;
      }
    }
  }
}
function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}
// 判断传入的值规则是否能匹配到组件
function matches(pattern, name) {
  if (isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}
export default {
  name: 'my-alive',
  props: {
    max: [String, Number],
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array]
  },
  created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  render() {
    const slot = this.$slots.default;
    const vNode = getFirstChildren(slot);
    const componentsOptions = vNode.componentOptions;
    // 获取第一个有效组件的配置项
    if (componentsOptions) {
      const { exclude, include } = this;
      const name = getComponentName(componentsOptions);
      //如果传递了限制 这里如果没有命中规则，直接返回
      if ((include && (!name || !matches(include, name))) || (exclude && name && matches(exclude, name))) {
        console.log('不符合缓存条件，直接返回');
        return vNode;
      }
      console.log(componentsOptions);
      const { cache, keys } = this;
      // 这里获取组件的key，如果用户没有传入key，则使用组件的cid+组件的名称作为key
      const key =
        vNode.key == null
          ? componentsOptions.Ctor.cid + (componentsOptions.tag ? `::${componentsOptions.tag}` : '')
          : vNode.key;
      if (cache[key]) {
        console.log('缓存命中');
        // 将命中的缓存组件拿出来覆盖当前vNode的componentInstance
        console.log(cache[key]);
        vNode.componentInstance = cache[key].componentInstance;
        // 由于需要将当前组件变成最新被使用
        // 1.先删除命中的key
        remove(keys, key);
        // 2.重新追加到尾部，这样可以保证这个组件是最近被使用
        keys.push(key);
      } else {
        console.log('未命中缓存,将其加入缓存', key);
        this.vNodeToCache = vNode;
        this.keyToCache = key;
      }
      vNode.data.keepAlive = true;
    }

    return vNode;
  },
  methods: {
    cacheVNode() {
      const { cache, keys, vNodeToCache, keyToCache, max } = this;
      console.log('对数据进行缓存', vNodeToCache);
      if (vNodeToCache) {
        const { tag, componentInstance, componentOptions } = vNodeToCache;
        cache[keyToCache] = {
          componentInstance,
          tag,
          name: getComponentName(componentOptions)
        };
        keys.push(keyToCache);
        // 如果设置了max那么将不常使用的组件从缓存移除
        if (max && keys.length > parseInt(max)) {
          console.log('需要清除了');
          // 卸载过期的缓存,这边默认是数组的第一项
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
        this.vNodeToCache = null;
      }
      console.log(this.cache);
    }
  },
  updated() {
    this.cacheVNode();
  },
  mounted() {
    // 第一次render后，不会调用updated，所以这里需要手动调用一次
    this.cacheVNode();
    // 对include进行数据监听，如果数据发生变化，则需要重新计算，把不匹配的缓存清除
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name));
    });
  },
  destroyed() {
    // 这里需要销毁缓存的组件
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  }
};
