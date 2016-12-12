import Vue from 'vue/dist/vue.js'

const vm = new Vue({
	el: "#app",
	data: {
		msg: "hello"
	},
	template: "<span>{{msg}}</span>"
})
console.log(vm)