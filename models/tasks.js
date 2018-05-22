var knex = require('knex')({
	client:'mysql',
	connection:{
		host:'localhost',
		user: 'root',
		password: '',
		database: 'example'
	}
})

function createToDoList() {

	return 

	knex.schema

	.hasTable('todolist')

	.then( ifExist => {
		
		if(!ifExist){

			return knex.schema.createTable('todolist', (table) =>{

				table.increments('task_id').primary()
				table.string('task_name').notNullable()
				table.integer('task_status').notNullable().defaultTo(0)
				table.dateTime('task_start_date')
				table.dateTime('task_end_date')
			})
		}

	})	

	.catch( err => {
		console.log('error !!!', err.message, err.stack)
		return
	})
	
}

async function getTasks(){

	var toDoTasks = await knex('todolist').select().where('task_status', 0)

	var finishedTasks = await knex('todolist').select().where('task_status', 1)

	// console.log('tasks', tasks)

	return {toDoTasks, finishedTasks}
}



function addTask(content){

	return knex('todolist').insert({
		task_name: content,
		task_start_date: new Date(),
	}).then( (task_id) => {

		// console.log(task_id)
		// console.log('ok insert')
		return knex('todolist').select().where('task_id', task_id)

	}).then( newtask =>{

		return newtask

	})

	.catch(err => {
		throw err
	})
}


//addTask('learn knex api ')
//addTask('finish eg.js').then( (task_id) => {console.log('from addTask', task_id)})

function deleteTask(task_id){

	return knex('todolist').where('task_id', task_id).del()
					.then( deleteRowNum => {
						
						console.log('delete', deleteRowNum)
						
						return deleteRowNum
					})
					.catch(err => {
						throw err
					})
}

//deleteTask(1)


function editTask(taskobj){

	return knex('todolist').where('task_id', taskobj.task_id)
					.update('task_name', taskobj.task_name)
					.then( editRowNum => {

						console.log('update ok', editRowNum)

						return editRowNum
					})
					.catch(err => {
						throw err
					})

}

// editTask({
// 	task_id: 1,
// 	task_name: 'wanna eat dinner'
// })

function checkTask(taskobj){

	var dateobj = +taskobj.task_status? {} : {task_end_date: new Date()}


	var updateobj = Object.assign({}, {task_status :taskobj.task_status? 0 : 1}, dateobj)


	console.log('updateobj', updateobj)

	return knex('todolist').where('task_id', taskobj.task_id)
					
					.update(updateobj)

					.then( editRowNum => {

						return editRowNum
					})
					.catch(err => {
						throw err
					})

}




module.exports = {createToDoList, getTasks, addTask, deleteTask, editTask, checkTask }






