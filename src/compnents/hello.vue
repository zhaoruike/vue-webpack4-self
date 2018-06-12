<template>
    <div id="app">
        <img src="../asset/1.jpg"></img>
        <img src="../asset/2.jpg"></img>
        <div>789101</div>
        <div>54611231412324134123</div>
        <div>5461123142222222222222</div>
        <div>546112314</div>
        <div>5461123141111111111111</div>
        {{name}}
    </div>
</template>

<script>
export default {
    data(){
        return {
            name:'hello world!my name is zhaoruike!!!'
        }
    },
    created(){
        console.log(this.name,123)
    }
}
</script>
<style scoped>
    div{
        background:red
    }
</style>