
import OlMap from './map.vue'

// 这里的 name 对应的是 组件的名称, 因为再注册组件的时候是通过 
// Vue.component(OlMap.name,OlMap) 这种方式的，
// 所以当使用库中的组件的时候就可以通过 <ol-map /> 这种方式。

OlMap.install = (Vue) =>{
    Vue.component(OlMap.name, OlMap)
}

export default OlMap

// 这个文件有两个作用，1. 将 button 组件导出给 src/index.js 中的 install 方法使用 
// 2. 将 button 组件的 install 方法导出给 Element,方面 button 单独使用