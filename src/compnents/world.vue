<template>
    <div id="app">
        <img src="../asset/1.jpg"></img>
        <img src="../asset/2.jpg"></img>
        {{name}}
    </div>
</template>

<script>
export default {
    data(){
        return {
            name:'354345123123123'
        }
    },
    created(){
        console.log(this.name,123)
    }
}
</script>
<style scoped>
    div{
        background:green;
    }
</style>