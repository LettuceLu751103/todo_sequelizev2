const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo


// render new page
router.get('/new', (req, res) => {
  res.render('new')
})


// create new todo data
router.post('/', (req, res) => {
  const name = req.body.name
  const UserId = req.user.id
  Todo.create({ name, isDone: false, UserId })
    .then(todo => res.redirect('/'))
    .catch(err => { console.log(err) })
})

// render detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo =>

      res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// update todo data
router.put('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  const { name, isDone } = req.body
  return Todo.findByPk(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.UserId = UserId
      todo.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

// render edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => {
      console.log(todo.toJSON())
      res.render('edit', { todo: todo.toJSON() })
    }
    )
    .catch(error => console.log(error))
})

// delete todo data
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Todo.destroy({
    where: {
      // criteria
      id
    }
  })
    .then(() => {
      console.log('刪除成功')
      res.redirect('/')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

module.exports = router