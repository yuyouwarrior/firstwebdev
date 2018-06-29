<template>
<b-container :class="{ 'bd-style' : isnewstyle}" style="width: 100%;height: 700px;padding: 10px">
    <b-row v-if="isLogin">
        <b-col sm="4" class="menus">
        <button @click="isnewstyle = true">更换样式</button>
            <menus></menus>
        </b-col>
        <b-col sm="8">
            <todo></todo>
        </b-col>
    </b-row>
    <b-row v-if="!isLogin">
        请返回<a href="#" @click="toLogin">登陆！</a>
    </b-row>
</b-container>

</template>

<script>
import todo from './todo'
import menus from './menu'

export default {
    data() {
        return {
            isnewstyle: false
        }
        
    },
    computed: {
        isLogin() {
            return this.$store.getters.islogin;
        }
    },
    components: {
    todo,
    menus
  },
  methods: {
    toLogin() {
        this.$router.push('/');
    }
  }
}

</script>


<style scoped>
.bv-example-row
{
    background: url(../assets/2.jpg);
}

.bd-style {
    background: url(../assets/timg.jpg) repeat center center fixed;
}
</style>
