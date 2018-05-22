

Vue.component('to-do-item',{
	template: "<li class='input-group mb-3'>\
	<div class='input-group-prepend'><div class='input-group-text'>\
	      <input type='checkbox' style='margin:auto' :id='\"checkbox\" + task.task_id' v-model='checked' @click='checkTask' aria-label='checkbox for each to-do'/>\
	</div></div>\
	      <label :class='{checked: checked}' class='form-control' @click='labelOnShow = !labelOnShow' v-show='labelOnShow'>{{taskName}}</label>\
	<div class='input-group-prepend'>\
	      <button class='btn btn-warning btn-sm' @click='deleteTask' v-show='labelOnShow'>delete</button>\
	</div>\
	      <input type='text' class='form-control' v-show='!labelOnShow' v-model='taskName' @keyup.enter='editTask' v-focus='!labelOnShow'>\
      </li>",
	props:['task'],
	data(){
		return {
			checked: false,
			labelOnShow: true,
			taskName: this.task.task_name
		}
	},
	directives:{
		focus:{
			update(el, {value}){
				console.log(value, 'inserted focus')
				if(value){
					el.focus()
				}
			}
		}
	},
	methods:{
		editTask(){

			var _taskobj = Object.assign({}, this.task, {task_name :  this.taskName})

			$.post('/taskapi/editTask', _taskobj, (res) => {

				if(res.editNum > 0){
					console.log(res.editNum, 'in editTask')

					this.labelOnShow = true

				}
			})


		},
		deleteTask(){

			$.post('/taskapi/deleteTask', {task_id: this.task.task_id}, (res) => {

				if(res.deleteNum > 0){

					console.log('delete ok')

					this.$emit('remove')
				}
			})

		},
		checkTask(){

			const _taskobj = Object.assign({}, this.task, {task_status: this.checked ? 1:0})

			$.post('/taskapi/checkTask', _taskobj, (res) => {		

				if(res.editNum > 0){
					
					console.log('check ok ')
				}
			})


		}
	}

})

var tasks = new Vue({
	el: '.root',
	data:{
		toDoTasks: [],
		finishedTasks: [],
		newTaskName: '',
	},
	methods:{
		addNewToDo(){

			const _task_name = this.newTaskName.trim()

			if(!_task_name){

				alert('任务不能为空')

				return
			}

			$.post('/taskapi/addTask', {task_name: _task_name}, (newtask) => {

				this.toDoTasks.push(newtask)

				this.newTaskName = ''
			})
		}
	},
	mounted(){

		$.get('/taskapi/getTasks' , (res) => {

			this.toDoTasks = res.toDoTasks

			this.finishedTasks = res.finishedTasks
		
		})

	}
})










