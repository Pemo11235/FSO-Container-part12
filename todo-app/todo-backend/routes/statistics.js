const express = require('express')
const { getAsync, setAsync } = require('../redis')
const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const addedTodos = await getAsync('added_todos')

    if (addedTodos === null) {
      await setAsync('added_todos', '0')
    }

    const updatedTodos = await getAsync('added_todos')
    res.send({
      added_todos: updatedTodos,
    })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
