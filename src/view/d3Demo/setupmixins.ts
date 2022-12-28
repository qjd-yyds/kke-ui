const modules = import.meta.glob('./mixins/*.ts')
const mixins = Object.keys(modules).map(key => modules[key])
export default mixins
