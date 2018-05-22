const {createToDoList, getTasks, addTask, deleteTask, editTask, checkTask } = require('../models/tasks')

const express = require('express');

const router = express.Router();

router.get('/getTasks',  (req, res, next) => {

	getTasks().then( tasks => {

		res.send(tasks)

	}).catch(err => {

		throw err
	})
	
})

router.post('/addTask', (req, res) => {

	addTask(req.body['task_name'])

			.then( newtasks =>{

				res.send(newtasks[0])
			})
			.catch(err => {

				throw err
			})	
})

router.post('/deleteTask', (req, res) => {

	deleteTask(req.body['task_id'])

			.then( deleteNum =>{

				res.send({ deleteNum})
			})
			.catch(err => {

				throw err
			})	
})

router.post('/editTask', (req, res) => {

	editTask({
		task_id: req.body['task_id'],
		task_name: req.body['task_name']
	})

			.then( editNum =>{

				res.send({ editNum})
			})
			.catch(err => {

				throw err
			})	
})

router.post('/checkTask', (req, res) => {

	console.log(req.body)

	req.body.task_status = +req.body.task_status

	checkTask(req.body)

			.then( editNum =>{

				res.send({ editNum})
			})
			.catch(err => {

				throw err
			})	
})

module.exports = router