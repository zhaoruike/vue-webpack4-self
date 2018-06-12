import Vue from 'vue'
import hello from '../compnents/hello.vue'
new Vue({
    el:'#app',
    template:'<hello/>',
    components:{hello}
})