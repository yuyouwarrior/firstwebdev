<template>
<div style="background-color: #fff;filter:alpha(opacity:30); opacity:0.9;">
<div class="panel panel-primary">
	<div class="panel-heading">ToDoList
        <input type="text" v-model="newItem.text" placeholder='请输入' @keyup.enter="createItem" class="form-control" />
    </div>
  	<!-- use the modal component, pass in the prop -->
    <input type="text" v-model="searchinfo" placeholder='搜索' @keyup.enter="toSearch" class="form-control" />
    <b-card no-body>
	  <b-tabs pills card>
	    <b-tab title="未完成" active>
	      <table class='table table-bordered table-striped text-center'>
	        <thead>
	            <tr>
	                <th colspan="2">正在进行</th>
	            </tr>
	        </thead>
	        <tbody>
	            <template v-for="(item, index) in records">
	                <tr v-if="item.finished === false">
	                    <td>
	                    	<b-form-checkbox @change="item.finished = true">
						      {{ item.text }}
						    </b-form-checkbox>
	                    </td>
	                    <td>
	                        {{ item.date }}
	                    </td>
	                </tr>
	            </template>
	        </tbody>
	    </table>
	    </b-tab>
	    <b-tab title="已完成">
	      <table class='table table-bordered table-striped text-center'>
        <thead>
            <tr>
                <th colspan="3">已完成</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(item, index) in records">
                <tr v-if="item.finished === true">
                    <td>
                        {{ item.text }}
                    </td>
                    <td>
                        {{ item.date }}
                    </td>
                    <td>
                        <a href="#" @click="deleteItem(item.text)">删除</a>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
	    </b-tab>
	  </b-tabs>
	</b-card>


</div></div>
</template>

<script>
import bus from '../assets/bus'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    console.log(term)
    return items.filter(item => toLower(item.text).includes(toLower(term)))
  }
  return items
}

export default {
  data: function() {
  	return {
  		id: 0,
  		records: [],
      searchinfo:'',
  		newItem: {
  		 text: '',
  		 finished: false,
  		 date: new Date(),
  		}
  	}
  },
  computed: {
    allItems() {
      return this.$store.getters.getAllItem;
    }
  },
  created() {
    this.init();
  },
  methods: {
  	init() {
        this.records = this.$store.getters.getTodobyId(this.id).record;
    },
  	createItem: function() {
  		this.$store.commit('addRecord',
  			{id: this.id, text: this.newItem.text, date: this.newItem.date});
  		this.newItem.text = '';
    },
    deleteItem(text) {
    	this.$store.commit('deleteRecord',
  			{id: this.id, text: text});
    },
    toSearch() {
      console.log(this.allItems)
      this.records = searchByName(this.allItems, this.searchinfo)
    },
    sortbyDate() {
      this.$store.commit('sortbyDate', this.id);
    }
  },
  mounted() {
    var self = this;
    bus.$on('toid', function(msg) {
        self.id = msg;
        self.init()
    });
  }
}

</script>


<style>


</style>
