export default {
    navigator(name) {
        if (this.$router.name == name) return;
        this.$router.push({
            name,
        });
    },
    install(Vue) {
        // 因为我们所有的页面都共用一个实例
        // 所以实例下面就会有一个公共的navigator方法；
        // 你就可以在每一个页面中使用这个方法
        // 在main.js中
        // Vue.use(ElementUI) 
        Vue.prototype.$navigator = this.navigator;
    }
}
