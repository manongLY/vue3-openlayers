import OlMap from "../packages/map"

const components = [
    OlMap
]

const install = (Vue, opts = {}) => {
    // 将所有的组件挂载到全局资源
    components.map(component => {
        Vue.component(component.name, component)
    })
}

// 当检测到 Vue 是全局变量时，自动执行 `install` 方法
if( typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}

export{
    // 单独暴露 OlMap 组件，方便单独引入
    OlMap
}

export default {
    install
}