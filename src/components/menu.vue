<template>
<div style="background-color: #fff;filter:alpha(opacity:30); opacity:0.9;">
<table class='table table-bordered table-striped text-center'>
    <thead>
        <tr>
            <td>
                <a @click="loginout" href="#">注销</a>
            </td>
        </tr>
        <tr>
            <th colspan="2">清单</th>
        </tr>
    </thead>
    <tbody>
        <template v-for="item in list">
            <tr>
                <td>
                	<a @click="toRecord(item.id)" href="#">{{ item.title }} | {{item.count}}</a>
                </td>
            </tr>
        </template>
        <tr v-if="isadding">
            <td>
            	<input type="text" v-model="title" @keyup.enter="createList" />
            </td>
        </tr>
        <tr>
            <td>
            	<a @click="addList" href="#">+新建清单</a>
            </td>
        </tr>
    </tbody>
</table>
</div>
</template>

<script>
import bus from '../assets/bus'
export default {
data() {
	return {
		current: 0,
		title: '',
		isadding: false,
	}
},
computed: {
	list() {
      return this.$store.getters.getList;
    },
    isLogin() {
          return this.$store.getters.islogin;
        }
},
methods: {
	addList: function() {
		this.isadding = true;
	},
	createList: function() {
		this.$store.commit('addList', {title: this.title});
		this.isadding = false;
		this.title = ''
	},
	toRecord(id) {
		this.current = id;
	    bus.$emit('toid', id)
	},
    loginout() {
        this.$store.commit('setLogin', false)
        this.$router.push('/');
    }
}
}

</script>


<style>
body{
    background: url('../assets/2.jpg');
}

</style>
